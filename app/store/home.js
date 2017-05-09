/**
 * Created by lichun on 2017/5/4.
 */
import axios from '~plugins/axios'
export const state = {
    filter: {
        begin: false,
        show: false,
        matches: null,
        init: null,
        onOk: () => {},
        onCancel: () => {}
    },
    zq: {
        bjdc: {
            expectList: null,
            cExpect: null,
            curExpect: null,
            allMatches: {}
        },
        jczq: {
            expectList: null,
            cExpect: null,
            curExpect: null,
            allMatches: {}
        },
        all: {
            expectList: null,
            cExpect: null,
            curExpect: null,
            allMatches: {}
        },
        sfc: {
            expectList: null,
            cExpect: null,
            curExpect: null,
            allMatches: {}
        },
        hot: {
            expectList: null,
            cExpect: null,
            curExpect: null,
            allMatches: {}
        },
        mymatch: null,
        state: {
            bjdc: null,
            jczq: null
        }
    },
    lq: {
        jclq: {
            expectList: null,
            cExpect: null,
            curExpect: null,
            allMatches: {}
        }
    }
}

export const actions = {
    fetchBjdcMatches ({commit}, expect) {
        return axios.get(`/score/zq/info?vtype=bjdc&expect=${expect === 'cur' ? '' : expect}`).then((resp) => {
            if (resp.status === 200) {
                if (resp.data.status === '100') {
                    return resp.data.data
                } else {
                    throw new Error(resp.data.message)
                }
            } else { // http 请求错误
                throw new Error(resp.message)
            }
        }).then((data) => {
            data.matches.some(match => {
                if (match.status !== '4') {
                    match._flag = true
                    return true
                }
            })
            data._expect = expect
            commit('BJDC', data)
            return data
        })
    },
    fetchZqAllMatches ({commit}, expect) {
        return axios.get(`/score/zq/info?vtype=all&expect=${expect === 'cur' ? '' : expect}`).then((resp) => {
            if (resp.status === 200) {
                if (resp.data.status === '100') {
                    return resp.data.data
                } else {
                    throw new Error(resp.data.message)
                }
            } else { // http 请求错误
                throw new Error(resp.message)
            }
        }).then((data) => {
            data.matches.some(match => {
                if (match.status !== '4') {
                    match._flag = true
                    return true
                }
            })
            data._expect = expect
            commit('ZQALL', data)
            return data
        })
    },
    fetchJclqMatches ({commit}, expect) {
        return axios.get(`/score/lq/info?vtype=jclq&expect=${expect === 'cur' ? '' : expect}`).then((resp) => {
            if (resp.status === 200) {
                if (resp.data.status === '100') {
                    return resp.data.data
                } else {
                    throw new Error(resp.data.message)
                }
            } else { // http 请求错误
                throw new Error(resp.message)
            }
        }).then((data) => {
            data.matches.some(match => {
                if (match.status !== '4') {
                    match._flag = true
                    return true
                }
            })
            data._expect = expect
            commit('JCLQ', data)
            return data
        })
    },
    fetchJczqMatches ({commit}, expect) {
        return axios.get(`/score/zq/info?vtype=jczq&expect=${expect === 'cur' ? '' : expect}`).then((resp) => {
            if (resp.status === 200) {
                if (resp.data.status === '100') {
                    return resp.data.data
                } else {
                    throw new Error(resp.data.message)
                }
            } else { // http 请求错误
                throw new Error(resp.message)
            }
        }).then((data) => {
            data.matches.some(match => {
                if (match.status !== '4') {
                    match._flag = true
                    return true
                }
            })
            data._expect = expect
            commit('JCZQ', data)
            return data
        })
    },
    fetchSfcMatches ({commit}, expect) {
        return axios.get(`/score/zq/info?vtype=sfc&expect=${expect === 'cur' ? '' : expect}`).then((resp) => {
            if (resp.status === 200) {
                if (resp.data.status === '100') {
                    return resp.data.data
                } else {
                    throw new Error(resp.data.message)
                }
            } else { // http 请求错误
                throw new Error(resp.message)
            }
        }).then((data) => {
            data.matches.some(match => {
                if (match.status !== '4') {
                    match._flag = true
                    return true
                }
            })
            data._expect = expect
            commit('SFC', data)
            return data
        })
    },
    fetchHotMatches ({commit}, expect) {
        return axios.get(`/score/zq/hot?expect=${expect === 'cur' ? '' : expect}`).then((resp) => {
            if (resp.status === 200) {
                if (resp.data.status === '100') {
                    return resp.data.data
                } else {
                    throw new Error(resp.data.message)
                }
            } else { // http 请求错误
                throw new Error(resp.message)
            }
        }).then((data) => {
            data.matches.some(match => {
                if (match.status !== '4') {
                    match._flag = true
                    return true
                }
            })
            data._expect = expect
            commit('HOT', data)
            return data
        })
    },
    triggerFilter ({commit}) {
        commit('BEGIN_FILTER')
    },
    startFilter ({commit}, {matches, inited, onOk, onCancel}) {
        commit('INIT_FILTER', {matches, inited, onOk, onCancel})
    },
    finishFilter ({commit}) {
        commit('END_FILTER')
    }
}

