package game_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "tictactoe/testutil/keeper"
	"tictactoe/testutil/nullify"
	"tictactoe/x/game"
	"tictactoe/x/game/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		GameList: []types.Game{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		GameCount: 2,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.GameKeeper(t)
	game.InitGenesis(ctx, *k, genesisState)
	got := game.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.GameList, got.GameList)
	require.Equal(t, genesisState.GameCount, got.GameCount)
	// this line is used by starport scaffolding # genesis/test/assert
}
