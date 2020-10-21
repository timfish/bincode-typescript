// This file was auto-generated from Rust code by bincode-typescript v0.1.0

export const enum UnitEnum {  
  One = 0,  
  Two = 1,  
  Three = 2, 
}

export function writeUnitEnum(value: UnitEnum, sinkOrBuf?: SinkOrBuf,): Sink {
  const sink = Sink.create(sinkOrBuf);
  switch (value) {  
    case 0: 
      writeU32(0, sink); 
      break;  
    case 1: 
      writeU32(1, sink); 
      break;  
    case 2: 
      writeU32(2, sink); 
      break; 
    default:
      throw new Error(`'${value}' is invalid value for enum 'UnitEnum'`);
  }

  return sink;
}

export function readUnitEnum(sinkOrBuf: SinkOrBuf): UnitEnum {
  const sink = Sink.create(sinkOrBuf);
  const value = readU32(sink);
  switch (value) {  
    case 0: 
      return 0;  
    case 1: 
      return 1;  
    case 2: 
      return 2; 
    default:
      throw new Error(`'${value}' is invalid value for enum 'UnitEnum'`);
  }
}

export const enum UnitEnumNumbered {  
  One = 1,  
  Two = 2,  
  Four = 4,  
  Eight = 8, 
}

export function writeUnitEnumNumbered(value: UnitEnumNumbered, sinkOrBuf?: SinkOrBuf,): Sink {
  const sink = Sink.create(sinkOrBuf);
  switch (value) {  
    case 1: 
      writeU32(0, sink); 
      break;  
    case 2: 
      writeU32(1, sink); 
      break;  
    case 4: 
      writeU32(2, sink); 
      break;  
    case 8: 
      writeU32(3, sink); 
      break; 
    default:
      throw new Error(`'${value}' is invalid value for enum 'UnitEnumNumbered'`);
  }

  return sink;
}

export function readUnitEnumNumbered(sinkOrBuf: SinkOrBuf): UnitEnumNumbered {
  const sink = Sink.create(sinkOrBuf);
  const value = readU32(sink);
  switch (value) {  
    case 0: 
      return 1;  
    case 1: 
      return 2;  
    case 2: 
      return 4;  
    case 3: 
      return 8; 
    default:
      throw new Error(`'${value}' is invalid value for enum 'UnitEnumNumbered'`);
  }
}

export type SomeEvent = 
  | { tag: 'Unit' }  
  | { tag: 'UnnamedSingle'; value: number }  
  | { tag: 'UnnamedSingleUnitEnum'; value: Array<UnitEnum> | undefined }
  | { tag: 'UnnamedMultiple'; value: SomeEvent_UnnamedMultiple }
  | { tag: 'Named'; value: SomeEvent_Named }  
  | { tag: 'UnnamedStruct'; value: NamedStruct }  
  | { tag: 'UnnamedHashMap'; value: Map<string, UnitEnum> | undefined }
  | { tag: 'NamedStruct'; value: SomeEvent_NamedStruct };
        
export interface SomeEvent_UnnamedMultiple {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: bigint;
  7: bigint;
  8: bigint;
  9: bigint;
  10: bigint;
  11: bigint;
  12: boolean; 
}
        
export interface SomeEvent_Named {
  length: bigint;
  interval: number; 
}
export interface SomeEvent_NamedStruct {
  inner: NamedStruct; 
} 

export module SomeEvent { 
  export const Unit: SomeEvent = { tag: 'Unit' };  
  export const UnnamedSingle = (value: number): SomeEvent => ({ tag: 'UnnamedSingle', value });  
  export const UnnamedSingleUnitEnum = (value: Array<UnitEnum> | undefined): SomeEvent => ({ tag: 'UnnamedSingleUnitEnum', value });
  export const UnnamedMultiple = (p0: number,p1: number,p2: number,p3: number,p4: number,p5: number,p6: bigint,p7: bigint,p8: bigint,p9: bigint,p10: bigint,p11: bigint,p12: boolean,): SomeEvent => ({ tag: 'UnnamedMultiple', value: [p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,] });
  export const Named = (value: SomeEvent_Named): SomeEvent => ({ tag: 'Named', value });  
  export const UnnamedStruct = (value: NamedStruct): SomeEvent => ({ tag: 'UnnamedStruct', value });  
  export const UnnamedHashMap = (value: Map<string, UnitEnum> | undefined): SomeEvent => ({ tag: 'UnnamedHashMap', value });
  export const NamedStruct = (value: SomeEvent_NamedStruct): SomeEvent => ({ tag: 'NamedStruct', value }); 
}

