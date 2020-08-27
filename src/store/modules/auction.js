/* eslint-disable */
import axios from 'axios'
import moment from 'moment'

// buefy
import { NotificationProgrammatic as Notification } from 'buefy'
// import router from '../../router'

export default {
    namespaced: true,

    state: {
        // dashboard
        auctions: [],
        // auction view
        product: {},
        bids: [],
        similar: [],
    },

    getters: {
        auctions: state => state.auctions,
        product: state => state.product,
        bids: state => state.bids,
        similar: state => state.similar,
    },

    mutations: {
        // get all auction
        gets(state, auctions) {
            state.auctions = auctions
                .map(auction => auction.id
                    ? { ...auction, date_closure: moment(auction.date_closure).format('hh:mm DD/MM/YYYY') }
                    : auction)
                .map(auction => {
                    switch (auction.auction_status) {
                        case 0:
                            return { ...auction, auction_status: '🔒 ĐÃ ĐÓNG' }

                        case 1:
                            return { ...auction, auction_status: '💸 ĐANG MỞ' }

                        case 9:
                            return { ...auction, auction_status: '🗑️ ĐÃ XÓA' }
                    }
                })
                .map(auction => { return { ...auction, price_cur: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(auction.price_cur) } })
        },
        // get auction
        getp(state, product) {
            state.product = product
        },
        // edit auction status
        edita(state, ids) {
            state.auctions = state.auctions.map(item => ids.indexOf(item.id) >= 0 ? { ...item, auction_status: '🗑️ ĐÃ XÓA' } : item)
        },
        // get bids by auction
        getb(state, bids) {
            state.bids = bids.map(bid => bid = { ...bid, amount: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bid.amount), date_created: moment(bid.date_created).format('hh:mm DD/MM/YYYY') })
        },
        // get similar
        getsi(state, similar) {
            state.similar = similar.map(item => {
                return {
                    ...item, price_cur: new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(item.price_cur)
                }
            })
        },
        // delete bid(s) from bids
        deleteb(state, bids) {
            console.log(bids)
            state.bids = state.bids.filter(item => bids.indexOf(item) < 0)
        },
        // close an auction view
        closea(state) {
            state.product = {}
            state.bids = []
        }
    },

    actions: {
        // populate data
        populate: ({ commit }) => {
            axios.get('/admin/auction')
                .then(response => {
                    commit('gets', response.data)
                })
                .catch(() => {
                    // open an error notification
                    Notification.open({
                        message: 'Vui lòng kiểm tra lại đường truyền',
                        type: 'is-danger'
                    })
                })
        },
        // delete auction
        deletea: ({ commit }, auctions) => {
            let toBeDeleted = auctions.filter(item => item.auction_status !== '🗑️ ĐÃ XÓA')

            if (toBeDeleted.length > 0) {
                Promise.all(toBeDeleted.map(item => {
                    return axios.put(`/admin/auction/${item.id}`, {
                        auction_status: 9
                    })
                        .then(() => {
                            // delete auction
                            return item.id
                        })
                })).then(result => {
                    commit('edita', result)
                    // open notification
                    Notification.open({
                        message: `Đã xóa ${result.length} buổi đấu giá`,
                        type: 'is-success'
                    })
                })
                    .catch(error => {
                        // open notification
                        Notification.open({
                            message: `${error.data.message}`,
                            type: 'is-danger'
                        })
                    })
            }

            // error message
            auctions.filter(item => item.auction_status === '🗑️ ĐÃ XÓA').map(item => {
                // open notification
                console.log(item)
                Notification.open({
                    message: `Buổi đấu giá ${item.product_title} đã bị xóa`,
                    type: 'is-danger'
                })
            })
        },
        // get auction and bids
        populatea: async ({ commit, dispatch }, id) => {
            // get auction
            return axios.get(`/auction/id/${id}`)
                .then(response => {
                    // get auction info
                    commit('getp', response.data)
                    // get bids
                    dispatch('populateb', response.data.Auctions[0].id)
                    return response
                }).catch(() => {
                    // open an error notification
                    Notification.open({
                        message: 'Vui lòng kiểm tra lại đường truyền',
                        type: 'is-danger'
                    })
                })
        },
        // get auction bids
        populateb: async ({ commit }, id) => {
            return axios.get(`/auction_bid/auction/${id}`)
                .then(response => {
                    commit('getb', response.data)
                    return response
                })
                .catch(() => {
                    // open an error notification
                    Notification.open({
                        message: 'Vui lòng kiểm tra lại đường truyền',
                        type: 'is-danger'
                    })
                    // clear auction
                    commit('closea')
                })
        },
        // get similar products
        populatesi: async ({ commit }, id) => {
            return axios.get(`/auction/similar/${id}`)
            .then(response => {
                commit('getsi', response)
                return response
            })
        },
        // delete bid(s)
        deletebs: async ({ commit, dispatch }, bids) => {
            Promise.all(bids.map(item => {
                return axios.delete(`/auction_bid/delete/${item.id}`)
                    .then(() => {
                        return item
                    })
            }))
                .then(result => {
                    console.log(result)
                    commit('deleteb', result)
                    // succeed
                    Notification.open({
                        message: `Đã xóa thành công ${result.length} lượt đấu giá.`,
                        type: 'is-success'
                    })
                })
                .catch(error => {
                    // open error notification
                    Notification.open({
                        message: error.response.data.message,
                        type: 'is-danger'
                    })
                })
        },
        closea: ({ commit }) => {
            commit('closea')
        }
    }
}