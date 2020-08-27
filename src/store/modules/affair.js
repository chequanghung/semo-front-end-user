import axios from "axios"

export default {
    namespaced: true,


    state: {
        affair: {},
        product: {},
        contract: {},
        chats: [],
        update: {}
    },


    getters: {
        affair: state => state.affair,
        product: state => state.product,
        contract: state => state.contract,
        chats: state => state.chats,
        update: state => state.update
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
        getu: (state, update) => {
            state.update = update
        },
        // edit contract
        editc: (state, contract) => {
            state.contract = contract
        },
        clear: (state) => {
            state.contract = {},
            state.update = {}
        }
    },


    actions: {
        // populate content
        populate: async ({ commit }, id) => {
            axios.get(`/affair/id/${id}`)
                .then(({ data }) => {
                    // console.log(data)
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
                    console.info(data)
                    commit('getc', data)
                    commit('getu', data.AffairContractUpdates.length > 0 ? data.AffairContractUpdates[0] : {})
                })
        },
        // edit contract
        editc: async ({ commit }, contract) => {
            return axios.put(`/affair/contract/${contract.id}`, contract)
            .then(() => {
                commit('editc', contract)
            })  
        },
        clear: ({ commit }) => {
            commit('clear')
        }
    }
}