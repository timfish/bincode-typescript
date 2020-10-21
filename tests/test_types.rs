use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub enum UnitEnum {
    One,
    Two,
    Three,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub enum UnitEnumNumbered {
    One = 1,
    Two = 2,
    Four = 4,
    Eight = 8,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct TupleStruct(pub i32, pub Vec<u32>);

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct NamedStruct {
    pub zero: Option<u8>,
    pub one: f64,
    pub two: u8,
    pub three: String,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub enum SomeEvent {
    Unit,
    UnnamedSingle(f32),
    UnnamedSingleUnitEnum(Option<Vec<UnitEnum>>),
    UnnamedMultiple(
        u8,
        i8,
        u16,
        i16,
        u32,
        i32,
        u64,
        i64,
        u128,
        i128,
        usize,
        isize,
        bool,
    ),
    Named {
        length: usize,
        interval: f64,
    },
    UnnamedStruct(NamedStruct),
    UnnamedHashMap(Option<HashMap<String, UnitEnum>>),
    NamedStruct {
        inner: NamedStruct,
    },
}
