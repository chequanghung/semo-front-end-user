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
        // add chat
        addcs: (state, chats) => {
            chats.forEach(item => {
                state.chats = [item, ...state.chats]
            });
        },
        // get contract update
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
        },
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
                })
        },
        // get contract
        getc: async ({ commit }, id) => {
            return axios.get(`/affair/contract/id/${id}`)
                .then(({ data }) => {
                    console.info(data)
                    commit('getc', data)
                    commit('getu', data.AffairContractUpdates.length > 0 ? data.AffairContractUpdates[0] : {})
                })
        },
        // get chats
        getcs: async ({ state, commit }, offset) => {
            return axios.get(`/affair/chat/${state.affair.id}?offset='${offset}'`)
                .then(({ data }) => {
                    commit('addcs', data)
                })
        },
        // add chat
        addcs: async ({ state, commit }, chat) => {
            axios.post(`/affair/addChat`, {
                affair_id: state.affair.id,
                sender_user_id: chat.sender_user_id,
                content: chat.content
            }).then(() => {
                commit('addcs', [chat])
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