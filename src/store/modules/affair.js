import axios from "axios"

export default {
    namespaced: true,


    state: {
        affair: {},
        product: {},
        contract: {},
        // chats: new Set(),
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
        // add chat
        addcs: (state, dialogues) => {
            let ids = state.chats.map(item => item.id)

            dialogues.forEach(item => {
                if(ids.indexOf(item.id) === -1) {
                    state.chats.push(item)
                }
            })

            state.chats.sort(function (a, b) {
                let x = a.date_created
                let y = b.date_created

                return x < y ? -1 : (x === y ? 0 : 1)
            })
        },
        // get contract update
        getu: (state, update) => {
            state.update = update
        },
        // edit contract
        editc: (state, contract) => {
            state.contract = contract
        },
        // clear update
        clearu: (state) => {
            state.update = {}
        },
        clear: (state) => {
            state.contract = {}
            state.update = {}
        },
        close: (state) => {
            state.affair = {}
            state.product = {}
            state.chats = []
        }
    },


    actions: {
        // populate content
        populate: async ({ commit }, id) => {
            return axios.get(`/affair/id/${id}`)
                .then(({ data }) => {
                    let affair = data

                    commit('geta', affair)
                    commit('getp', affair.Product)
                })
        },
        // get contract
        getc: async ({ commit }, id) => {
            return axios.get(`/affair/contract/id/${id}`)
                .then(({ data }) => {
                    commit('getc', data)
                    commit('getu', data.AffairContractUpdates.length > 0 ? data.AffairContractUpdates[0] : {})
                })
        },
        // get chats
        getcs: async ({ state, commit }) => {
            return axios.get(`/affair/chat/${state.affair.id}`)
                .then(({ data }) => {
                    commit('addcs', data)
                })
        },
        // add chat
        addcs: async ({ state, dispatch }, chat) => {
            axios.post(`/affair/addChat`, {
                affair_id: state.affair.id,
                sender_user_id: chat.sender_user_id,
                content: chat.content
            }).then((result) => {
                dispatch('getcs')
                return result
            })
        },
        // edit contract
        editc: async ({ commit }, contract) => {
            return axios.post(`/affair/contract/update`, contract)
                .then(() => {
                    commit('getu', contract)
                })
        },
        // merge update request with contract
        mergec: async ({ commit, dispatch }, contract) => {
            return axios.put(`/affair/contract`, contract)
            .then(() => {
                dispatch('getc', contract.id)
                commit('clearu')
            })
        },
        clear: ({ commit }) => {
            commit('clear')
        },
        close: ({ commit }) => {
            commit('close')
        }
    }
}