pub mod test_types;

#[cfg(test)]
mod tests {
    use super::test_types::*;
    use std::{
        collections::HashMap,
        fs,
        io::Write,
        process::{Child, Command, Stdio},
    };

    #[cfg(target_os = "windows")]
    static TS_BIN: &str = "./node_modules/.bin/tsc.cmd";
    #[cfg(not(target_os = "windows"))]
    static TS_BIN: &str = "./node_modules/.bin/tsc";

    #[cfg(target_os = "windows")]
    static TS_NODE_BIN: &str = "./node_modules/.bin/ts-node.cmd";
    #[cfg(not(target_os = "windows"))]
    static TS_NODE_BIN: &str = "./node_modules/.bin/ts-node";

    fn get_test_code(generated_path: &str, assert_code: &str) -> String {
        format!(
            "
import {{
    UnitEnum,
    readUnitEnum,
    writeUnitEnum,
    UnitEnumNumbered,
    readUnitEnumNumbered,
    writeUnitEnumNumbered,
    TupleStruct,
    readTupleStruct,
    writeTupleStruct,
    NamedStruct,
    readNamedStruct,
    writeNamedStruct,
    SomeEvent,
    readSomeEvent,
    writeSomeEvent
}} from '{}';
const assert = require('assert');
const getStdin = require('get-stdin');

process.on('unhandledRejection', (error: Error) => {{
    console.error(error);
    process.exit(1);
}});

function send(data: Uint8Array) {{
    process.stdout.write(data);
    process.stdout.end();
}}

(async function main() {{
    let buffer = await getStdin.buffer();

    {}
}})();
        ",
            generated_path.replace("\\", "\\\\").replace(".ts", ""),
            assert_code
        )
    }

    fn generate_and_run(assert_code: &str) -> (tempfile::TempDir, Child) {
        let dir = tempfile::tempdir_in("./tests").unwrap();
        let generated_path = dir.path().join("generated.ts");
        let tests_path = dir.path().join("test.ts");

        bincode_typescript::from_file("./tests/test_types.rs", &generated_path, true).unwrap();

        let code = get_test_code(&generated_path.to_str().unwrap(), assert_code);
        fs::write(&tests_path, code).unwrap();

        (
            dir,
            Command::new(TS_NODE_BIN)
                .args(&[tests_path])
                .stdin(Stdio::piped())
                .stdout(Stdio::piped())
                .spawn()
                .expect("failed to spawn process"),
        )
    }

    #[test]
    fn builds_without_errors_strict() {
        let dir = tempfile::tempdir_in("./tests").unwrap();
        let out_path = dir.path().join("api.ts");

        bincode_typescript::from_file("./tests/test_types.rs", &out_path, true).unwrap();

        let status = Command::new(TS_BIN)
            .args(&[
                "--strict",
                "--declaration",
                "--noEmitOnError",
                "--noImplicitAny",
                "--noImplicitReturns",
                "--noFallthroughCasesInSwitch",
                "--noUnusedLocals",
                "--noUnusedParameters",
                "--target",
                "ES6",
                "--lib",
                "ES6,DOM,ESNext.BigInt",
                &out_path.to_str().unwrap(),
            ])
            .status()
            .expect("failed to start process");

        assert!(status.success());
    }

    #[test]
    fn unit_enum() {
        let (_d, mut child) = generate_and_run(
            "
        let val = readUnitEnum(buffer);
        assert.deepStrictEqual(val, UnitEnum.Three);

        send(writeUnitEnum(UnitEnum.Three).getUint8Array());
        ",
        );

        let child_stdin = child.stdin.as_mut().expect("could not get stdin");
        let encoded: Vec<u8> = bincode::serialize(&UnitEnum::Three).unwrap();
        child_stdin.write_all(&encoded).unwrap();

        let output = child.wait_with_output().unwrap();
        assert!(output.status.success());

        let back: UnitEnum = bincode::deserialize(&output.stdout).unwrap();
        assert_eq!(UnitEnum::Three, back);
    }

    #[test]
    fn unit_enum_values() {
        let (_d, mut child) = generate_and_run(
            "
        let val = readUnitEnumNumbered(buffer);
        assert.deepStrictEqual(val, UnitEnumNumbered.Eight);
        assert.deepStrictEqual(val, 8);

        send(writeUnitEnumNumbered(UnitEnumNumbered.Eight).getUint8Array());
        ",
        );

        let child_stdin = child.stdin.as_mut().expect("could not get stdin");
        let encoded: Vec<u8> = bincode::serialize(&UnitEnumNumbered::Eight).unwrap();
        child_stdin.write_all(&encoded).unwrap();

        let output = child.wait_with_output().unwrap();
        assert!(output.status.success());

        let back: UnitEnumNumbered = bincode::deserialize(&output.stdout).unwrap();
        assert_eq!(UnitEnumNumbered::Eight, back);
    }

    #[test]
    fn tuple_struct() {
        let (_d, mut child) = generate_and_run(
            "
        let val = readTupleStruct(buffer);
        let expected: TupleStruct = [-145, new Uint32Array([9987, 456])];
        assert.deepStrictEqual(val, expected);

        send(writeTupleStruct(expected).getUint8Array());
        ",
        );

        let child_stdin = child.stdin.as_mut().expect("could not get stdin");
        let val = TupleStruct(-145, vec![9987, 456]);
        let encoded: Vec<u8> = bincode::serialize(&val).unwrap();
        child_stdin.write_all(&encoded).unwrap();

        let output = child.wait_with_output().unwrap();
        assert!(output.status.success());

        let back: TupleStruct = bincode::deserialize(&output.stdout).unwrap();
        assert_eq!(val, back);
    }

