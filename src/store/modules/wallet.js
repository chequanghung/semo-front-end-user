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
        deleted: (state, deposit) => {
            state.deposit = state.deposit.map(item => item.id === deposit.id ? {...item, user_status: 1} : item)
        },
        subm: (state, amount) => {
            state.wallet.amount -= amount
        }
    },


    actions: {
        // get wallet
        getw: async ({ commit }, id) => {
            return axios.get(`/wallet/user/${id}`)
                .then(({ data }) => {
                    commit('getw', data)
                })
        },
        // get deposits
        getd: async ({ state, commit }) => {
            return axios.get(`/wallet/deposit/wallet/id/${state.wallet.id}`)
                .then(({ data }) => {
                    commit('getd', data)
                })
        },
        // transaction
        gett: async ({ state, commit }) => {
            return axios.get(`/wallet/transaction/wallet/id/${state.wallet.id}`)
                .then(({ data }) => {
                    commit('gett', data)
                })
        },
        // add money
        addm: async ({ state }, request) => {
            return axios.post(`/wallet/topUp`, {
                id: request.id,
                src_wallet_id: state.wallet.id,
                amount: request.amount,
            })
        },
        // pay for deposit
        payd: async ({ state, commit }, deposit) => {
            return axios.put(`/wallet/deposit/pay`, {
                id: deposit.id,
                src_wallet_id: state.wallet.id,
                amount: deposit.amount,
            })
                .then((response) => {
                    commit('subm', deposit.amount)
                    commit('deleted', deposit)
                    return response
                })
        },
    }
}