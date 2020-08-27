/* eslint-disable */

import axios from 'axios'
import moment from 'moment'

export default {
    namespaced: true,


    state: {
        // get all products
        products: [],
        // get a product
        product: {},
        // media
        media: [],
        // update request
        request: {}
    },


    getters: {
        // all products
        products: state => state.products,
        // product view
        product: state => state.product,
        media: state => state.media,
        request: state => state.request
    },


    mutations: {
        gets: (state, products) => {
            let formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            })

            state.products = products.map(item => {
                return { ...item, date_created: moment(item.date_created).format('hh:mm DD/MM/YYYY'), price_cur: formatter.format(item.price_cur), price_step: formatter.format(item.price_step), price_init: formatter.format(item.price_init) }
            })
        },
        getp: (state, product) => {
            state.product = product
        },
        getm: (state, media) => {
            state.media = media
        },
        getr: (state, request) => {
            state.request = request
        },
        deletep: (state, product) => {
            state.products = state.products.filter(item => item.id != product.id)
        },
    },


    actions: {
        gets: async ({ commit, rootState }, status) => {
            return axios.get(`/product/user/${rootState.user.user.id}/${status}`)
                .then(({ data }) => {
                    commit('gets', data)
                })
        },
        deletep: async ({ commit }, product) => {
            return axios.put(`/product/changeStatus`, {
                id: product.id,
                product_status: 9
            })
                .then(() => {
                    commit('deletep', product)
                })
        },
        restorep: async ({ commit }, product) => {
            return axios.put(`/product/changeStatus`, {
                id: product.id,
                product_status: 1
            })
                .then(() => {
                    commit('deletep', product)
                })
        },
        createa: async ({ commit }, item) => {
            return axios.put(`/product/changeStatus`, {
                id: item.product.id,
                product_status: 3
            })
        },
        createaclosure: async ({ commit }, product) => {
            return axios.put(`/auction/create`, {
                id: product.product.id,
                date_closure: product.date
            })
                .then((response) => {
                    commit('deletep', product.product)
                    return response
                })
                .catch((error) => {
                    return error
                })
        }
    }
}