    #[test]
    fn named_struct() {
        let (_d, mut child) = generate_and_run(
            "
        let val = readNamedStruct(buffer);
        let expected = { one: 1.23, two: 128, three: 'something', zero: 28 };
        assert.deepStrictEqual(val, expected);

        send(writeNamedStruct(expected).getUint8Array());
        ",
        );

        let child_stdin = child.stdin.as_mut().expect("could not get stdin");

        let val = NamedStruct {
            zero: Some(28),
            one: 1.23,
            two: 128,
            three: "something".to_string(),
        };
        let encoded: Vec<u8> = bincode::serialize(&val).unwrap();
        child_stdin.write_all(&encoded).unwrap();

        let output = child.wait_with_output().unwrap();
        assert!(output.status.success());

        let back: NamedStruct = bincode::deserialize(&output.stdout).unwrap();
        assert_eq!(val, back);
    }

    #[test]
    fn complex_enum() {
        let (_d, mut child) = generate_and_run(
            "
        let val = readSomeEvent(buffer);
        let expected = SomeEvent.Named({ length: BigInt(34567), interval: 0.0001 });
        assert.deepStrictEqual(val, expected);

        send(writeSomeEvent(expected).getUint8Array());
        ",
        );

        let child_stdin = child.stdin.as_mut().expect("could not get stdin");

        let val = SomeEvent::Named {
            length: 34567,
            interval: 0.0001,
        };
        let encoded: Vec<u8> = bincode::serialize(&val).unwrap();
        child_stdin.write_all(&encoded).unwrap();

        let output = child.wait_with_output().unwrap();
        assert!(output.status.success());

        let back: SomeEvent = bincode::deserialize(&output.stdout).unwrap();
        assert_eq!(val, back);
    }

    #[test]
    fn complex_enum_numbers() {
        let (_d, mut child) = generate_and_run(
            "
        let val = readSomeEvent(buffer);
        let expected = SomeEvent.UnnamedMultiple(1, -2, 3, -4, 5, -6, BigInt(1152921504606846976), BigInt(-8), BigInt(9), BigInt(-10), BigInt(11), BigInt(-12), false);
        assert.deepStrictEqual(val, expected);

        send(writeSomeEvent(expected).getUint8Array());
        ",
        );

        let child_stdin = child.stdin.as_mut().expect("could not get stdin");

        let val = SomeEvent::UnnamedMultiple(
            1,
            -2,
            3,
            -4,
            5,
            -6,
            1152921504606846976,
            -8,
            9,
            -10,
            11,
            -12,
            false,
        );
        let encoded: Vec<u8> = bincode::serialize(&val).unwrap();
        child_stdin.write_all(&encoded).unwrap();

        let output = child.wait_with_output().unwrap();
        assert!(output.status.success());

        let back: SomeEvent = bincode::deserialize(&output.stdout).unwrap();
        assert_eq!(val, back);
    }

    #[test]
    fn struct_in_enum() {
        let (_d, mut child) = generate_and_run(
            "
        let val = readSomeEvent(buffer);
        let expected = SomeEvent.NamedStruct({ inner: { one: 1.23, two: 128, three: 'something', zero: undefined }});
        assert.deepStrictEqual(val, expected);

        send(writeSomeEvent(expected).getUint8Array());
        ",
        );

        let child_stdin = child.stdin.as_mut().expect("could not get stdin");

        let val = SomeEvent::NamedStruct {
            inner: NamedStruct {
                zero: None,
                one: 1.23,
                two: 128,
                three: "something".to_string(),
            },
        };
        let encoded: Vec<u8> = bincode::serialize(&val).unwrap();
        child_stdin.write_all(&encoded).unwrap();

        let output = child.wait_with_output().unwrap();
        assert!(output.status.success());

        let back: SomeEvent = bincode::deserialize(&output.stdout).unwrap();
        assert_eq!(val, back);
    }

    #[test]
    fn hashmap() {
        let (_d, mut child) = generate_and_run(
            "
        let val = readSomeEvent(buffer);
        let expected = SomeEvent.UnnamedHashMap(new Map([['Some', UnitEnum.One], ['More', UnitEnum.Three]]));
        assert.deepStrictEqual(val, expected);

        send(writeSomeEvent(expected).getUint8Array());
        ",
        );

        let child_stdin = child.stdin.as_mut().expect("could not get stdin");

        let mut hm = HashMap::new();
        hm.insert("Some".to_string(), UnitEnum::One);
        hm.insert("More".to_string(), UnitEnum::Three);
        let val = SomeEvent::UnnamedHashMap(Some(hm));

        let encoded: Vec<u8> = bincode::serialize(&val).unwrap();
        child_stdin.write_all(&encoded).unwrap();

        let output = child.wait_with_output().unwrap();
        assert!(output.status.success());

        let back: SomeEvent = bincode::deserialize(&output.stdout).unwrap();
        assert_eq!(val, back);
    }
}
