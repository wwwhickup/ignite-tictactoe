<template>
  <h1>Game List </h1>
  <div class="card-container">
    <GameRender v-for="game in allGames" key={{game.id}} :game="game" class="card" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Client } from 'tictactoe-client-ts'
import GameRender from './GameRender.vue';

const client = new Client({ 
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos"
  },
);
export default {
  name: 'GameList',
  components: {GameRender},
  setup() {
    // store
    let $s = useStore()
    const allGames = ref([])
    
    let address = computed(() => $s.state.common.wallet.selectedAddress)
    let myGames = computed(async () => {
      if(address.value) {
        return allGames.value.filter((game) => game.creator === address.value || game.inviter === address.value)
      } else return []
    })

    let showAddress = (address) => {
      const len = address.length
      return address.slice(0, 10) + '......' + address.slice(len - 5, len)
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
      allGames.value = await client.TictactoeGame.query.queryGameAll().then(_data => _data.data.Game)
      console.log(allGames.value)
    })

    return {
      address,
      myGames,
      allGames,
      fillCell,
      showAddress
    }
  }
}
</script>
<style scoped lang="scss">
  .card-container {

  }
</style>