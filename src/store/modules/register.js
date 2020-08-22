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
            .then(response => {
                commit('setp', phone)
                return response
            })
        },
        createu: ({ state, commit }, password) => {
            return axios.post(`/user/signup`, {
                phone: state.phone,
                password: password
            }).then((response) => {
                commit('setpa', password)
                return response
            })
        },
        clear: ({ commit }) => {
            commit('clear')
        }
    }
}