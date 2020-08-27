import axios from "axios"

export default {
    namespaced: true,


    state: {
        affair: {},
        product: {},
        contract: {},
        chats: [],
    },


    getters: {
        affair: state => state.affair,
        product: state => state.product,
        contract: state => state.contract,
        chats: state => state.chats
    },


    mutations: {
        // populate
        geta: (state, affair) => {
            state.affair = affair
        },
        getp: (state, product) => {
            state.product = product
        },
        getc: (state, contract) => {
            state.contract = contract
        },
        getcs: (state, chats) => {
            state.chats = chats
        },
        // edit contract
        editc: (state, contract) => {
            state.contract = contract
        }
    },


    actions: {
        // populate content
        populate: async ({ commit }, id) => {
            axios.get(`/affair/id/${id}`)
                .then(({ data }) => {
                    console.log(data)
                    let affair = data

                    commit('geta', affair)
                    commit('getp', affair.Product)
                    commit('getcs', affair.AffairChats !== undefined ? affair.AffairChats : [])
                })
        },
        // get affair
        geta: async ({ commit }, id) => {
            return axios.get(`/affair/id/${id}`)
                .then(({ data }) => {
                    commit('geta', data)
                })
        },
        getc: async ({ commit }, id) => {
            return axios.get(`/affair/contract/id/${id}`)
                .then(({ data }) => {
                    commit('getc', data)
                })
        },
        // edit contract
        editc: async ({ commit }, contract) => {
            return axios.put(`/affair/contract/${contract.id}`, contract)
            .then(() => {
                commit('editc', contract)
            })  
        },
    }
}