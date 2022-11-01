<template>
  <div class="card">
    <div>{{game.creator === address ? 'Me' : showAddress(game.creator)}}</div>
    <div> {{game.inviter === address ? 'Me' : showAddress(game.inviter)}}</div>
    <div>{{game.winner}}</div>
    <div>{{game.completed ? 'Completed' : 'Processing'}}</div>
    <div>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.79119 9.07955L8.3821 2.47727L8.37074 7.56818H9.60938V0.363636H2.41619L2.40483 1.59091H7.49574L0.90483 8.19318L1.79119 9.07955Z" fill="black"></path></svg>
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
  name: 'GameShort',
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
    padding: 10px;
    box-shadow: 0px 5px 10px 1px grey;
    background: rgba(255, 255, 255, 0.90);
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
    font-size: 14px;
    display: grid;
    grid-template-columns: 4fr 4fr 2fr 2fr 1fr;
    cursor: pointer;
  }
</style>