<template>
  <h1>Create Game </h1>
  <div class="card-container">
    <form @submit="createGame" class="form-create">
      <input type="text" v-model="inviter" required placeholder="Input Inviter address cosmos1jk...."/>
      <button>Create Game</button>
    </form>
    
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Client } from 'tictactoe-client-ts'

const client = new Client({ 
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos"
  },
);
export default {
  name: 'GameList',
  setup() {
    // store
    let inviter = ref()

    const createGame = async (e) => {
      e.preventDefault()
      await client.useKeplr()
      const signer = await client.signer.getAccounts()
      const tx = client.TictactoeGame.tx.msgCreateGame({
        value: {
          creator: signer[0].address,
          inviter: inviter.value
        }
      })
      const transaction = await client.TictactoeGame.tx.sendMsgCreateGame(tx)
      console.log('transactions: ', transaction)
    }

    return {
      inviter,
      createGame
    }
  }
}
</script>
<style scoped lang="scss">
  .form-create {
    display: flex;
    justify-content: flex-start;
    padding: 20px;
    margin-bottom: 50px;
    input {
      font-family: 'Roboto', sans-serif;
      color: #333;
      font-size: 1.2rem;
      padding: 10px 20px;
      background-color: rgb(210, 214, 227);
      border: none;
      border-radius: 10px;
      display: block;
      transition: all 0.3s;
      width: 500px;
      margin-right: 20px;
    }
    button {
      cursor: pointer;
      display: inline-flex;
      height: 48px;
      padding: 0rem 2rem;
      background: #111111;
      border: 0.2rem solid #111111;
      color: white;
      font-size: 16px;
      font-weight: 500;
      border-radius: -35.2rem;
      outline: none;
      white-space: nowrap;
      transition: 180ms ease;
      transform: translateZ(0);
      position: relative;
      text-decoration: none;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }
  }
</style>