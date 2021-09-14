import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '@/i18n'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        langObj : i18n.messages[i18n.locale],
        darkMode: localStorage.getItem('darkMode') || 'dark',
        authTopicListArray: [],
        topicDefaultObj: {},
        topicCustomizedArray: [],
        topicFixedArray: [],
        topiclContentObj: {},
        token: {
            access_token: localStorage.getItem('access_token') || '',
            refresh_token: localStorage.getItem('refresh_token') || '',
            token_type: localStorage.getItem('token_type') || '',
        },
        topicToggleDataset: [],
        globalLoading: false,
        userProfile: {},
        authGroupObj: {},
        authUserObj: {},
        authDeptArray: [],
        fixedTopicObj: {},
        componentsObj: {},
        historyLineData: [],
        historyFilter: {},
    },
    mutations: {
        changeDarkMode(state, string) {
            state.darkMode = string
            localStorage.setItem('darkMode', string)
        },
        updateAuthTopicData(state, topicData) {
            state.authTopicListArray = []
            state.topicDefaultObj = []
            state.topicCustomizedArray = []
            state.topicFixedArray = []

            if(topicData && topicData.length > 0 ){
                state.authTopicListArray = topicData
                topicData.map(item => {
                    if(item.type === 'customized'){
                        if(item.index === 'defaultFav'){
                            state.topicDefaultObj = item
                        }else{
                            state.topicCustomizedArray.push(item)
                        }
                    }else{
                        state.topicFixedArray.push(item)
                    }
                })
            }
        },
        updateTopicContent(state, payload) {
            state.topicToggleDataset = (payload && payload.length > 0)? payload: []
        },
        updateHistoryLineData(state, payload){
            state.historyLineData = []
            if(payload && payload.length > 0){
                state.historyLineData = payload
            }
        },
        updateHistoryFilter(state, payload){
            state.historyFilter = payload
        },
        setGlobalLoading(state, bool) {
            state.globalLoading = bool
        },
        setToken(state, obj) {
            if(obj){
                state.token = { ...obj }
                localStorage.setItem('access_token', obj.access_token)
                localStorage.setItem('refresh_token', obj.refresh_token)
                localStorage.setItem('token_type', obj.token_type)
            }else{
                state.token = {}
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('token_type')
            }
        },
        setUserProfile(state, obj) {
            if(obj){
                state.userProfile = { ...obj }
            }else{
                state.userProfile = {}
            }
        },
        setAuthGroup(state, obj) {
            if(obj){
                state.authGroupObj = { ...obj }
            }else{
                state.authGroupObj = {}
            }
        },
        setAuthUsers(state, obj) {
            if(obj){
                state.authUserObj = { ...obj }
            }else{
                state.authUserObj = {}
            }
        },
        setAuthDepts(state, array) {
            if(array){
                state.authDeptArray = array
            }else{
                state.authDeptArray = []
            }
        },
        setFixedTopic(state, obj) {
            if(obj){
                state.fixedTopicObj = { ...obj }
            }else{
                state.fixedTopicObj = {}
            }
        },
        setAllComponents(state, obj) {
            if(obj){
                state.componentsObj = { ...obj }
            }else{
                state.componentsObj = {}
            }
        },
    },
    actions: {
        getAuthuser ({ commit }) {
            return new Promise((resolve, reject) => {
                // axios.get(`/api_server/manager/authuser`).then(rs => {
                //     commit('setUserProfile', rs.data)
                //     resolve(rs)
                // }).catch(e => {
                //     commit('setUserProfile', null)
                //     reject(e)
                // }).finally(r => {
                //     commit('setGlobalLoading', false)
                // })
            })
        },
        getAuthGroup ({ commit }, param, API) {
            const params = (param)? param: {}
            return new Promise((resolve, reject) => {
                // axios.get(`/api_server/manager/authgroup`, {params: params}).then(rs => {
                //     if(!API){
                //         let groupObj = {}
                //         if(rs.data.data){
                //             rs.data.data.map(item => {
                //                 groupObj[item.id] = {
                //                     id: item.id,
                //                     status: item.status,
                //                     title: item.title,
                //                 }
                //             })
                //             commit('setAuthGroup', groupObj)
                //         }else{
                //             commit('setAuthGroup', null)
                //         }
                //     }
                //     if(rs.data){
                //         resolve(rs.data)
                //     }else{
                //         reject(rs)
                //     }
                // }).catch(e => {
                //     commit('setAuthGroup', null)
                //     reject(e)
                // })
            })
        },
        getAuthUsers ({ commit }) {
            return new Promise((resolve, reject) => {
                // const defauleParams = {
                //     page: 1,
                //     limit: 100
                // }
                // axios.get(`/api_server/manager/authusers`,{ defauleParams }).then(rs => {
                //     if(rs && rs.data && rs.data.data.length > 0){
                //         let userObj = {}
                //         rs.data.data.map(item => {
                //             userObj[item.id] = {
                //                 id: item.id,
                //                 active: (item.status === 1)? '啟用': '停用',
                //                 title: item.title,
                //             }
                //         })
                //         commit('setAuthUsers', userObj)
                //         resolve(rs.data.data)
                //     }else{
                //         commit('setAuthUsers', null)
                //         reject(rs)
                //     }
                // }).catch(e => {
                //     commit('setAuthUsers', null)
                //     reject(e)
                // })
            })
        },
        getTaipeiDepts ({ commit }) {
            return new Promise((resolve, reject) => {
                // axios.get(`/api_server/manager/authtpuser/depts`,).then(rs => {
                //     if(rs && rs.data){
                //         commit('setAuthDepts', rs.data)
                //         resolve(rs.data)
                //     }else{
                //         commit('setAuthDepts', null)
                //         reject(rs)
                //     }
                // }).catch(e => {
                //     commit('setAuthDepts', null)
                //     reject(e)
                // })
            })
        },
        getAllComponents ({ commit }, param ) {
            return new Promise((resolve, reject) => {
                // commit('setGlobalLoading', true)
                // axios.get(`/api_server/manager/component`).then(rs => {
                //     if(rs.data && rs.data.data.length > 0){
                //         let componentObj = {}
                //         rs.data.data.map(item => {
                //             componentObj[item.id] = {
                //                 id: item.id,
                //                 name: item.name
                //             }
                //         })
                //         commit('setAllComponents', componentObj)
                //         resolve(rs.data)
                //     }else{
                //         commit('setAllComponents', null)
                //         reject(rs)
                //     }
                // }).catch(e => {
                //     commit('setAllComponents', null)
                //     reject(e)
                // }).finally(r => {
                //     commit('setGlobalLoading', false)
                // })
            })
        },
        fetchTopicData({ dispatch, commit }) {
            return new Promise((resolve, reject) => {
                // commit('setGlobalLoading', true)
                // axios.get(`/api_server/manager/topic/all`).then(rs => {
                //     commit('updateAuthTopicData', (rs && rs.data)? rs.data.data: null)
                //     resolve(rs.data)
                // }).catch(error => {
                //     if(error && error.response.status === 401){
                //             dispatch('fetchTopicData', { dispatch, commit })
                //     }else{
                //         commit('updateAuthTopicData', null)
                //         reject(error)
                //     }
                // }).finally(r => {
                //     commit('setGlobalLoading', false)
                // })
            })
        },
        fetchFixedTopicData({ commit }) {
            return new Promise((resolve, reject) => {
                // axios.get(`/api_server/manager/topic/fixed`).then(rs => {
                //     commit('setFixedTopic', rs.data)
                //     resolve(rs)
                // }).catch(e => {
                //     commit('setFixedTopic', null)
                //     reject(e)
                // }).finally(r => {
                //     commit('setGlobalLoading', false)
                // })
            })
        }
    }
})
