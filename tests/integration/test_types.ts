// This file was auto-generated from Rust code by bincode-typescript v0.1.0

type BufferLike = Sink | Buffer | ArrayBuffer | Uint8Array;

class Sink {
  public view: DataView;
  public pos: number;

  private constructor(input: ArrayBuffer) {
    this.view = new DataView(input);
    this.pos = 0;
  }

  public reserve(extra: number): void {
    if (this.pos + extra <= this.view.buffer.byteLength) {
      return;
    }

    const newBuffer = new ArrayBuffer(
      (this.view.buffer.byteLength + extra) * 2
    );

    new Uint8Array(newBuffer).set(new Uint8Array(this.view.buffer));
    this.view = new DataView(newBuffer);
  }

  public static create(input?: BufferLike): Sink {
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
    return new Uint8Array(this.view.buffer.slice(0, this.pos));
  }

  public getBuffer(): Buffer {
    return Buffer.from(this.view.buffer, 0, this.pos);
  }
}

const BIG_32 = BigInt(32);
const BIG_64 = BigInt(64);
const BIG_32Fs = BigInt("4294967295");
const BIG_64Fs = BigInt("18446744073709551615");

const textEncoder: TextEncoder = new TextEncoder();
const textDecoder: TextDecoder = new TextDecoder();

function deserializeUnit(_sink: Sink): null {
  return null;
}

function serializeUnit(_value: null, sink: Sink): Sink {
  return sink;
}

function deserializeU8(sink: Sink): number {
  const value = sink.view.getUint8(sink.pos);
  sink.pos += 1;
  return value;
}

function serializeU8(value: number, sink: Sink): Sink {
  sink.reserve(1);
  sink.view.setUint8(sink.pos, value);
  sink.pos += 1;
  return sink;
}

function deserializeI8(sink: Sink): number {
  const value = sink.view.getInt8(sink.pos);
  sink.pos += 1;
  return value;
}

function serializeI8(value: number, sink: Sink): Sink {
  sink.reserve(1);
  sink.view.setInt8(sink.pos, value);
  sink.pos += 1;
  return sink;
}

function deserializeU16(sink: Sink): number {
  const value = sink.view.getUint16(sink.pos, true);
  sink.pos += 2;
  return value;
}

function serializeU16(value: number, sink: Sink): Sink {
  sink.reserve(2);
  sink.view.setUint16(sink.pos, value, true);
  sink.pos += 2;
  return sink;
}

function deserializeI16(sink: Sink): number {
  const value = sink.view.getInt16(sink.pos, true);
  sink.pos += 2;
  return value;
}

function serializeI16(value: number, sink: Sink): Sink {
  sink.reserve(2);
  sink.view.setInt16(sink.pos, value, true);
  sink.pos += 2;
  return sink;
}

function deserializeU32(sink: Sink): number {
  const value = sink.view.getUint32(sink.pos, true);
  sink.pos += 4;
  return value;
}

function serializeU32(value: number, sink: Sink): Sink {
  sink.reserve(4);
  sink.view.setUint32(sink.pos, value, true);
  sink.pos += 4;
  return sink;
}

function deserializeI32(sink: Sink): number {
  const value = sink.view.getInt32(sink.pos, true);
  sink.pos += 4;
  return value;
}

function serializeI32(value: number, sink: Sink): Sink {
  sink.reserve(4);
  sink.view.setInt32(sink.pos, value, true);
  sink.pos += 4;
  return sink;
}

function deserializeF32(sink: Sink): number {
  const value = sink.view.getFloat32(sink.pos, true);
  sink.pos += 4;
  return value;
}

function serializeF32(value: number, sink: Sink): Sink {
  sink.reserve(4);
  sink.view.setFloat32(sink.pos, value, true);
  sink.pos += 4;
  return sink;
}

function deserializeF64(sink: Sink): number {
  const value = sink.view.getFloat64(sink.pos, true);
  sink.pos += 8;
  return value;
}

function serializeF64(value: number, sink: Sink): Sink {
  sink.reserve(8);
  sink.view.setFloat64(sink.pos, value, true);
  sink.pos += 8;
  return sink;
}

function deserializeU64(sink: Sink): bigint {
  const high = deserializeU32(sink);
  const low = deserializeU32(sink);

  return (BigInt(low) << BIG_32) | BigInt(high);
}

function serializeU64(value: bigint, sink: Sink): Sink {
  const low = value & BIG_32Fs;
  const high = value >> BIG_32;

  serializeU32(Number(low), sink);
  serializeU32(Number(high), sink);
  return sink;
}