export function writeSomeEvent(value: SomeEvent, sinkOrBuf?: SinkOrBuf): Sink {
  const sink = Sink.create(sinkOrBuf);
  switch(value.tag) {
  
    case 'Unit': 
      writeU32(0, sink);
      break;  
    case 'UnnamedSingle': 
      writeU32(1, sink);  
      const val2 = value as { tag: 'UnnamedSingle'; value: number };
      writeF32(val2.value, sink);
      break;  
    case 'UnnamedSingleUnitEnum': 
      writeU32(2, sink);  
      const val3 = value as { tag: 'UnnamedSingleUnitEnum'; value: Array<UnitEnum> | undefined };
      writeOption(writeSeq(writeUnitEnum))(val3.value, sink);
      break;  
    case 'UnnamedMultiple': 
      writeU32(3, sink);
      const val4 = value as { tag: 'UnnamedMultiple', value: SomeEvent_UnnamedMultiple };
      writeU8(val4.value[0], sink);
      writeI8(val4.value[1], sink);
      writeU16(val4.value[2], sink);
      writeI16(val4.value[3], sink);
      writeU32(val4.value[4], sink);
      writeI32(val4.value[5], sink);
      writeU64(val4.value[6], sink);
      writeI64(val4.value[7], sink);
      writeU128(val4.value[8], sink);
      writeI128(val4.value[9], sink);
      writeUSize(val4.value[10], sink);
      writeISize(val4.value[11], sink);
      writeBool(val4.value[12], sink);
      break;  
    case 'Named': 
      writeU32(4, sink);
      const val5 = value as { tag: 'Named', value: SomeEvent_Named };
      writeUSize(val5.value.length, sink);
      writeF64(val5.value.interval, sink);
      break;  
    case 'UnnamedStruct': 
      writeU32(5, sink);  
      const val6 = value as { tag: 'UnnamedStruct'; value: NamedStruct };
      writeNamedStruct(val6.value, sink);
      break;  
    case 'UnnamedHashMap': 
      writeU32(6, sink);  
      const val7 = value as { tag: 'UnnamedHashMap'; value: Map<string, UnitEnum> | undefined };
      writeOption(writeMap(writeString, writeUnitEnum))(val7.value, sink);
      break;  
    case 'NamedStruct': 
      writeU32(7, sink);
      const val8 = value as { tag: 'NamedStruct', value: SomeEvent_NamedStruct };
      writeNamedStruct(val8.value.inner, sink);
      break; 
    default:
       throw new Error(`'${(value as any).tag}' is invalid tag for enum 'SomeEvent'`);
  }

  return sink;
}

export function readSomeEvent(sinkOrBuf: SinkOrBuf): SomeEvent {
  const sink = Sink.create(sinkOrBuf);
  const value = readU32(sink);
  switch (value) {
  
    case 0: 
      return SomeEvent.Unit;  
    case 1:
      return SomeEvent.UnnamedSingle(
        readF32(sink), 
        );  
    case 2:
      return SomeEvent.UnnamedSingleUnitEnum(
        readOption(readSeq(readUnitEnum))(sink), 
        );  
    case 3:
      return SomeEvent.UnnamedMultiple(
        readU8(sink),
        readI8(sink),
        readU16(sink),
        readI16(sink),
        readU32(sink),
        readI32(sink),
        readU64(sink),
        readI64(sink),
        readU128(sink),
        readI128(sink),
        readUSize(sink),
        readISize(sink),
        readBool(sink), 
        );  
    case 4:
      return SomeEvent.Named({
        length: readUSize(sink),
        interval: readF64(sink), 
        });  
    case 5:
      return SomeEvent.UnnamedStruct(
        readNamedStruct(sink), 
        );  
    case 6:
      return SomeEvent.UnnamedHashMap(
        readOption(readMap(readString, readUnitEnum))(sink), 
        );  
    case 7:
      return SomeEvent.NamedStruct({
        inner: readNamedStruct(sink), 
        }); 
    default:
      throw new Error(`'${value}' is invalid value for enum 'SomeEvent'`);
  }
}




