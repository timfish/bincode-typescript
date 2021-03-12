use askama::Template;
use serde_reflection::{ContainerFormat, Format, Named, Registry, VariantFormat};
use std::{
    collections::BTreeMap,
    fmt::{self, Display},
};

const NAME: &str = env!("CARGO_PKG_NAME");
const VERSION: &str = env!("CARGO_PKG_VERSION");

#[derive(Template)]
#[template(path = "module.ts.j2", escape = "txt")]
pub struct TemplateWriter {
    pub pkg_name: String,
    pub pkg_version: String,
    support_buffer: bool,
    pub items: Vec<Box<dyn Display>>,
}

impl TemplateWriter {
    pub fn new(registry: Registry, support_buffer: bool) -> Self {
        let items = registry
            .iter()
            .map(|(ident, e)| match e {
                ContainerFormat::UnitStruct => unimplemented!(),
                ContainerFormat::NewTypeStruct(_) => unimplemented!(),
                ContainerFormat::TupleStruct(fields) => {
                    Box::new(TupleWriter::new(ident, fields)) as Box<dyn fmt::Display>
                }
                ContainerFormat::Struct(fields) => {
                    Box::new(StructWriter::new(ident, fields)) as Box<dyn fmt::Display>
                }
                ContainerFormat::Enum(variants) => {
                    Box::new(EnumWriter::new(ident, variants)) as Box<dyn fmt::Display>
                }
            })
            .collect();

        TemplateWriter {
            pkg_name: NAME.to_string(),
            pkg_version: VERSION.to_string(),
            support_buffer,
            items,
        }
    }
}

#[derive(Clone, Debug, Template)]
#[template(path = "tuple.ts.j2", escape = "txt")]
pub struct TupleWriter {
    ident: String,
    fields: Vec<Format>,
}

impl TupleWriter {
    pub fn new(ident: &str, fields: &[Format]) -> Self {
        TupleWriter {
            ident: ident.to_string(),
            fields: fields.to_vec(),
        }
    }
}

#[derive(Clone, Debug, Template)]
#[template(path = "struct.ts.j2", escape = "txt")]
pub struct StructWriter {
    ident: String,
    fields: Vec<Named<Format>>,
}

impl StructWriter {
    pub fn new(ident: &str, fields: &[Named<Format>]) -> Self {
        StructWriter {
            ident: ident.to_string(),
            fields: fields.to_vec(),
        }
    }
}

#[derive(Clone, Debug, Template)]
#[template(path = "enum.ts.j2", escape = "txt")]
pub struct EnumWriter {
    pub ident: String,
    pub variants: BTreeMap<u32, Named<VariantFormat>>,
}

impl EnumWriter {
    pub fn new(ident: &str, variants: &BTreeMap<u32, Named<VariantFormat>>) -> Self {
        EnumWriter {
            ident: ident.to_string(),
            variants: variants.clone(),
        }
    }

    pub fn is_unit(&self) -> bool {
        self.variants
            .iter()
            .all(|(_, v)| matches!(v.value, VariantFormat::Unit))
    }
}

pub trait FormatExt {
    fn ts_type(&self) -> String;
    fn writer(&self) -> String;
    fn reader(&self) -> String;
}

impl FormatExt for Format {
    fn ts_type(&self) -> String {
        match self {
            Format::Variable(_) => unimplemented!(),
            Format::TypeName(t) => t.to_string(),
            Format::Unit => "null".to_string(),
            Format::Bool => "boolean".to_string(),
            Format::I8 => "number".to_string(),
            Format::I16 => "number".to_string(),
            Format::I32 => "number".to_string(),
            Format::I64 => "bigint".to_string(),
            Format::I128 => "bigint".to_string(),
            Format::U8 => "number".to_string(),
            Format::U16 => "number".to_string(),
            Format::U32 => "number".to_string(),
            Format::U64 => "bigint".to_string(),
            Format::U128 => "bigint".to_string(),
            Format::F32 => "number".to_string(),
            Format::F64 => "number".to_string(),
            Format::Char => unimplemented!(),
            Format::Str => "string".to_string(),
            Format::Bytes => "Uint8Array".to_string(),
            Format::Option(t) => format!("{} | undefined", t.ts_type()),
            Format::Seq(t) => format!("Array<{}>", t.ts_type()),
            Format::Map { key, value } => format!("Map<{}, {}>", key.ts_type(), value.ts_type()),
            Format::Tuple(t) => format!(
                "[{}]",
                t.iter().map(|t| t.ts_type()).collect::<Vec<_>>().join(", ")
            ),
            Format::TupleArray { .. } => unimplemented!(),
        }
    }

