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
        jczq: null,
        all: null,
        sfc: null,
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
