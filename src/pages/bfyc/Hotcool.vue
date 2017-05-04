<!--ui: http://ui.touch500.boss.com/touch/bifen/v124/record.html-->
<template>
    <div class="l-full l-flex-column">
        <!--顶部的时间-->
        <section class="pre-header">
            <ul>
                <li>比赛</li>
                <li>百家欧赔</li>
                <li>欧赔概率</li>
                <li>必发交易</li>
                <li>冷热</li>
            </ul>
        </section>


        <div class="hotc-box l-flex-1 l-relative" v-if="coldHot">
            <div class="l-full l-scroll-y" v-if="coldHot.matches.length">
                <!--冷热列表-->
                <section class="hotc-cont" v-for="match in coldHot.matches" v-if="match.status !== '4'"
                         v-tap="{methods: goAnalysis, fid: match.fid}">
                    <div class="hotc-tab-tit ">{{match | makeTitle}}<em :class="colorClass(match.tag.desc)">{{match.tag.desc}}</em>
                    </div>
                    <ul class="hotc-tab-list">
                        <li class="hotc-tab-item">
                            <ul>
                                <li>{{match.homesxname}}<em v-if="match.result==='3'">赢</em></li>
                                <li>{{match.cell.win.avrodds===''?'--':match.cell.win.avrodds}}</li>
                                <li>{{match.cell.win.europe===''?'--':(match.cell.win.europe+'%')}}</li>
                                <li>{{match.cell.win.betfair===''?'--':(match.cell.win.betfair+'%')}}</li>
                                <li>{{match.cell.win.exp===''?'--': match.cell.win.exp}}</li>
                            </ul>
                        </li>
                        <li class="hotc-tab-item">
                            <ul>
                                <li>平局<em v-if="match.result==='1'">赢</em></li>
                                <li>{{match.cell.draw.avrodds===''?'--':match.cell.draw.avrodds}}</li>
                                <li>{{match.cell.draw.europe===''?'--':(match.cell.draw.europe+'%')}}</li>
                                <li>{{match.cell.draw.betfair===''?'--':(match.cell.draw.betfair+'%')}}</li>
                                <li>{{match.cell.draw.exp===''?'--': match.cell.draw.exp}}</li>
                            </ul>
                        </li>
                        <li class="hotc-tab-item">
                            <ul>
                                <li>{{match.awaysxname}}<em v-if="match.result==='0'">赢</em></li>
                                <li>{{match.cell.lost.avrodds===''?'--':match.cell.lost.avrodds}}</li>
                                <li>{{match.cell.lost.europe===''?'--':(match.cell.lost.europe+'%')}}</li>
                                <li>{{match.cell.lost.betfair===''?'--':(match.cell.lost.betfair+'%')}}</li>
                                <li>{{match.cell.lost.exp===''?'--': match.cell.lost.exp}}</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <!--已完场-->
                <div class="tag-game-over" v-if="curStatus.history&&curStatus.latest">已完场</div>
                <section class="hotc-cont" v-for="match in coldHot.matches" v-if="match.status === '4'"
                         v-tap="{methods: goAnalysis, fid: match.fid}">
                    <div class="hotc-tab-tit ">{{match | makeTitle}}<em :class="colorClass(match.tag.desc)">{{match.tag.desc}}</em>
                    </div>
                    <ul class="hotc-tab-list">
                        <li class="hotc-tab-item">
                            <ul>
                                <li>{{match.homesxname}}<em v-if="match.result==='3'">赢</em></li>
                                <li>{{match.cell.win.avrodds===''?'--':match.cell.win.avrodds}}</li>
                                <li>{{match.cell.win.europe===''?'--':(match.cell.win.europe+'%')}}</li>
                                <li>{{match.cell.win.betfair===''?'--':(match.cell.win.betfair+'%')}}</li>
                                <li>{{match.cell.win.exp===''?'--': match.cell.win.exp}}</li>
                            </ul>
                        </li>
                        <li class="hotc-tab-item">
                            <ul>
                                <li>平局<em v-if="match.result==='1'">赢</em></li>
                                <li>{{match.cell.draw.avrodds===''?'--':match.cell.draw.avrodds}}</li>
                                <li>{{match.cell.draw.europe===''?'--':(match.cell.draw.europe+'%')}}</li>
                                <li>{{match.cell.draw.betfair===''?'--':(match.cell.draw.betfair+'%')}}</li>
                                <li>{{match.cell.draw.exp===''?'--': match.cell.win.exp}}</li>
                            </ul>
                        </li>
                        <li class="hotc-tab-item">
                            <ul>
                                <li>{{match.awaysxname}}<em v-if="match.result==='0'">赢</em></li>
                                <li>{{match.cell.lost.avrodds===''?'--':match.cell.lost.avrodds}}</li>
                                <li>{{match.cell.lost.europe===''?'--':(match.cell.lost.europe+'%')}}</li>
                                <li>{{match.cell.lost.betfair===''?'--':(match.cell.lost.betfair+'%')}}</li>
                                <li>{{match.cell.lost.exp===''?'--': match.cell.lost.exp}}</li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>
            <prompt v-else type="no-data" tip0="暂无数据"/>
        </div>
        <prompt v-else type="loading" tip0="正在加载中..."/>
    </div>


</template>

<script type="text/javascript">
    import Prompt from '~components/prompt'
    import axios from '~plugins/axios'
    export default{
      components: {
        Prompt
      },
      fetch ({store}) {
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
          store.commit('bfyc/AWESOME_PREDICT', data)
          return data
        }).catch(e => {
          store.commit('bfyc/AWESOME_PREDICT', {
            matches: []
          })
        })
      },
      computed: {
        coldHot: function () {
          return this.$store.state.bfyc.coldhot_distribute
        },
        curStatus: function () {
          let curStatus = {
            latest: false,
            history: false
          }
          if (this.coldHot && this.coldHot.matches) {
            this.coldHot.matches.forEach(match => {
              if (match.status !== '4') {
                curStatus.latest = true
              } else {
                curStatus.history = true
              }
            })
          }
          return curStatus
        }
      },
      mounted () {
            /* if (!this.coldHot) {
             this.$store.dispatch('fetchColdHotDistribute')
             } */
      },
      methods: {
        goAnalysis: function ({fid}) {
          location.href = `/score/detail.html?odds=bifa#/footballdetail/odds/${fid}`
        },
        colorClass (desc) {
          switch (desc) {
            case '胜过冷':
            case '负过冷':
            case '平局过冷':
              return 'too-cold'
            case '胜过热':
            case '负过热':
            case '平局过热':
              return ''
            case '规模较小':
            case '规模适中':
              return 'too-draw'
            default:
              return ''
          }
        }
      },

      filters: {
        score: (match) => {
          if (match.homescore && match.awayscore) {
            return `${match.homescore}:${match.awayscore}`
          } else {
            return 'VS'
          }
        },
        makeTitle: (item) => {
          return item.order + ' ' + item.simpleleague + ' ' + item.matchtime.slice(5)
        }
      }

    }
</script>
