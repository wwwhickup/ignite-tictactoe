<template>
  <div class="card">
    <div>creator: {{game.creator === address ? 'Me' : showAddress(game.creator)}}</div>
    <div>inviter: {{game.inviter === address ? 'Me' : showAddress(game.inviter)}}</div>
    <hr />
    <div>Winner: {{game.winner}}</div>
    <div>Completed: {{game.completed}}</div>
    <br />
    <div class="tictactoe-board">
      <button v-for="(cell, index) in game.status" key={{index}} :disabled="game.completed" @click="fillCell(game.id, index)" class="cell">
        {{cell == 0 ? '' : cell == 1 ? 'O' : 'X'}}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Client } from 'tictactoe-client-ts'

const client = new Client({ 
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos",
  },
);
export default {
  name: 'GameList',
  props: {
   game: Object
  },
  setup(props) {
    // store
    let game = ref(props.game)
    let $s = useStore()
    let address = computed(() => $s.state.common.wallet.selectedAddress)

    let showAddress = (address) => {
      const len = address.length
      return address.slice(0, 10) + '......' + address.slice(len - 5, len)
    }
    
    const getGameStatus = () => {
      setInterval(async() => {
        const data = await client.TictactoeGame.query.queryGame(props.game.id).then(data => data.data)
        game.value = data.Game
      }, 1000)
    }

    const fillCell = async (gameId, index) => {
      const row = parseInt(index / 3)
      const col = index % 3
      await client.useKeplr()
      const signer = await client.signer.getAccounts()
      const tx = client.TictactoeGame.tx.msgPlayGame({
        value: {
          gameId: gameId,
          row: row.toString(),
          col: col.toString(),
          creator: signer[0].address,
        }
      })
      try {
        const response = await client.TictactoeGame.tx.sendMsgPlayGame(tx)
        console.log('response: ', response)
      } catch(err) {
        console.log(err)
      }
    }

    onMounted(async () => {
      getGameStatus()
    })

    return {
      address,
      game,
      fillCell,
      showAddress
    }
  }
}
</script>
<style scoped lang="scss">
  .card-container {

  }
  .card {
    box-shadow: 0 15px 30px 1px grey;
    background: rgba(255, 255, 255, 0.90);
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
    margin: 5em auto;
    width: 400px;
    padding: 50px;
    font-size: 14px;
  }
  .tictactoe-board {
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    font-size: 34px;
    .cell {
      margin: auto;
      border: 1px rgb(190, 203, 238) solid;
      border-radius: 10px;
      box-shadow: 0 2px 2px 0px grey;
      height: 80px;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
</style>