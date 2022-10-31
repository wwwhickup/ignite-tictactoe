/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "tictactoe.game";

export interface MsgCreateGame {
  creator: string;
  inviter: string;
}

export interface MsgCreateGameResponse {
}

export interface MsgPlayGame {
  creator: string;
  gameId: string;
  row: string;
  col: string;
}

export interface MsgPlayGameResponse {
}

function createBaseMsgCreateGame(): MsgCreateGame {
  return { creator: "", inviter: "" };
}

export const MsgCreateGame = {
  encode(message: MsgCreateGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.inviter !== "") {
      writer.uint32(18).string(message.inviter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.inviter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGame {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      inviter: isSet(object.inviter) ? String(object.inviter) : "",
    };
  },

  toJSON(message: MsgCreateGame): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.inviter !== undefined && (obj.inviter = message.inviter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGame>, I>>(object: I): MsgCreateGame {
    const message = createBaseMsgCreateGame();
    message.creator = object.creator ?? "";
    message.inviter = object.inviter ?? "";
    return message;
  },
};

function createBaseMsgCreateGameResponse(): MsgCreateGameResponse {
  return {};
}

export const MsgCreateGameResponse = {
  encode(_: MsgCreateGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateGameResponse {
    return {};
  },

  toJSON(_: MsgCreateGameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGameResponse>, I>>(_: I): MsgCreateGameResponse {
    const message = createBaseMsgCreateGameResponse();
    return message;
  },
};

function createBaseMsgPlayGame(): MsgPlayGame {
  return { creator: "", gameId: "", row: "", col: "" };
}

export const MsgPlayGame = {
  encode(message: MsgPlayGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.gameId !== "") {
      writer.uint32(18).string(message.gameId);
    }
    if (message.row !== "") {
      writer.uint32(26).string(message.row);
    }
    if (message.col !== "") {
      writer.uint32(34).string(message.col);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPlayGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlayGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.gameId = reader.string();
          break;
        case 3:
          message.row = reader.string();
          break;
        case 4:
          message.col = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPlayGame {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      gameId: isSet(object.gameId) ? String(object.gameId) : "",
      row: isSet(object.row) ? String(object.row) : "",
      col: isSet(object.col) ? String(object.col) : "",
    };
  },

  toJSON(message: MsgPlayGame): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.gameId !== undefined && (obj.gameId = message.gameId);
    message.row !== undefined && (obj.row = message.row);
    message.col !== undefined && (obj.col = message.col);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPlayGame>, I>>(object: I): MsgPlayGame {
    const message = createBaseMsgPlayGame();
    message.creator = object.creator ?? "";
    message.gameId = object.gameId ?? "";
    message.row = object.row ?? "";
    message.col = object.col ?? "";
    return message;
  },
};

function createBaseMsgPlayGameResponse(): MsgPlayGameResponse {
  return {};
}

export const MsgPlayGameResponse = {
  encode(_: MsgPlayGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPlayGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPlayGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgPlayGameResponse {
    return {};
  },

  toJSON(_: MsgPlayGameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgPlayGameResponse>, I>>(_: I): MsgPlayGameResponse {
    const message = createBaseMsgPlayGameResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateGame(request: MsgCreateGame): Promise<MsgCreateGameResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  PlayGame(request: MsgPlayGame): Promise<MsgPlayGameResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateGame = this.CreateGame.bind(this);
    this.PlayGame = this.PlayGame.bind(this);
  }
  CreateGame(request: MsgCreateGame): Promise<MsgCreateGameResponse> {
    const data = MsgCreateGame.encode(request).finish();
    const promise = this.rpc.request("tictactoe.game.Msg", "CreateGame", data);
    return promise.then((data) => MsgCreateGameResponse.decode(new _m0.Reader(data)));
  }

  PlayGame(request: MsgPlayGame): Promise<MsgPlayGameResponse> {
    const data = MsgPlayGame.encode(request).finish();
    const promise = this.rpc.request("tictactoe.game.Msg", "PlayGame", data);
    return promise.then((data) => MsgPlayGameResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
