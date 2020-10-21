use crate::types::RustType;
use askama::Template;
use syn::{Expr, Fields, ItemEnum, Lit};

#[derive(Clone, Debug)]
pub enum EnumVariantDeclaration {
    Unit {
        ident: String,
        value: String,
    },
    Unnamed {
        ident: String,
        types: Vec<RustType>,
    },
    Named {
        ident: String,
        types: Vec<(String, RustType)>,
    },
}

impl EnumVariantDeclaration {
    pub fn ident(&self) -> String {
        match self {
            EnumVariantDeclaration::Unit { ident, .. } => ident.to_string(),
            EnumVariantDeclaration::Unnamed { ident, .. } => ident.to_string(),
            EnumVariantDeclaration::Named { ident, .. } => ident.to_string(),
        }
    }

    pub fn value(&self) -> String {
        match self {
            EnumVariantDeclaration::Unit { value, .. } => value.to_string(),
            _ => panic!("should not happen"),
        }
    }

    pub fn first_type(&self) -> RustType {
        match self {
            EnumVariantDeclaration::Unnamed { types, .. } => types[0].clone(),
            _ => panic!("should not happen"),
        }
    }
}

#[derive(Clone, Debug, Template)]
#[template(path = "enum.ts.j2", escape = "txt")]
pub struct EnumDeclaration {
    ident: String,
    variants: Vec<EnumVariantDeclaration>,
}

impl EnumDeclaration {
    pub fn new(ident: String) -> Self {
        EnumDeclaration {
            ident,
            variants: Default::default(),
        }
    }

    pub fn is_unit(&self) -> bool {
        self.variants
            .iter()
            .all(|v| matches!(v, EnumVariantDeclaration::Unit { .. }))
    }
}

impl From<ItemEnum> for EnumDeclaration {
    fn from(node: ItemEnum) -> Self {
        let mut e = EnumDeclaration::new(node.ident.to_string());

        for (i, variant) in node.variants.into_iter().enumerate() {
            match variant.fields {
                Fields::Unit => {
                    let value = if let Some(discriminant) = variant.discriminant {
                        if let Expr::Lit(lit) = discriminant.1 {
                            if let Lit::Int(val) = lit.lit {
                                Some(val.to_string())
                            } else {
                                None
                            }
                        } else {
                            None
                        }
                    } else {
                        None
                    };

                    e.variants.push(EnumVariantDeclaration::Unit {
                        ident: variant.ident.to_string(),
                        value: value.unwrap_or_else(|| i.to_string()),
                    })
                }
                Fields::Named(fields) => e.variants.push(EnumVariantDeclaration::Named {
                    ident: variant.ident.to_string(),
                    types: fields
                        .named
                        .into_iter()
                        .map(|v| {
                            (
                                v.ident.expect("Should have an ident").to_string(),
                                v.ty.into(),
                            )
                        })
                        .collect(),
                }),
                Fields::Unnamed(fields) => e.variants.push(EnumVariantDeclaration::Unnamed {
                    ident: variant.ident.to_string(),
                    types: fields.unnamed.into_iter().map(|v| v.ty.into()).collect(),
                }),
            }
        }

        e
    }
}