    fn writer(&self) -> String {
        match self {
            Format::Variable(_) => unimplemented!(),
            Format::TypeName(t) => format!("{}.serialize", t),
            Format::Unit => "serializeUnit".to_string(),
            Format::Bool => "serializeBool".to_string(),
            Format::I8 => "serializeI8".to_string(),
            Format::I16 => "serializeI16".to_string(),
            Format::I32 => "serializeI32".to_string(),
            Format::I64 => "serializeI64".to_string(),
            Format::I128 => "serializeI128".to_string(),
            Format::U8 => "serializeU8".to_string(),
            Format::U16 => "serializeU16".to_string(),
            Format::U32 => "serializeU32".to_string(),
            Format::U64 => "serializeU64".to_string(),
            Format::U128 => "serializeU128".to_string(),
            Format::F32 => "serializeF32".to_string(),
            Format::F64 => "serializeF64".to_string(),
            Format::Char => unimplemented!(),
            Format::Str => "serializeString".to_string(),
            Format::Bytes => "serializeTypedArray".to_string(),
            Format::Option(t) => format!("serializeOption({})", t.writer()),
            Format::Seq(t) => format!("serializeSeq({})", t.writer()),
            Format::Map { key, value } => {
                format!("serializeMap({}, {})", key.writer(), value.writer())
            }
            Format::Tuple(t) => format!(
                "serializeTuple<{}>({})",
                self.ts_type(),
                t.iter().map(|t| t.writer()).collect::<Vec<_>>().join(", ")
            ),
            Format::TupleArray { .. } => unimplemented!(),
        }
    }

    fn reader(&self) -> String {
        match self {
            Format::Variable(_) => unimplemented!(),
            Format::TypeName(t) => format!("{}.deserialize", t),
            Format::Unit => "deserializeUnit".to_string(),
            Format::Bool => "deserializeBool".to_string(),
            Format::I8 => "deserializeI8".to_string(),
            Format::I16 => "deserializeI16".to_string(),
            Format::I32 => "deserializeI32".to_string(),
            Format::I64 => "deserializeI64".to_string(),
            Format::I128 => "deserializeI128".to_string(),
            Format::U8 => "deserializeU8".to_string(),
            Format::U16 => "deserializeU16".to_string(),
            Format::U32 => "deserializeU32".to_string(),
            Format::U64 => "deserializeU64".to_string(),
            Format::U128 => "deserializeU128".to_string(),
            Format::F32 => "deserializeF32".to_string(),
            Format::F64 => "deserializeF64".to_string(),
            Format::Char => unimplemented!(),
            Format::Str => "deserializeString".to_string(),
            Format::Bytes => "deserializeTypedArray(Uint8Array)".to_string(),
            Format::Option(t) => format!("deserializeOption({})", t.reader()),
            Format::Seq(t) => format!("deserializeSeq({})", t.reader()),
            Format::Map { key, value } => {
                format!("deserializeMap({}, {})", key.reader(), value.reader())
            }
            Format::Tuple(t) => format!(
                "deserializeTuple<{}>({})",
                self.ts_type(),
                t.iter().map(|t| t.reader()).collect::<Vec<_>>().join(", ")
            ),
            Format::TupleArray { .. } => unimplemented!(),
        }
    }
}