export interface TupleStruct {
  0: number;
  1: Uint32Array;
}

export function writeTupleStruct(value: TupleStruct, sinkOrBuf?: SinkOrBuf): Sink {
  const sink = Sink.create(sinkOrBuf);
  writeI32(value[0], sink);
  writeTypedArray<Uint32Array>(value[1], sink); 
  return sink;
}

export function readTupleStruct(sinkOrBuf: SinkOrBuf): TupleStruct {
  const sink = Sink.create(sinkOrBuf);
  return [
    readI32(sink),
    readTypedArray(Uint32Array)(sink), 
  ];
}

export interface NamedStruct {
  zero: number | undefined;
  one: number;
  two: number;
  three: string;
}

export function writeNamedStruct(value: NamedStruct, sinkOrBuf?: SinkOrBuf): Sink {
  const sink = Sink.create(sinkOrBuf);
  writeOption(writeU8)(value.zero, sink);
  writeF64(value.one, sink);
  writeU8(value.two, sink);
  writeString(value.three, sink); 
  return sink;
}

export function readNamedStruct(sinkOrBuf: SinkOrBuf): NamedStruct {
  const sink = Sink.create(sinkOrBuf);
  return {
    zero: readOption(readU8)(sink),
    one: readF64(sink),
    two: readU8(sink),
    three: readString(sink), 
  };
}



type SinkOrBuf = Sink | Buffer | ArrayBuffer | Uint8Array;


export class Sink {
  view: DataView;
  position: number;

  constructor(input: ArrayBuffer) {
    this.view = new DataView(input);
    this.position = 0;
  }

  reserve(extra: number): void {
    if (this.position + extra <= this.view.buffer.byteLength) {
      return;
    }

    const newBuffer = new ArrayBuffer(
      (this.view.buffer.byteLength + extra) * 2
    );
    new Uint8Array(newBuffer).set(new Uint8Array(this.view.buffer));
    this.view = new DataView(newBuffer);
  }

  public static create(input?: SinkOrBuf): Sink {
    if (input == undefined) {
      return new Sink(new ArrayBuffer(0));
    }

    if (input instanceof Sink) {
      return input;
    }

    if (input instanceof Buffer) {
      return new Sink(
        input.buffer.slice(
          input.byteOffset,
          input.byteOffset + input.byteLength
        )
      );
    }

    if (input instanceof ArrayBuffer) {
      return new Sink(input);
    }

    if (input instanceof Uint8Array) {
      return new Sink(input.buffer);
    }

    throw new Error(
      `'input' was of incorrect type. Expected 'Sink | Buffer | ArrayBuffer | Uint8Array'`
    );
  }

  public getUint8Array(): Uint8Array {
    return new Uint8Array(this.view.buffer.slice(0, this.position));
  }

  public getBuffer(): Buffer {
    return Buffer.from(this.view.buffer, 0, this.position);
  }
}

const BIG_32 = BigInt(32);
const BIG_64 = BigInt(64);
const BIG_32Fs = BigInt('4294967295');
const BIG_64Fs = BigInt('18446744073709551615');

const textEncoder: TextEncoder = new TextEncoder();
const textDecoder: TextDecoder = new TextDecoder();

function readU8(sink: Sink): number {
  const value = sink.view.getUint8(sink.position);
  sink.position += 1;
  return value;
}

function writeU8(value: number, sink: Sink): Sink {
  sink.reserve(1);
  sink.view.setUint8(sink.position, value);
  sink.position += 1;
  return sink;
}

function readI8(sink: Sink): number {
  const value = sink.view.getInt8(sink.position);
  sink.position += 1;
  return value;
}

