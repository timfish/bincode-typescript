use syn::{PathSegment, Type};

#[derive(Clone, Debug)]
pub enum RustType {
    U8,
    I8,
    U16,
    I16,
    U32,
    I32,
    U64,
    I64,
    U128,
    I128,
    USize,
    ISize,
    F32,
    F64,
    Bool,
    String,
    Option(Box<RustType>),
    Vec(Box<RustType>),
    TypedArray(Box<RustType>),
    HashMap(Box<RustType>, Box<RustType>),
    User(String),
}

impl RustType {
    pub fn ts_type(&self) -> String {
        match self {
            RustType::U8 => "number".to_string(),
            RustType::I8 => "number".to_string(),
            RustType::U16 => "number".to_string(),
            RustType::I16 => "number".to_string(),
            RustType::U32 => "number".to_string(),
            RustType::I32 => "number".to_string(),
            RustType::U64 => "bigint".to_string(),
            RustType::I64 => "bigint".to_string(),
            RustType::U128 => "bigint".to_string(),
            RustType::I128 => "bigint".to_string(),
            RustType::USize => "bigint".to_string(),
            RustType::ISize => "bigint".to_string(),
            RustType::F32 => "number".to_string(),
            RustType::F64 => "number".to_string(),
            RustType::Bool => "boolean".to_string(),
            RustType::String => "string".to_string(),
            RustType::Option(t) => format!("{} | undefined", t.ts_type()),
            RustType::Vec(t) => format!("Array<{}>", t.ts_type()),
            RustType::TypedArray(t) => match t.as_ref() {
                RustType::U8 => "Uint8Array".to_string(),
                RustType::I8 => "Int8Array".to_string(),
                RustType::U16 => "Uint16Array".to_string(),
                RustType::I16 => "Int16Array".to_string(),
                RustType::U32 => "Uint32Array".to_string(),
                RustType::I32 => "Int32Array".to_string(),
                RustType::U64 => "BigUint64Array".to_string(),
                RustType::I64 => "BigInt64Array".to_string(),
                RustType::USize => "BigUint64Array".to_string(),
                RustType::ISize => "BigInt64Array".to_string(),
                RustType::F32 => "Float32Array".to_string(),
                RustType::F64 => "Float64Array".to_string(),
                _ => panic!("Typed arrays not supported for this underlying type"),
            },
            RustType::HashMap(k, v) => format!("Map<{}, {}>", k.ts_type(), v.ts_type()),
            RustType::User(t) => t.to_string(),
        }
    }

    pub fn writer(&self) -> String {
        match self {
            RustType::U8 => "writeU8".to_string(),
            RustType::I8 => "writeI8".to_string(),
            RustType::U16 => "writeU16".to_string(),
            RustType::I16 => "writeI16".to_string(),
            RustType::U32 => "writeU32".to_string(),
            RustType::I32 => "writeI32".to_string(),
            RustType::U64 => "writeU64".to_string(),
            RustType::I64 => "writeI64".to_string(),
            RustType::U128 => "writeU128".to_string(),
            RustType::I128 => "writeI128".to_string(),
            RustType::USize => "writeUSize".to_string(),
            RustType::ISize => "writeISize".to_string(),
            RustType::F32 => "writeF32".to_string(),
            RustType::F64 => "writeF64".to_string(),
            RustType::Bool => "writeBool".to_string(),
            RustType::String => "writeString".to_string(),
            RustType::Option(t) => format!("writeOption({})", t.writer()),
            RustType::Vec(t) => format!("writeSeq({})", t.writer()),
            RustType::TypedArray(_) => format!("writeTypedArray<{0}>", self.ts_type()),
            RustType::HashMap(k, v) => format!("writeMap({}, {})", k.writer(), v.writer()),
            RustType::User(t) => format!("write{}", t),
        }
    }

