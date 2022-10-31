package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"tictactoe/x/game/types"
)

var _ = strconv.Itoa(0)

func CmdPlayGame() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "play-game [game-id] [row] [col]",
		Short: "Broadcast message playGame",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argGameId := args[0]
			argRow := args[1]
			argCol := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgPlayGame(
				clientCtx.GetFromAddress().String(),
				argGameId,
				argRow,
				argCol,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