function writeI8(value: number, sink: Sink): Sink {
  sink.reserve(1);
  sink.view.setInt8(sink.position, value);
  sink.position += 1;
  return sink;
}

function readU16(sink: Sink): number {
  const value = sink.view.getUint16(sink.position, true);
  sink.position += 2;
  return value;
}

function writeU16(value: number, sink: Sink): Sink {
  sink.reserve(2);
  sink.view.setUint16(sink.position, value, true);
  sink.position += 2;
  return sink;
}

function readI16(sink: Sink): number {
  const value = sink.view.getInt16(sink.position, true);
  sink.position += 2;
  return value;
}

function writeI16(value: number, sink: Sink): Sink {
  sink.reserve(2);
  sink.view.setInt16(sink.position, value, true);
  sink.position += 2;
  return sink;
}

function readU32(sink: Sink): number {
  const value = sink.view.getUint32(sink.position, true);
  sink.position += 4;
  return value;
}

function writeU32(value: number, sink: Sink): Sink {
  sink.reserve(4);
  sink.view.setUint32(sink.position, value, true);
  sink.position += 4;
  return sink;
}

function readI32(sink: Sink): number {
  const value = sink.view.getInt32(sink.position, true);
  sink.position += 4;
  return value;
}

function writeI32(value: number, sink: Sink): Sink {
  sink.reserve(4);
  sink.view.setInt32(sink.position, value, true);
  sink.position += 4;
  return sink;
}

function readF32(sink: Sink): number {
  const value = sink.view.getFloat32(sink.position, true);
  sink.position += 4;
  return value;
}

function writeF32(value: number, sink: Sink): Sink {
  sink.reserve(4);
  sink.view.setFloat32(sink.position, value, true);
  sink.position += 4;
  return sink;
}

function readF64(sink: Sink): number {
  const value = sink.view.getFloat64(sink.position, true);
  sink.position += 8;
  return value;
}

function writeF64(value: number, sink: Sink): Sink {
  sink.reserve(8);
  sink.view.setFloat64(sink.position, value, true);
  sink.position += 8;
  return sink;
}

function readU64(sink: Sink): bigint {
  const high = readU32(sink);
  const low = readU32(sink);

  return (BigInt(low) << BIG_32) | BigInt(high);
}

function writeU64(value: bigint, sink: Sink): Sink {
  const low = value & BIG_32Fs;
  const high = value >> BIG_32;

  writeU32(Number(low), sink);
  writeU32(Number(high), sink);
  return sink;
}

function readI64(sink: Sink): bigint {
  const high = readI32(sink);
  const low = readI32(sink);

  return (BigInt(low) << BIG_32) | BigInt(high);
}

function writeI64(value: bigint, sink: Sink): Sink {
  const low = value & BIG_32Fs;
  const high = value >> BIG_32;

  writeI32(Number(low), sink);
  writeI32(Number(high), sink);
  return sink;
}

function readUSize(sink: Sink): bigint {
  return readU64(sink);
}

function writeUSize(value: bigint, sink: Sink): Sink {
  writeU64(value, sink);
  return sink;
}

function readISize(sink: Sink): bigint {
  return readI64(sink);
}

function writeISize(value: bigint, sink: Sink): Sink {
  writeI64(value, sink);
  return sink;
}

function readU128(sink: Sink): bigint {
  const high = readU64(sink);
  const low = readU64(sink);

  return (low << BIG_64) | high;
}

function writeU128(value: bigint, sink: Sink): Sink {
  const low = value & BIG_64Fs;
  const high = value >> BIG_64;

  writeU64(low, sink);
  writeU64(high, sink);
  return sink;
}

function readI128(sink: Sink): bigint {
  const high = readI64(sink);
  const low = readI64(sink);

  return (low << BIG_64) | high;
}

function writeI128(value: bigint, sink: Sink): Sink {
  const low = value & BIG_64Fs;
  const high = value >> BIG_64;

  writeI64(low, sink);
  writeI64(high, sink);
  return sink;
}

function readBool(sink: Sink): boolean {
  return readU8(sink) == 1;
}

