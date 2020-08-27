import axios from "axios"

export default {
    namespaced: true,


    state: {
        auctions: [],
        collections: []
    },


    getters: {
        auctions: state => state.auctions,
        collections: state => state.collections
    },


    mutations: {
        geta: (state, auctions) => {
            state.auctions = auctions
        },
        getc: (state, collections) => {
            state.collections = collections
        }
    },


    actions: {
        geta: async ({ commit }, title) => {
            return axios.get(`/auction/search/${title}`)
                .then(({ data }) => {
                    commit('geta', data)
                })
        }
    }
}