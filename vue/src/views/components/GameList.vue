<template>
  <h1>Game List </h1>
  <div class="card-container">
    <div class="header">
      <div>Creator</div>
      <div>Inviter</div>
      <div>Winner</div>
      <div>Status</div>
      <div></div>
    </div>
    <GameShort v-for="game in allGames" key={{game.id}} :game="game" class="card" />
    <!-- <GameRender v-for="game in allGames" key={{game.id}} :game="game" class="card" /> -->
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Client } from 'tictactoe-client-ts'
import GameRender from './GameRender.vue';
import GameShort from './GameShort.vue';

const client = new Client({ 
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos"
  },
);
export default {
  name: 'GameList',
  components: { GameRender, GameShort },
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
    padding: 20px;
    .header {
      display: grid;
      grid-template-columns: 4fr 4fr 2fr 2fr 1fr;
      font-size: 15px;
      font-weight: 800;
      border-bottom: 1px solid gray;
      margin-bottom: 10px;
      padding-bottom: 10px;
      div {
        text-align: center;
      }
    }
  }
</style>