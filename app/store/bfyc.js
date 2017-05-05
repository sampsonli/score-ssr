/**
 * Created by lichun on 2017/5/4.
 */
import axios from '~plugins/axios'
export const state = {
    awesome_predict: null,
    coldhot_distribute: null,
    strenght_compare: null,
    combat_feature: null
}

export const actions = {
    fetchAwesomePredict ({commit}, expect) {
        return axios.get(`/library/aggregate/awesome_predict?expect=${expect || ''}`).then((resp) => {
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
                commit('AWESOME_PREDICT_EXPECT', data)
            } else {
                commit('AWESOME_PREDICT', data)
            }
            return data
        }).catch((e) => {
            if (expect) { // 拥有expect 代表是昨天， 或者明天
                commit('AWESOME_PREDICT_EXPECT', {matches: [], curr_expect: expect}) // 没有数据
            } else {
                commit('AWESOME_PREDICT', {matches: []})
            }
            return {matches: [], curr_expect: expect}
        })
    },
    fetchCombatFeature ({commit}) {
        return axios.get(`/library/aggregate/combat_feature`).then((resp) => {
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
            commit('COMBAT_FEATURE', data)
            return data
        })
    },
    fetchStrengthCompare ({commit}) {
        return axios.get(`/library/aggregate/strength_compare`).then((resp) => {
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
            commit('STRENGTH_COMPARE', data)
            return data
        })
    },
    fetchColdHotDistribute ({commit}) {
        return axios.get(`/library/aggregate/coldhot_distribute`).then((resp) => {
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
            commit('COLDHOT_DISTRIBUTE', data)
            return data
        })
    }

}

export const mutations = {
    AWESOME_PREDICT (state, data) {
        let {expect_list, good_news, curr_expect, matches} = data
        let allMatches = {}
        expect_list.forEach(expect => {
            // eslint-disable-next-line
            if (expect === curr_expect) {
                allMatches[expect] = matches
            } else {
                allMatches[expect] = null
            }
        })

        state.awesome_predict = {
            expect_list, good_news, curr_expect, allMatches
        }
    },
    AWESOME_PREDICT_EXPECT (state, data) {
        if (state.awesome_predict.expect_list.some(expect => expect !== data.curr_expect)) {
            state.awesome_predict.allMatches[data.curr_expect] = data.matches
        }
    },
    COLDHOT_DISTRIBUTE (state, data) {
        state.coldhot_distribute = data
    },
    COMBAT_FEATURE (state, data) {
        state.combat_feature = data
    },
    STRENGTH_COMPARE (state, data) {
        state.strenght_compare = data
    }
}
