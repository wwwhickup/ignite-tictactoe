package keeper

import (
	"tictactoe/x/game/types"
)

var _ types.QueryServer = Keeper{}
