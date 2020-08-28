import axios from 'axios'

export default {
    namespaced: true,


    state: {
        wallet: {},
        // deposits
        deposit: [],
        // transactions
        transaction: []
    },


    getters: {
        wallet: state => state.wallet,
        deposit: state => state.deposit,
        transaction: state => state.transaction
    },


    mutations: {
        getw: (state, wallet) => {
            state.wallet = wallet
        },
        getd: (state, deposit) => {
            state.deposit = deposit
        },
        gett: (state, transaction) => {
            state.transaction = transaction
        },

    },


    actions: {
        // get wallet
        getw: async ({ commit }, id) => {
            return axios.get(`/wallet/user/${id}`)
            .then (({ data }) => {
                commit('getw', data)
            })
        },
        // get deposits
        getd: async ({ commit }) => {
            return axios.get(`/wallet/deposit/wallet/id/${state.wallet.id}`)
            .then (({ data }) => {
                commit('getd', data)
            })
        },
        // transaction
        gett: async ({ commit }) => {
            return axios.get(`/wallet/transaction/wallet/id/${state.wallet.id}`)
            .then (({ data }) => {
                commit('gett', data)
            })
        }
    }
}