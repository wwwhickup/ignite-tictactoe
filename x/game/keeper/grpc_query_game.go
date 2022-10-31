package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"tictactoe/x/game/types"
)

func (k Keeper) GameAll(c context.Context, req *types.QueryAllGameRequest) (*types.QueryAllGameResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var games []types.Game
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	gameStore := prefix.NewStore(store, types.KeyPrefix(types.GameKey))

	pageRes, err := query.Paginate(gameStore, req.Pagination, func(key []byte, value []byte) error {
		var game types.Game
		if err := k.cdc.Unmarshal(value, &game); err != nil {
			return err
		}

		games = append(games, game)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllGameResponse{Game: games, Pagination: pageRes}, nil
}

func (k Keeper) Game(c context.Context, req *types.QueryGetGameRequest) (*types.QueryGetGameResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	game, found := k.GetGame(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetGameResponse{Game: game}, nil
}