function deserializeI64(sink: Sink): bigint {
  const high = deserializeI32(sink);
  const low = deserializeI32(sink);

  return (BigInt(low) << BIG_32) | BigInt(high);
}

function serializeI64(value: bigint, sink: Sink): Sink {
  const low = value & BIG_32Fs;
  const high = value >> BIG_32;

  serializeI32(Number(low), sink);
  serializeI32(Number(high), sink);
  return sink;
}

function deserializeUSize(sink: Sink): bigint {
  return deserializeU64(sink);
}

function serializeUSize(value: bigint, sink: Sink): Sink {
  serializeU64(value, sink);
  return sink;
}

function deserializeISize(sink: Sink): bigint {
  return deserializeI64(sink);
}

function serializeISize(value: bigint, sink: Sink): Sink {
  serializeI64(value, sink);
  return sink;
}

function deserializeU128(sink: Sink): bigint {
  const high = deserializeU64(sink);
  const low = deserializeU64(sink);

  return (low << BIG_64) | high;
}

function serializeU128(value: bigint, sink: Sink): Sink {
  const low = value & BIG_64Fs;
  const high = value >> BIG_64;

  serializeU64(low, sink);
  serializeU64(high, sink);
  return sink;
}

function deserializeI128(sink: Sink): bigint {
  const high = deserializeI64(sink);
  const low = deserializeI64(sink);

  return (low << BIG_64) | high;
}

function serializeI128(value: bigint, sink: Sink): Sink {
  const low = value & BIG_64Fs;
  const high = value >> BIG_64;

  serializeI64(low, sink);
  serializeI64(high, sink);
  return sink;
}

function deserializeBool(sink: Sink): boolean {
  return deserializeU8(sink) == 1;
}

function serializeBool(value: boolean, sink: Sink): Sink {
  serializeU8(value ? 1 : 0, sink);
  return sink;
}

function serializeBytes(value: Uint8Array, sink: Sink): Sink {
  sink.reserve(value.length + 1);
  new Uint8Array(sink.view.buffer, sink.pos).set(value);
  sink.pos += value.length;
  return sink;
}

function deserializeBytes(sink: Sink, length: number): Uint8Array {
  const bytes = sink.view.buffer.slice(sink.pos, sink.pos + length);
  sink.pos += length;
  return new Uint8Array(bytes);
}

function serializeString(value: string, sink: Sink): Sink {
  const bytes = textEncoder.encode(value);
  serializeU64(BigInt(bytes.length), sink);
  serializeBytes(bytes, sink);
  return sink;
}

function deserializeString(sink: Sink): string {
  const length = deserializeU64(sink);
  const bytes = deserializeBytes(sink, Number(length));
  return textDecoder.decode(bytes);
}

function serializeOption<T>(
  serializeFunc: (value: T, sink: Sink) => Sink
): (value: T | undefined, sink: Sink) => Sink {
  return (value: T | undefined, sink: Sink) => {
    serializeBool(value != undefined, sink);

    if (value != undefined) {
      serializeFunc(value, sink);
    }

    return sink;
  };
}

function deserializeOption<T>(
  deserializeFunc: (sink: Sink) => T
): (sink: Sink) => T | undefined {
  return (sink: Sink) => {
    const some = deserializeBool(sink);
    if (!some) {
      return undefined;
    }

    return deserializeFunc(sink);
  };
}

function serializeSeq<T>(
  serializeFunc: (value: T, sink: Sink) => Sink
): (value: Array<T>, sink: Sink) => Sink {
  return (value: Array<T>, sink: Sink) => {
    serializeU64(BigInt(value.length), sink);

    for (const each of value) {
      serializeFunc(each, sink);
    }

    return sink;
  };
}

