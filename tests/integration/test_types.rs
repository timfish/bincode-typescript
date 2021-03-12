use serde::{Deserialize, Serialize};
use serde_reflection::{Registry, Samples, Tracer, TracerConfig};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub enum UnitEnum {
    One,
    Two,
    Three,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct SomeTuple(pub i32, pub Vec<u32>);

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub struct SomeStruct {
    pub zero: Option<u8>,
    pub one: f64,
    pub two: (u8, UnitEnum),
    pub three: String,
}

#[derive(Serialize, Deserialize, PartialEq, Debug)]
pub enum SomeEvent {
    Unit,
    NewType(f32),
    NewTypeOptVec(Option<Vec<u8>>),
    NewTypeOptUnitEnum(Option<Vec<UnitEnum>>),
    Tuple(
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
    Struct {
        length: usize,
        interval: f64,
    },
    NewTypeWithStruct(SomeStruct),
    NewTypeOptHashMap(Option<HashMap<String, Option<UnitEnum>>>),
    StructWithStruct {
        inner: SomeStruct,
    },
}

pub fn trace_types() -> Registry {
    let mut tracer = Tracer::new(TracerConfig::default());

    tracer.trace_type::<UnitEnum>(&Samples::new()).unwrap();
    tracer.trace_type::<SomeStruct>(&Samples::new()).unwrap();
    tracer.trace_type::<SomeTuple>(&Samples::new()).unwrap();
    tracer.trace_type::<SomeEvent>(&Samples::new()).unwrap();

    tracer.registry().unwrap()
}
