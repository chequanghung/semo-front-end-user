import axios from 'axios'

export default {
    namespaced: true,


    state: {
        fruit: {},
        auctions: [],
    },


    getters: {
        fruit: state => state.fruit,
        auctions: state => state.auctions
    },


    mutations: {
        getf: (state, fruit) => {
            state.fruit = fruit
        },
        geta: (state, auctions) => {
            state.auctions = auctions
        }
    },


    actions: {
        getf: async ({ commit }, id) => {
            return axios.get(`/fruit/id/${id}`)
            .then(({ data }) => {
                commit('getf', data)
            })
        },
        geta: async ({ commit }, id) => {
            return axios.get(`/fruit/auctions/${id}`)
            .then(({ data }) => {
                commit('geta', data)
            })
        }
    }
}