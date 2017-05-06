<template>
    <div class="l-full l-flex-column">
        <div class="qi-list-box"><div class="qi-list"><ul class="responsive"><li class="">前一期</li> <li class="qiqh">170501 期<i class="qi-arrow"></i></li> <li class="">后一期</li></ul></div></div>
        <div class="l-flex-1 l-relative">
            <matches-scroller ref="scroller">
                <ul class="list">
                    <li v-for="match in matches" class="list-item" v-tap="{methods: goDetail}" :class="{'__first_no_end': match._flag}">
                        <div class="list-tit">
                            <span class="list-day"> {{match.order}}&nbsp;&nbsp;{{match.simpleleague}}</span>
                            <span class="list-state color3">{{match.status_desc}}</span>
                            <span class="crazy-sports f20">猜球</span>
                            <span class="list-time">04-25 18:00</span>
                        </div>
                        <div class="list-team">
                            <div class="team team-l f30">
                                <img src="http://odds.500.com/static/soccerdata/images/TeamPic/teamsignnew_752.png">
                                {{match.homesxname}}<i class="red-pai f22" style="display: none;">0</i>
                            </div>
                            <div class="team-c color3" v-if="match.status==='4'">
                                <p class="score">
                                    <em class="score-itm"><i>{{match.homescore}}</i></em>
                                    <span class="score-c">:</span>
                                    <em class="score-itm"><i>{{match.awayscore}}</i></em>
                                </p>
                            </div>
                            <div class="team-c" v-if="match.status!=='4'"><i class="collect"></i></div>
                            <div class="team team-r f30">
                                {{match.awaysxname}}
                                <img src="http://odds.500.com/static/soccerdata/images/TeamPic/teamsignnew_3986.png">
                            </div>
                        </div>
                        <div class="list-info f22"><span>半场 {{match.extra_time_score}}&nbsp;</span></div>
                    </li>
                </ul>
            </matches-scroller>
        </div>




    </div>
</template>
<script>
    import MatchesScroller from '~components/matches_scroller'
    export default {
        fetch ({store}) {
            if (store.state.home.lq.jclq.allMatches[store.state.home.lq.jclq.curExpect]) {
                return Promise.resolve()
            } else {
                return store.dispatch('home/fetchJclqMatches')
            }
        },
        components: {
            MatchesScroller
        },
        computed: {
            matches () {
                return this.$store.state.home.lq.jclq.allMatches[this.$store.state.home.lq.jclq.curExpect]
            }
        },
        methods: {
            goDetail () {
                this.$router.push('/bfyc/predict')
            }
        },
        mounted () {
//            this.$refs.scroller.config()
        }
    }
</script>
<style>
    .qi-list-box{
        position: relative;
        top: 0;
    }
</style>
