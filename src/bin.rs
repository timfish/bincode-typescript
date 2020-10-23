use bincode_typescript::from_string;
use std::{
    error::Error,
    fs::{self},
};

fn main() -> Result<(), Box<dyn Error>> {
    let args: Vec<String> = std::env::args().collect();
    let buffer_support = args.contains(&"--buffer-support".to_string());
    let input = args.last().expect("Could not find input file name");

    let rust = fs::read_to_string(input)?;
    println!("{}", from_string(&rust, buffer_support)?);

    Ok(())
}
