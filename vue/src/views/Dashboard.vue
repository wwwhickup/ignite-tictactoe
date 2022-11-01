<template>
  <div class="container">
    <GameList />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import GameList from './components/GameList.vue'

export default {
  name: 'Dashboard',

  components: { GameList },

  setup() {
    // store
    let $s = useStore()
    console.log("$S.getters: ", $s.getters)
    let params = $s.getters['tictactoe.game/getParams']()
    console.log("params: ", params)

    // computed
    let address = computed(() => $s.getters['common/wallet/address'])

    return {
      address
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  flex-grow: 1;
  padding: 20px;
}
</style>