    pub fn reader(&self) -> String {
        match self {
            RustType::U8 => "readU8".to_string(),
            RustType::I8 => "readI8".to_string(),
            RustType::U16 => "readU16".to_string(),
            RustType::I16 => "readI16".to_string(),
            RustType::U32 => "readU32".to_string(),
            RustType::I32 => "readI32".to_string(),
            RustType::U64 => "readU64".to_string(),
            RustType::I64 => "readI64".to_string(),
            RustType::U128 => "readU128".to_string(),
            RustType::I128 => "readI128".to_string(),
            RustType::USize => "readUSize".to_string(),
            RustType::ISize => "readISize".to_string(),
            RustType::F32 => "readF32".to_string(),
            RustType::F64 => "readF64".to_string(),
            RustType::Bool => "readBool".to_string(),
            RustType::String => "readString".to_string(),
            RustType::Option(t) => format!("readOption({})", t.reader()),
            RustType::Vec(t) => format!("readSeq({})", t.reader()),
            RustType::TypedArray(_) => format!("readTypedArray({0})", self.ts_type()),
            RustType::HashMap(k, v) => format!("readMap({}, {})", k.reader(), v.reader()),
            RustType::User(t) => format!("read{}", t),
        }
    }
}

fn get_generic_params(segment: &PathSegment) -> Vec<String> {
    let mut output = vec![];

    if let syn::PathArguments::AngleBracketed(ab) = &segment.arguments {
        for arg in &ab.args {
            if let syn::GenericArgument::Type(t) = &arg {
                if let Type::Path(p) = t {
                    output.push(p.path.segments[0].ident.to_string());
                    let mut sub = get_generic_params(&p.path.segments[0]);
                    output.append(&mut sub);
                }
            }
        }
    }

    output
}

impl From<Type> for RustType {
    fn from(t: Type) -> Self {
        if let Type::Path(path) = &t {
            let mut types = vec![path.path.segments[0].ident.to_string()];
            types.append(&mut get_generic_params(&path.path.segments[0]));

            let mut cur_types: Vec<RustType> = vec![types.pop().unwrap().into()];

            while let Some(s) = types.pop() {
                if s == "Option" {
                    cur_types = vec![RustType::Option(Box::new(
                        cur_types.pop().expect("Could not find type for Option"),
                    ))];
                } else if s == "Vec" {
                    match cur_types[0] {
                        RustType::U8
                        | RustType::I8
                        | RustType::U16
                        | RustType::I16
                        | RustType::U32
                        | RustType::I32
                        | RustType::U64
                        | RustType::I64
                        | RustType::USize
                        | RustType::ISize
                        | RustType::F32
                        | RustType::F64 => {
                            cur_types = vec![RustType::TypedArray(Box::new(
                                cur_types.pop().expect("Could not find type for TypedArray"),
                            ))];
                        }
                        _ => {
                            cur_types = vec![RustType::Vec(Box::new(
                                cur_types.pop().expect("Could not find type for Vec"),
                            ))]
                        }
                    }
                } else if s == "HashMap" {
                    cur_types = vec![RustType::HashMap(
                        Box::new(
                            cur_types
                                .pop()
                                .expect("Could not find type for HashMap key"),
                        ),
                        Box::new(
                            cur_types
                                .pop()
                                .expect("Could not find type for HashMap value"),
                        ),
                    )]
                } else {
                    cur_types.push(s.into());
                }
            }

            if cur_types.len() != 1 {
                panic!("Could not work out type");
            }

            cur_types.pop().expect("Could not work out type")
        } else {
            panic!("Could not work out type");
        }
    }
}

impl From<&str> for RustType {
    fn from(t: &str) -> Self {
        match &t[..] {
            "u8" => RustType::U8,
            "i8" => RustType::I8,
            "u16" => RustType::U16,
            "i16" => RustType::I16,
            "u32" => RustType::U32,
            "i32" => RustType::I32,
            "u64" => RustType::U64,
            "i64" => RustType::I64,
            "u128" => RustType::U128,
            "i128" => RustType::I128,
            "usize" => RustType::USize,
            "isize" => RustType::ISize,
            "f32" => RustType::F32,
            "f64" => RustType::F64,
            "bool" => RustType::Bool,
            "String" => RustType::String,
            o => RustType::User(o.to_string()),
        }
    }
}

impl From<String> for RustType {
    fn from(t: String) -> Self {
        t[..].into()
    }
}
