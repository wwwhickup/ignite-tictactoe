import { createStore } from 'vuex'
import init from './config'
import { Client, registry, } from 'tictactoe-client-ts'

const chainId = 'tictactoe'
const client = new Client({ 
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos"
  },
);

const store = createStore({
  state() {
    return {
      staking: {
        params: {},
        supply: {}
      }
    }
  },
  mutations: {
    'cosmos.staking.v1beta1/setParams': (state, params) => {
      state.staking = {...state.staking, params: params}
    },
    'cosmos.staking.v1beta1/setSupply': (state, supply) => {
      state.staking = {...state.staking, supply: supply}
    }
  },
  actions: {
    'cosmos.staking.v1beta1/QueryParams': async ({ commit, state }) => {
      const params = await client.CosmosStakingV1Beta1.query.queryParams()
      commit('cosmos.staking.v1beta1/setParams', params.data.params)
    },
    'cosmos.bank.v1beta1/QueryTotalSupply': async ({ commit, state }) => {
      const totalSupply = await client.CosmosBankV1Beta1.query.queryTotalSupply()
      commit('cosmos.staking.v1beta1/setSupply', totalSupply.data.supply)
    },
  },
  getters: {
    'cosmos.staking.v1beta1/getParams': (state) => () => {
      return {params: state.staking.params}
    },
    'cosmos.bank.v1beta1/getTotalSupply': (state) => () => {
      return {supply: state.staking.supply}
    },
  },
})
init(store)
export default store
