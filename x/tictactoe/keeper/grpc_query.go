package keeper

import (
	"tictactoe/x/tictactoe/types"
)

var _ types.QueryServer = Keeper{}
