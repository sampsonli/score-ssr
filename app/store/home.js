/**
 * Created by lichun on 2017/5/4.
 */
import axios from '~plugins/axios'
export const state = {
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
        all: null,
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
        return axios.get(`/score/zq/info?vtype=bjdc&expect=${expect || ''}`).then((resp) => {
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
            if (expect) { // 拥有expect 代表是昨天， 或者明天
                commit('BJDC_EXPECT', data)
            } else {
                commit('BJDC', data)
            }
            return data
        })
    },
    fetchJclqMatches ({commit}, expect) {
        return axios.get(`/score/lq/info?vtype=jclq&expect=${expect || ''}`).then((resp) => {
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
            if (expect) { // 拥有expect 代表是昨天， 或者明天
                commit('JCLQ_EXPECT', data)
            } else {
                commit('JCLQ', data)
            }
            return data
        })
    },
    fetchJczqMatches ({commit}, expect) {
        return axios.get(`/score/zq/info?vtype=jczq&expect=${expect || ''}`).then((resp) => {
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
            if (expect) { // 拥有expect 代表是昨天， 或者明天
                commit('JCZQ_EXPECT', data)
            } else {
                commit('JCZQ', data)
            }
            return data
        })
    },
    fetchSfcMatches ({commit}, expect) {
        return axios.get(`/score/zq/info?vtype=sfc&expect=${expect || ''}`).then((resp) => {
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
            if (expect) { // 拥有expect 代表是昨天， 或者明天
                commit('SFC_EXPECT', data)
            } else {
                commit('SFC', data)
            }
            return data
        })
    },
    fetchHotMatches ({commit}, expect) {
        return axios.get(`/score/zq/hot?expect=${expect || ''}`).then((resp) => {
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
            if (expect) { // 拥有expect 代表是昨天， 或者明天
                commit('HOT_EXPECT', data)
            } else {
                commit('HOT', data)
            }
            return data
        })
    }
}

export const mutations = {
    BJDC (state, data) {
        let {curr_expect, expect_list, matches} = data
        // eslint-disable-next-line
        state.zq.bjdc.expectList = expect_list
        // eslint-disable-next-line
        state.zq.bjdc.cExpect = curr_expect
        // eslint-disable-next-line
        state.zq.bjdc.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        state.zq.bjdc.allMatches = allMatches
    },
    BJDC_EXPECT (state, data) {
        let {curr_expect, matches} = data
        // eslint-disable-next-line
        state.zq.bjdc.curExpect = curr_expect
        state.zq.bjdc.allMatches[curr_expect] = matches
    },
    JCZQ (state, data) {
        let {curr_expect, expect_list, matches} = data
        // eslint-disable-next-line
        state.zq.jczq.expectList = expect_list
        // eslint-disable-next-line
        state.zq.jczq.cExpect = curr_expect
        // eslint-disable-next-line
        state.zq.jczq.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        state.zq.jczq.allMatches = allMatches
    },
    JCZQ_EXPECT (state, data) {
        let {curr_expect, matches} = data
        // eslint-disable-next-line
        state.zq.jczq.curExpect = curr_expect
        state.zq.jczq.allMatches[curr_expect] = matches
    },
    SFC (state, data) {
        let {curr_expect, expect_list, matches} = data
        // eslint-disable-next-line
        state.zq.sfc.expectList = expect_list
        // eslint-disable-next-line
        state.zq.sfc.cExpect = curr_expect
        // eslint-disable-next-line
        state.zq.sfc.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        state.zq.sfc.allMatches = allMatches
    },
    SFC_EXPECT (state, data) {
        let {curr_expect, matches} = data
        // eslint-disable-next-line
        state.zq.sfc.curExpect = curr_expect
        state.zq.sfc.allMatches[curr_expect] = matches
    },
    HOT (state, data) {
        let {curr_expect, expect_list, matches} = data
        // eslint-disable-next-line
        state.zq.hot.expectList = expect_list
        // eslint-disable-next-line
        state.zq.hot.cExpect = curr_expect
        // eslint-disable-next-line
        state.zq.hot.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        state.zq.hot.allMatches = allMatches
    },
    HOT_EXPECT (state, data) {
        let {curr_expect, matches} = data
        // eslint-disable-next-line
        state.zq.hot.curExpect = curr_expect
        state.zq.hot.allMatches[curr_expect] = matches
    },
    JCLQ (state, data) {
        let {curr_expect, expect_list, matches} = data
        // eslint-disable-next-line
        state.lq.jclq.expectList = expect_list
        // eslint-disable-next-line
        state.lq.jclq.cExpect = curr_expect
        // eslint-disable-next-line
        state.lq.jclq.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        state.lq.jclq.allMatches = allMatches
    },
    JCLQ_EXPECT (state, data) {
        let {curr_expect, matches} = data
        // eslint-disable-next-line
        state.lq.jclq.curExpect = curr_expect
        state.lq.jclq.allMatches[curr_expect] = matches
    }
}
