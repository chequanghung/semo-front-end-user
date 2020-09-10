import axios from "axios"

export default {
    namespaced: true,


    state: {
        auctions: [],
        users: []
    },


    getters: {
        auctions: state => state.auctions,
        users: state => state.users
    },


    mutations: {
        geta: (state, auctions) => {
            state.auctions = auctions
        },
        getu: (state, users) => {
            state.users = users
        }
    },


    actions: {
        geta: async ({ commit }, title) => {
            return axios.get(`/auction/search/${title}`)
                .then(({ data }) => {
                    commit('geta', data)
                })
        },
        getu: async ({ commit }, title) => {
            return axios.get(`/user/search/${title}`)
                .then(({ data }) => {
                    commit('getu', data)
                })
        }
    }
}