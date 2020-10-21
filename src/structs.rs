use crate::types::RustType;
use askama::Template;
use syn::ItemStruct;

#[derive(Clone, Debug, Template)]
#[template(path = "struct.ts.j2", escape = "txt")]
pub struct StructDeclaration {
    ident: String,
    fields: Vec<(Option<String>, RustType)>,
}

impl StructDeclaration {
    pub fn new(ident: String) -> Self {
        StructDeclaration {
            ident,
            fields: Default::default(),
        }
    }

    pub fn is_tuple(&self) -> bool {
        self.fields.iter().all(|(id, _)| id.is_none())
    }
}

impl From<ItemStruct> for StructDeclaration {
    fn from(node: ItemStruct) -> Self {
        let mut e = StructDeclaration::new(node.ident.to_string());

        for field in node.fields.into_iter() {
            e.fields
                .push((field.ident.map(|i| i.to_string()), field.ty.into()))
        }

        e
    }
}
