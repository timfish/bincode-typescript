#[cfg(test)]
mod test_build {
    use std::process::Command;

    #[cfg(target_os = "windows")]
    static TS_BIN: &str = "./node_modules/.bin/tsc.cmd";
    #[cfg(not(target_os = "windows"))]
    static TS_BIN: &str = "./node_modules/.bin/tsc";

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
}
