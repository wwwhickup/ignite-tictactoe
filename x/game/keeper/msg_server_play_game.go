package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"tictactoe/x/game/types"
)

func (k msgServer) PlayGame(goCtx context.Context, msg *types.MsgPlayGame) (*types.MsgPlayGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgPlayGameResponse{}, nil
}
