import axios from 'axios'

export default {
    namespaced: true,


    state: {
        // 
        phone: '',
        password: '',

    },


    getters: {
        phone: state => state.phone
    },


    mutations: {
        setp: (state, phone) => {
            state.phone = phone
        },
        setpa: (state, password) => {
            state.password = password
        },
        clear: (state) => {
            state.phone = ''
            state.password = ''
        }
    },


    actions: {
        setp: ({ commit }, phone) => {
            return axios.get(`/user/existed/${phone}`)
            .then(() => {
                commit('setp', phone)
            })
        },
        createu: async ({ state, commit }, password) => {
            return axios.post(`/user/signup`, {
                phone: state.phone,
                password: password
            }).then(() => {
                commit('setpa', password)
            })
        },
        clear: ({ commit }) => {
            commit('clear')
        }
    }
}