export const mutations = {
    BEGIN_FILTER (state) {
        state.filter.begin = !state.filter.begin
    },
    INIT_FILTER (state, {matches, inited, onOk, onCancel}) {
        state.filter.matches = matches
        state.filter.show = true
        state.filter.inited = inited
        state.filter.onOk = onOk || (() => {})
        state.filter.onCancel = onCancel || (() => {})
    },
    END_FILTER (state) {
        state.filter.matches = null
        state.filter.show = false
        state.filter.begin = false
        state.filter.inited = null
        state.filter.onOk = () => {}
        state.filter.onCancel = () => {}
    },
    BJDC (state, data) {
        let {curr_expect, expect_list, matches, _expect} = data
        // eslint-disable-next-line
        state.zq.bjdc.expectList = expect_list
        // eslint-disable-next-line
        state.zq.bjdc.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        allMatches[_expect] = matches
        state.zq.bjdc.allMatches = allMatches
    },
    ZQALL (state, data) {
        let {curr_expect, expect_list, matches, _expect} = data
        // eslint-disable-next-line
        state.zq.all.expectList = expect_list
        // eslint-disable-next-line
        state.zq.all.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        allMatches[_expect] = matches
        state.zq.all.allMatches = allMatches
    },
    JCZQ (state, data) {
        let {curr_expect, expect_list, matches, _expect} = data
        // eslint-disable-next-line
        state.zq.jczq.expectList = expect_list
        // eslint-disable-next-line
        state.zq.jczq.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        allMatches[_expect] = matches
        state.zq.jczq.allMatches = allMatches
    },
    SFC (state, data) {
        let {curr_expect, expect_list, matches, _expect} = data
        // eslint-disable-next-line
        state.zq.sfc.expectList = expect_list
        // eslint-disable-next-line
        state.zq.sfc.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        allMatches[_expect] = matches
        state.zq.sfc.allMatches = allMatches
    },
    HOT (state, data) {
        let {curr_expect, expect_list, matches, _expect} = data
        // eslint-disable-next-line
        state.zq.hot.expectList = expect_list
        // eslint-disable-next-line
        state.zq.hot.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        allMatches[_expect] = matches
        state.zq.hot.allMatches = allMatches
    },
    JCLQ (state, data) {
        let {curr_expect, expect_list, matches, _expect} = data
        // eslint-disable-next-line
        state.lq.jclq.expectList = expect_list
        // eslint-disable-next-line
        state.lq.jclq.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        allMatches[_expect] = matches
        state.lq.jclq.allMatches = allMatches
    }
}
