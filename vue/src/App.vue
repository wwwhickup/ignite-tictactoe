<template>
  <div>
    <SpTheme>
      <div class="nav-bar">
        <div class="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/57/57180.png" />
          <p>Tictactoe</p>
        </div>
        <SpAcc />
      </div>
      <div class="container">
        <GameCreate />
        <GameList />
      </div>
    </SpTheme>
  </div>
</template>

<script lang="ts">
import { SpNavbar, SpTheme } from '@starport/vue'
import SpAcc from '@starport/vue/src/components/SpAcc'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import GameList from './views/components/GameList.vue'
import GameCreate from './views/components/GameCreate.vue'

export default {
  components: { SpTheme, SpNavbar, GameList, GameCreate, SpAcc },

  setup() {
    // store
    let $s = useStore()
    let router = useRouter()
    let navbarLinks = [
      { name: 'Tictactoe', url: '/' },
    ]
    onBeforeMount(async () => {
      await $s.dispatch('common/env/init')
      await $s.dispatch('cosmos.staking.v1beta1/QueryParams')
      await $s.dispatch('cosmos.bank.v1beta1/QueryTotalSupply')
    })

    return {
      navbarLinks,
      router,
    }
  }
}
</script>

<style scoped lang="scss">
body {
  margin: 0;
}
.nav-bar {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    display: flex;
    align-items: center;
    img {
      height: 50px;
      cursor: pointer;
    }
    p {
      font-size: 20px;
      font-weight: 700;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>
