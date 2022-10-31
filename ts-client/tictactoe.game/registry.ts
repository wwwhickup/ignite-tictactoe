import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateGame } from "./types/tictactoe/game/tx";
import { MsgPlayGame } from "./types/tictactoe/game/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/tictactoe.game.MsgCreateGame", MsgCreateGame],
    ["/tictactoe.game.MsgPlayGame", MsgPlayGame],
    
];

export { msgTypes }