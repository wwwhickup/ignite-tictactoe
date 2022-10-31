package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "tictactoe/testutil/keeper"
	"tictactoe/x/tictactoe/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.TictactoeKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
