import { SnackbarProgrammatic as Snackbar } from 'buefy'
import router from '../../router'
import axios from 'axios'

export default {
    namespaced: true,


    state: {
        // collections for homepage
        collections: [],
        // most viewed
        mostviewed: [],
        // newest
        newest: [],
        // ending
        ending: [],
        // fruits
        fruits: [],
    },


    mutations: {
        // get data for homepage
        // also for collections
        getc: (state, collections) => {
            state.collections = collections
        },
        getm: (state, mostviewed) => {
            state.mostviewed = mostviewed
        },
        getn: (state, newest) => {
            state.newest = newest
        },
        gete: (state, ending) => {
            state.ending = ending
        },
        // also for fruits
        getf: (state, fruits) => {
            state.fruits = fruits
        }
    },


    actions: {
        // populate data for homepage
        populateh: async ({ dispatch }) => {
            let populates = ['populatehc', 'populatehn', 'populatehm', 'populatehe', 'populatehf']

            Promise.all(populates.map(item => {
                dispatch(item)
            })).catch(() => {
                Snackbar.open({
                    message: 'Chết rồi, kết nối có chút vấn đề. 😥',
                    type: 'is-warning',
                    position: 'is-top-right',
                    actionText: 'TẢI LẠI',
                    onAction: () => {
                        router.go()
                    }
                })
            })
        },
        // child functions for homepage
        // get collections for banners
        populatehc: async ({ commit }) => {
            return axios.get('/collection/home').then(response => {
                commit('getc', response.data)
            })
        },
        // get auctions for newest
        populatehn: async ({ commit }) => {
            return axios.get('/auction/latest').then(response => {
                commit('getn', response.data)
            })
        },
        // get auctions for most viewed
        populatehm: async ({ commit }) => {
            return axios.get('/auction/hottest').then(response => {
                commit('getm', response.data)
            })
        },
        // get auctions for ending soon
        populatehe: async ({ commit }) => {
            return axios.get('/auction/closing').then(response => {
                commit('gete', response.data)
            })
        },
        // get top fruits
        populatehf: async ({ commit }) => {
            return axios.get('/fruit/top').then(response => {
                commit('getf', response.data)
            })
        }
        // populate data for newest
        // populate data for fruits
        // populate data for collections
    }
}