function writeBool(value: boolean, sink: Sink): Sink {
  writeU8(value ? 1 : 0, sink);
  return sink;
}

function writeBytes(value: Uint8Array, sink: Sink): Sink {
  sink.reserve(value.length + 1);
  new Uint8Array(sink.view.buffer, sink.position).set(value);
  sink.position += value.length;
  return sink;
}

function readBytes(sink: Sink, length: number): Uint8Array {
  let bytes = sink.view.buffer.slice(sink.position, sink.position + length);
  sink.position += length;
  return new Uint8Array(bytes);
}

function writeString(value: string, sink: Sink): Sink {
  const bytes = textEncoder.encode(value);
  writeU64(BigInt(bytes.length), sink);
  writeBytes(bytes, sink);
  return sink;
}

function readString(sink: Sink): string {
  const length = readU64(sink);
  let bytes = readBytes(sink, Number(length));
  return textDecoder.decode(bytes);
}

function writeOption<T>(
  writeFunc: (value: T, sink: Sink) => Sink
): (value: T | undefined, sink: Sink) => Sink {
  return (value: T | undefined, sink: Sink) => {
    writeBool(value != undefined, sink);

    if (value != undefined) {
      writeFunc(value, sink);
    }

    return sink;
  };
}

function readOption<T>(
  readFunc: (sink: Sink) => T
): (sink: Sink) => T | undefined {
  return (sink: Sink) => {
    let some = readBool(sink);
    if (!some) {
      return undefined;
    }

    return readFunc(sink);
  };
}

function writeSeq<T>(
  writeFunc: (value: T, sink: Sink) => Sink
): (value: Array<T>, sink: Sink) => Sink {
  return (value: Array<T>, sink: Sink) => {
    writeU64(BigInt(value.length), sink);

    for (const each of value) {
      writeFunc(each, sink);
    }

    return sink;
  };
}

function readSeq<T>(readFunc: (sink: Sink) => T): (sink: Sink) => Array<T> {
  return (sink: Sink) => {
    let length = readU64(sink);

    let output = new Array();

    for (var i = 0; i < length; i++) {
      output.push(readFunc(sink));
    }

    return output;
  };
}

type TypedArray = ArrayLike<any> & {
  BYTES_PER_ELEMENT: number;
  readonly length: number;
  readonly buffer: ArrayBuffer;
  readonly byteLength: number;
  readonly byteOffset: number;
};

type TypedArrayConstructor<T> = {
  new (buffer: ArrayBuffer, offset?: number, length?: number): T;
  BYTES_PER_ELEMENT: number;
};

function writeTypedArray<T extends TypedArray>(value: T, sink: Sink): Sink {
  writeU64(BigInt(value.length), sink);

  writeBytes(
    new Uint8Array(value.buffer.slice(value.byteOffset, value.byteLength)),
    sink
  );

  return sink;
}

function readTypedArray<T extends TypedArray>(
  array_type: TypedArrayConstructor<T>
): (sink: Sink) => T {
  return (sink: Sink) => {
    let length = readU64(sink);
    let bytes = readBytes(sink, Number(length) * array_type.BYTES_PER_ELEMENT);
    return new array_type(bytes.buffer, 0, Number(length));
  };
}

function writeMap<TK, TV>(
  writeKeyFunc: (value: TK, sink: Sink) => Sink,
  writeValueFunc: (value: TV, sink: Sink) => Sink
): (value: Map<TK, TV>, sink: Sink) => Sink {
  return (value: Map<TK, TV>, sink: Sink) => {
    writeU64(BigInt(value.size), sink);

    value.forEach((v, k) => {
      writeKeyFunc(k, sink);
      writeValueFunc(v, sink);
    });

    return sink;
  };
}

function readMap<TK, TV>(
  readKeyFunc: (sink: Sink) => TK,
  readValueFunc: (sink: Sink) => TV
): (sink: Sink) => Map<TK, TV> {
  return (sink: Sink) => {
    let length = readU64(sink);

    let output = new Map();

    for (var i = 0; i < length; i++) {
      output.set(readKeyFunc(sink), readValueFunc(sink));
    }

    return output;
  };
}
