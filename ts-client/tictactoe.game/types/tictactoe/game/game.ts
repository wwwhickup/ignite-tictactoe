/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "tictactoe.game";

export interface Game {
  id: number;
  creator: string;
  inviter: string;
  status: number[];
  winner: number;
  completed: boolean;
}

function createBaseGame(): Game {
  return { id: 0, creator: "", inviter: "", status: [], winner: 0, completed: false };
}

export const Game = {
  encode(message: Game, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.inviter !== "") {
      writer.uint32(26).string(message.inviter);
    }
    writer.uint32(34).fork();
    for (const v of message.status) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.winner !== 0) {
      writer.uint32(40).int32(message.winner);
    }
    if (message.completed === true) {
      writer.uint32(48).bool(message.completed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Game {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.inviter = reader.string();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.status.push(reader.int32());
            }
          } else {
            message.status.push(reader.int32());
          }
          break;
        case 5:
          message.winner = reader.int32();
          break;
        case 6:
          message.completed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Game {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      inviter: isSet(object.inviter) ? String(object.inviter) : "",
      status: Array.isArray(object?.status) ? object.status.map((e: any) => Number(e)) : [],
      winner: isSet(object.winner) ? Number(object.winner) : 0,
      completed: isSet(object.completed) ? Boolean(object.completed) : false,
    };
  },

  toJSON(message: Game): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.creator !== undefined && (obj.creator = message.creator);
    message.inviter !== undefined && (obj.inviter = message.inviter);
    if (message.status) {
      obj.status = message.status.map((e) => Math.round(e));
    } else {
      obj.status = [];
    }
    message.winner !== undefined && (obj.winner = Math.round(message.winner));
    message.completed !== undefined && (obj.completed = message.completed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Game>, I>>(object: I): Game {
    const message = createBaseGame();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.inviter = object.inviter ?? "";
    message.status = object.status?.map((e) => e) || [];
    message.winner = object.winner ?? 0;
    message.completed = object.completed ?? false;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
