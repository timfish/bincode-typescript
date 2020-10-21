use askama::Template;
use enums::EnumDeclaration;
use std::{
    error::Error,
    fs::{self},
    path::Path,
};
use structs::StructDeclaration;
use syn::{
    visit::{self, Visit},
    ItemEnum, ItemStruct,
};

mod enums;
mod structs;
mod types;

const NAME: &str = env!("CARGO_PKG_NAME");
const VERSION: &str = env!("CARGO_PKG_VERSION");

#[derive(Clone, Debug, Template)]
#[template(path = "module.ts.j2", escape = "txt")]
struct CodeVisitor {
    pub pkg_name: String,
    pub pkg_version: String,
    support_buffer: bool,
    pub structs: Vec<StructDeclaration>,
    pub enums: Vec<EnumDeclaration>,
}

impl CodeVisitor {
    pub fn new(support_buffer: bool) -> Self {
        CodeVisitor {
            pkg_name: NAME.to_string(),
            pkg_version: VERSION.to_string(),
            support_buffer,
            structs: Default::default(),
            enums: Default::default(),
        }
    }
}

impl<'ast> Visit<'ast> for CodeVisitor {
    fn visit_item_struct(&mut self, node: &'ast ItemStruct) {
        self.structs.push(node.clone().into());
        visit::visit_item_struct(self, node);
    }

    fn visit_item_enum(&mut self, node: &'ast ItemEnum) {
        self.enums.push(node.clone().into());
        visit::visit_item_enum(self, node);
    }
}

pub fn from_string(input: &str, support_buffer: bool) -> Result<String, Box<dyn Error>> {
    let ast = syn::parse_file(input)?;
    let mut enum_visit = CodeVisitor::new(support_buffer);
    enum_visit.visit_file(&ast);

    Ok(enum_visit.render()?)
}

pub fn from_file<P1: AsRef<Path>, P2: AsRef<Path>>(
    input: P1,
    output: P2,
    support_buffer: bool,
) -> Result<(), Box<dyn Error>> {
    fs::create_dir_all(&output.as_ref().parent().unwrap())?;
    let rust = fs::read_to_string(input)?;
    let typescript = from_string(&rust, support_buffer)?;
    fs::write(output, typescript)?;

    Ok(())
}
