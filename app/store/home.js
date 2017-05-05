/**
 * Created by lichun on 2017/5/4.
 */
import axios from '~plugins/axios'
export const state = {
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
    }
}

export const mutations = {
    BJDC (state, data) {
        let {curr_expect, expect_list, matches} = data
        // eslint-disable-next-line
        state.bjdc.expectList = expect_list
        // eslint-disable-next-line
        state.bjdc.cExpect = curr_expect
        // eslint-disable-next-line
        state.bjdc.curExpect = curr_expect
        let allMatches = {}
        allMatches[curr_expect] = matches
        state.bjdc.allMatches = allMatches
    },
    BJDC_EXPECT (state, data) {
        let {curr_expect, matches} = data
        // eslint-disable-next-line
        state.bjdc.curExpect = curr_expect
        state.bjdc.allMatches[curr_expect] = matches
    }
}
