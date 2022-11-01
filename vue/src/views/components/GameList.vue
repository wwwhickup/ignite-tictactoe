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

    onMounted(async () => {
      allGames.value = await client.TictactoeGame.query.queryGameAll().then(_data => _data.data.Game)
      console.log(allGames.value)
    })

    return {
      address,
      myGames,
      allGames,
    }
  }
}
</script>
<style scoped lang="scss">
  .card-container {

  }
</style>