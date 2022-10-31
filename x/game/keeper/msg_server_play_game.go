package keeper

import (
	"context"
	"strconv"
	"tictactoe/x/game/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func totalMoves(status []int32) int32 {
	totalMoves := 0
	for _, cell := range status {
		if cell != 0 {
			totalMoves++
		}
	}
	return int32(totalMoves)
}

func checkWinner(game types.Game) types.Game {
	status := game.Status
	// checking by row
	for i := 0; i < 3; i++ {
		sum := status[i*3] + status[i*3+1] + status[i*3+2]
		if sum == 3 {
			game.Winner = 1
			game.Completed = true
			return game
		} else if sum == -3 {
			game.Winner = 2
			game.Completed = true
			return game
		}
	}
	// checking by col
	for i := 0; i < 3; i++ {
		sum := status[i] + status[i+3] + status[i+6]
		if sum == 3 {
			game.Winner = 1
			game.Completed = true
			return game
		} else if sum == -3 {
			game.Winner = 2
			game.Completed = true
			return game
		}
	}
	// checking by diagonal
	aDiag := status[0] + status[4] + status[8]
	bDiag := status[2] + status[4] + status[6]

	if aDiag == 3 {
		game.Winner = 1
		game.Completed = true
		return game
	} else if aDiag == -3 {
		game.Winner = 2
		game.Completed = true
		return game
	}

	if bDiag == 3 {
		game.Winner = 1
		game.Completed = true
		return game
	} else if bDiag == -3 {
		game.Winner = 2
		game.Completed = true
		return game
	}
	return game
}

func (k msgServer) PlayGame(goCtx context.Context, msg *types.MsgPlayGame) (*types.MsgPlayGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx
	gameId, _ := strconv.ParseInt(msg.GameId, 10, 64)
	game, isExit := k.GetGame(ctx, uint64(gameId))
	if !isExit {
		// Error Unknow Request "No Such Game"
		return &types.MsgPlayGameResponse{}, nil
	}

	if game.Creator != msg.Creator && game.Inviter != msg.Creator {
		// Error Unauthorized "Not Playing in this game"
		return &types.MsgPlayGameResponse{}, nil
	}

	if game.Completed {
		// Error unknow Request "Game already finished"
		return &types.MsgPlayGameResponse{}, nil
	}

	var player1 bool
	if game.Creator == msg.Creator {
		player1 = true
	}

	var player1ShouldPlay bool
	movesPlayed := totalMoves(game.Status)
	if movesPlayed%2 == 0 {
		player1ShouldPlay = true
	}

	if (player1 && !player1ShouldPlay) || (!player1 && player1ShouldPlay) {
		// Error unknow Requst "Not your turn"
		return &types.MsgPlayGameResponse{}, nil
	}

	rowNum, _ := strconv.ParseInt(string(msg.Row), 10, 64)
	colNum, _ := strconv.ParseInt(string(msg.Col), 10, 64)
	cellIndex := rowNum*3 + colNum
	if game.Status[cellIndex] != 0 {
		// Error Unknow Request Cell is already taken
		return &types.MsgPlayGameResponse{}, nil
	}

	if player1 {
		game.Status[cellIndex] = 1
	} else {
		game.Status[cellIndex] = -1
	}

	game = checkWinner(game)
	movesPlayed = totalMoves(game.Status)
	if movesPlayed == 9 {
		game.Completed = true
	}
	k.SetGame(ctx, game)
	return &types.MsgPlayGameResponse{}, nil
}
