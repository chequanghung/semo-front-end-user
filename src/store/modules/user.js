import axios from 'axios'

export default {
    namespaced: true,


    state: {
        // user info after logging in
        token: null,
        user: {},
        // addresses
        address: [],
        // identity
        identity: {},
        // wallet
        wallet: {},
    },


    getters: {
        token: state => state.token,
        user: state => state.user,
        address: state => state.address,
        identity: state => state.identity,
        wallet: state => state.wallet
    },


    mutations: {
        // get information after login
        gett: (state, token) => {
            state.token = token
        },
        getu: (state, user) => {
            state.user = user
        },
        editua: (state, image) => {
            state.user.img_url = image
        },
        editui: (state, user) => {
            state.user.name = user.name
            state.user.dob = user.dob
            state.user.gender = user.gender
        },
        // address
        geta: (state, address) => {
            state.address = address
        },
        adda: (state, address) => {
            state.address = [...state.address, address]
        },
        geti: (state, identity) => {
            state.identity = identity
        },
        // edit information
        editu: (state, user) => {
            state.user = user
        },
        edita: (state, address) => {
            state.address = state.address.map(item => item.id === address.id ? address : item)
        },
        // delete information
        deletea: (state, address) => {
            state.address = state.address.filter(item => item.id !== address.id)
        },
        // get wallet
        getw: (state, wallet) => {
            state.wallet = wallet
        },
        // logout
        logout: (state) => {
            state.token = null
            state.user = {}
            state.address = []
            state.identity = {}
        }
    },


    actions: {
        // login
        login: async ({ commit }, account) => {
            return axios.post(`/user/login`, {
                phone: account.phone,
                password: account.password
            })
                .then(response => {
                    commit('gett', response.data.token)
                    commit('getu', response.data.user)
                    commit('geta', response.data.user.Addresses)
                })
        },
        // update avatar
        editua: async ({ state, commit }, image) => {
            return axios.put(`/user/avatar`, {
                id: state.user.id,
                img_url: image
            }).then(() => {
                commit('editua', image)
            })
        },
        // update profile
        editui: async ({ state, commit }, user) => {
            return axios.put(`/user/info`, {
                id: state.user.id,
                name: user.name,
                gender: user.gender,
                dob: user.dob
            }).then(() => {
                commit('editui', user)
            })
        },
        // edit address
        adda: async ({ state, commit }, address) => {
            return axios.post('/address/', {
                user_id: state.user.id,
                province: address.province,
                district: address.district,
                ward: address.ward,
                address: address.address
            })
                .then(() => {
                    commit('adda', address)
                })
        },
        editad: async ({ commit }, address) => {
            return axios.put(`/address/id/${address.id}`, {
                province: address.province,
                district: address.district,
                ward: address.ward,
                address: address.address
            })
                .then(() => {
                    commit('edita', address)
                })
        },
        deletea: async ({ commit }, address) => {
            return axios.delete(`/address/${address.id}`)
                .then(() => {
                    commit('deletea', address)
                })
        },
        geta: async ({ state, commit }) => {
            return axios.get(`/address/id/${state.user.id}`)
                .then(({ data }) => {
                    commit('geta', data)
                })
        },
        geti: async ({ state, commit }) => {
            return axios.get(`/identity/user/id/${state.user.id}`)
                .then(({ data }) => {
                    commit('geti', data)
                })
        },
        // add identity
        addi: async ({ commit }, identity) => {
            return axios.post(`/identity/`, identity)
                .then(() => {
                    commit('geti', identity)
                })
        },
        updatepwd: async ({ state }, passwords) => {
            return axios.put(`/user/password/${state.user.id}`, {
                password: passwords.password,
                new_password: passwords.new_password
            })
        }
    }
}