package keeper

import (
	"context"

	"tictactoe/x/game/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func initialStatus() []int32 {
	initialStatus := make([]int32, 9)
	return initialStatus
}

func (k msgServer) CreateGame(goCtx context.Context, msg *types.MsgCreateGame) (*types.MsgCreateGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx
	game := types.Game{
		Creator:   msg.Creator,
		Inviter:   msg.Inviter,
		Status:    initialStatus(),
		Winner:    int32(0),
		Completed: false,
	}
	k.AppendGame(ctx, game)

	return &types.MsgCreateGameResponse{}, nil
}