function deserializeSeq<T>(
  deserializeFunc: (sink: Sink) => T
): (sink: Sink) => Array<T> {
  return (sink: Sink) => {
    const length = deserializeU64(sink);
    const output = new Array();

    for (var i = 0; i < length; i++) {
      output.push(deserializeFunc(sink));
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

function serializeTypedArray<T extends TypedArray>(value: T, sink: Sink): Sink {
  serializeU64(BigInt(value.length), sink);

  serializeBytes(
    new Uint8Array(value.buffer.slice(value.byteOffset, value.byteLength)),
    sink
  );

  return sink;
}

function deserializeTypedArray<T extends TypedArray>(
  array_type: TypedArrayConstructor<T>
): (sink: Sink) => T {
  return (sink: Sink) => {
    const length = deserializeU64(sink);
    const bytes = deserializeBytes(
      sink,
      Number(length) * array_type.BYTES_PER_ELEMENT
    );
    return new array_type(bytes.buffer, 0, Number(length));
  };
}

function serializeMap<TK, TV>(
  serializeKeyFunc: (value: TK, sink: Sink) => Sink,
  serializeValueFunc: (value: TV, sink: Sink) => Sink
): (value: Map<TK, TV>, sink: Sink) => Sink {
  return (value: Map<TK, TV>, sink: Sink) => {
    serializeU64(BigInt(value.size), sink);

    value.forEach((v, k) => {
      serializeKeyFunc(k, sink);
      serializeValueFunc(v, sink);
    });

    return sink;
  };
}

function deserializeMap<TK, TV>(
  deserializeKeyFunc: (sink: Sink) => TK,
  deserializeValueFunc: (sink: Sink) => TV
): (sink: Sink) => Map<TK, TV> {
  return (sink: Sink) => {
    const length = deserializeU64(sink);
    const output = new Map();

    for (var i = 0; i < length; i++) {
      output.set(deserializeKeyFunc(sink), deserializeValueFunc(sink));
    }

    return output;
  };
}

function serializeTuple<T extends any[]>(
  ...serializeFns: Array<(value: any, sink: Sink) => Sink>
): (value: T, sink: Sink) => Sink {
  return (value: T, sink: Sink) => {
    for (let i = 0; i < serializeFns.length; i++) {
      serializeFns[i](value[i], sink);
    }

    return sink;
  };
}

function deserializeTuple<T extends any[]>(
  ...deserializeFns: Array<(sink: Sink) => any>
): (sink: Sink) => T {
  return (sink: Sink) => {
    const out = new Array();

    for (const deserializeFn of deserializeFns) {
      out.push(deserializeFn(sink));
    }

    return out as T;
  };
}

type Wildcard<MatchFull, Result> = Partial<MatchFull> & {
  _: () => Result;
};

type MatchObj<MatchFull, Result> = MatchFull | Wildcard<MatchFull, Result>;

export type SomeEvent =
  | { tag: "Unit" }
  | { tag: "NewType"; value: number }
  | { tag: "NewTypeOptVec"; value: Array<number> | undefined }
  | { tag: "NewTypeOptUnitEnum"; value: Array<UnitEnum> | undefined }
  | { tag: "Tuple"; value: SomeEvent_Tuple }
  | { tag: "Struct"; value: SomeEvent_Struct }
  | { tag: "NewTypeWithStruct"; value: SomeStruct }
  | {
      tag: "NewTypeOptHashMap";
      value: Map<string, UnitEnum | undefined> | undefined;
    }
  | { tag: "StructWithStruct"; value: SomeEvent_StructWithStruct };

export interface SomeEvent_Tuple {
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

export interface SomeEvent_Struct {
  length: bigint;
  interval: number;
}

export interface SomeEvent_StructWithStruct {
  inner: SomeStruct;
}

interface SomeEvent_MatchFull<Result> {
  Unit: () => Result;
  NewType: (value: number) => Result;
  NewTypeOptVec: (value: Array<number> | undefined) => Result;
  NewTypeOptUnitEnum: (value: Array<UnitEnum> | undefined) => Result;
  Tuple: (value: SomeEvent_Tuple) => Result;
  Struct: (value: SomeEvent_Struct) => Result;
  NewTypeWithStruct: (value: SomeStruct) => Result;
  NewTypeOptHashMap: (
    value: Map<string, UnitEnum | undefined> | undefined
  ) => Result;
  StructWithStruct: (value: SomeEvent_StructWithStruct) => Result;
}

export module SomeEvent {
  export const Unit: SomeEvent = { tag: "Unit" };
  export const NewType = (value: number): SomeEvent => ({
    tag: "NewType",
    value,
  });
  export const NewTypeOptVec = (
    value: Array<number> | undefined
  ): SomeEvent => ({ tag: "NewTypeOptVec", value });
  export const NewTypeOptUnitEnum = (
    value: Array<UnitEnum> | undefined
  ): SomeEvent => ({ tag: "NewTypeOptUnitEnum", value });
  export const Tuple = (
    p0: number,
    p1: number,
    p2: number,
    p3: number,
    p4: number,
    p5: number,
    p6: bigint,
    p7: bigint,
    p8: bigint,
    p9: bigint,
    p10: bigint,
    p11: bigint,
    p12: boolean
  ): SomeEvent => ({
    tag: "Tuple",
    value: [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12],
  });
  export const Struct = (value: SomeEvent_Struct): SomeEvent => ({
    tag: "Struct",
    value,
  });
  export const NewTypeWithStruct = (value: SomeStruct): SomeEvent => ({
    tag: "NewTypeWithStruct",
    value,
  });
  export const NewTypeOptHashMap = (
    value: Map<string, UnitEnum | undefined> | undefined
  ): SomeEvent => ({ tag: "NewTypeOptHashMap", value });
  export const StructWithStruct = (
    value: SomeEvent_StructWithStruct
  ): SomeEvent => ({ tag: "StructWithStruct", value });

  export const match = <Result>(
    input: SomeEvent,
    match: MatchObj<SomeEvent_MatchFull<Result>, Result>
  ): Result => {
    const fn = match[input.tag];
    if (fn) {
      const param: any = "value" in input ? input.value : undefined;
      return fn(param);
    } else if ("_" in match) {
      return match._();
    } else {
      throw new Error(
        `Missing match arm for '${input.tag}'. Add this or a wildcard match '_'`
      );
    }
  };

  export const serialize = (
    value: SomeEvent,
    bufferlike?: BufferLike
  ): Sink => {
    const sink = Sink.create(bufferlike);
    switch (value.tag) {
      case "Unit":
        serializeU32(0, sink);
        break;
      case "NewType":
        serializeU32(1, sink);
        const val1 = value as { value: number };
        serializeF32(val1.value, sink);
        break;
      case "NewTypeOptVec":
        serializeU32(2, sink);
        const val2 = value as { value: Array<number> | undefined };
        serializeOption(serializeSeq(serializeU8))(val2.value, sink);
        break;
      case "NewTypeOptUnitEnum":
        serializeU32(3, sink);
        const val3 = value as { value: Array<UnitEnum> | undefined };
        serializeOption(serializeSeq(UnitEnum.serialize))(val3.value, sink);
        break;
      case "Tuple":
        serializeU32(4, sink);
        const val4 = value as { value: SomeEvent_Tuple };
        serializeU8(val4.value[0], sink);
        serializeI8(val4.value[1], sink);
        serializeU16(val4.value[2], sink);
        serializeI16(val4.value[3], sink);
        serializeU32(val4.value[4], sink);
        serializeI32(val4.value[5], sink);
        serializeU64(val4.value[6], sink);
        serializeI64(val4.value[7], sink);
        serializeU128(val4.value[8], sink);
        serializeI128(val4.value[9], sink);
        serializeU64(val4.value[10], sink);
        serializeI64(val4.value[11], sink);
        serializeBool(val4.value[12], sink);
        break;
      case "Struct":
        serializeU32(5, sink);
        const val5 = value as { value: SomeEvent_Struct };
        serializeU64(val5.value.length, sink);
        serializeF64(val5.value.interval, sink);
        break;
      case "NewTypeWithStruct":
        serializeU32(6, sink);
        const val6 = value as { value: SomeStruct };
        SomeStruct.serialize(val6.value, sink);
        break;
      case "NewTypeOptHashMap":
        serializeU32(7, sink);
        const val7 = value as {
          value: Map<string, UnitEnum | undefined> | undefined;
        };
        serializeOption(
          serializeMap(serializeString, serializeOption(UnitEnum.serialize))
        )(val7.value, sink);
        break;
      case "StructWithStruct":
        serializeU32(8, sink);
        const val8 = value as { value: SomeEvent_StructWithStruct };
        SomeStruct.serialize(val8.value.inner, sink);
        break;
      default:
        throw new Error(
          `'${(value as any).tag}' is invalid tag for enum 'SomeEvent'`
        );
    }

    return sink;
  };

  export const deserialize = (bufferLike: BufferLike): SomeEvent => {
    const sink = Sink.create(bufferLike);
    const value = deserializeU32(sink);
    switch (value) {
      case 0:
        return SomeEvent.Unit;
      case 1:
        return SomeEvent.NewType(deserializeF32(sink));
      case 2:
        return SomeEvent.NewTypeOptVec(
          deserializeOption(deserializeSeq(deserializeU8))(sink)
        );
      case 3:
        return SomeEvent.NewTypeOptUnitEnum(
          deserializeOption(deserializeSeq(UnitEnum.deserialize))(sink)
        );
      case 4:
        return SomeEvent.Tuple(
          deserializeU8(sink),
          deserializeI8(sink),
          deserializeU16(sink),
          deserializeI16(sink),
          deserializeU32(sink),
          deserializeI32(sink),
          deserializeU64(sink),
          deserializeI64(sink),
          deserializeU128(sink),
          deserializeI128(sink),
          deserializeU64(sink),
          deserializeI64(sink),
          deserializeBool(sink)
        );
      case 5:
        return SomeEvent.Struct({
          length: deserializeU64(sink),
          interval: deserializeF64(sink),
        });
      case 6:
        return SomeEvent.NewTypeWithStruct(SomeStruct.deserialize(sink));
      case 7:
        return SomeEvent.NewTypeOptHashMap(
          deserializeOption(
            deserializeMap(
              deserializeString,
              deserializeOption(UnitEnum.deserialize)
            )
          )(sink)
        );
      case 8:
        return SomeEvent.StructWithStruct({
          inner: SomeStruct.deserialize(sink),
        });
      default:
        throw new Error(`'${value}' is invalid value for enum 'SomeEvent'`);
    }
  };
}

export interface SomeStruct {
  zero: number | undefined;
  one: number;
  two: [number, UnitEnum];
  three: string;
}

export module SomeStruct {
  export const serialize = (
    value: SomeStruct,
    bufferLike?: BufferLike
  ): Sink => {
    const sink = Sink.create(bufferLike);
    serializeOption(serializeU8)(value.zero, sink);
    serializeF64(value.one, sink);
    serializeTuple<[number, UnitEnum]>(serializeU8, UnitEnum.serialize)(
      value.two,
      sink
    );
    serializeString(value.three, sink);
    return sink;
  };

  export const deserialize = (bufferLike: BufferLike): SomeStruct => {
    const sink = Sink.create(bufferLike);
    return {
      zero: deserializeOption(deserializeU8)(sink),
      one: deserializeF64(sink),
      two: deserializeTuple<[number, UnitEnum]>(
        deserializeU8,
        UnitEnum.deserialize
      )(sink),
      three: deserializeString(sink),
    };
  };
}

export interface SomeTuple {
  0: number;
  1: Array<number>;
}

export const SomeTuple = (p0: number, p1: Array<number>): SomeTuple => {
  return { 0: p0, 1: p1 };
};

SomeTuple.serialize = (value: SomeTuple, bufferLike?: BufferLike): Sink => {
  const sink = Sink.create(bufferLike);
  serializeI32(value[0], sink);
  serializeSeq(serializeU32)(value[1], sink);
  return sink;
};

SomeTuple.deserialize = (bufferLike: BufferLike): SomeTuple => {
  const sink = Sink.create(bufferLike);
  return SomeTuple(deserializeI32(sink), deserializeSeq(deserializeU32)(sink));
};
export type UnitEnum = { tag: "One" } | { tag: "Two" } | { tag: "Three" };

interface UnitEnum_MatchFull<Result> {
  One: () => Result;
  Two: () => Result;
  Three: () => Result;
}

export module UnitEnum {
  export const One: UnitEnum = { tag: "One" };
  export const Two: UnitEnum = { tag: "Two" };
  export const Three: UnitEnum = { tag: "Three" };

  export const match = <Result>(
    input: UnitEnum,
    match: MatchObj<UnitEnum_MatchFull<Result>, Result>
  ): Result => {
    const fn = match[input.tag];
    if (fn) {
      return fn();
    } else if ("_" in match) {
      return match._();
    } else {
      throw new Error(
        `Missing match arm for '${input.tag}'. Add this or a wildcard match '_'`
      );
    }
  };

  export const serialize = (value: UnitEnum, bufferlike?: BufferLike): Sink => {
    const sink = Sink.create(bufferlike);
    switch (value.tag) {
      case "One":
        serializeU32(0, sink);
        break;
      case "Two":
        serializeU32(1, sink);
        break;
      case "Three":
        serializeU32(2, sink);
        break;
      default:
        throw new Error(
          `'${(value as any).tag}' is invalid tag for enum 'UnitEnum'`
        );
    }

    return sink;
  };

  export const deserialize = (bufferLike: BufferLike): UnitEnum => {
    const sink = Sink.create(bufferLike);
    const value = deserializeU32(sink);
    switch (value) {
      case 0:
        return UnitEnum.One;
      case 1:
        return UnitEnum.Two;
      case 2:
        return UnitEnum.Three;
      default:
        throw new Error(`'${value}' is invalid value for enum 'UnitEnum'`);
    }
  };
}
