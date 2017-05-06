<template>

    <div class="l-full l-flex-column">
        <div class="in-tab responsive l-relative" style="z-index: 11">
            <a class="wfqh" :class="{'cur': isNav}" v-tap="{methods: tapNav}">
                {{curNavName}}
                <i class="toggle-arrow" :class="{'rotate180': showNav}"></i>
                <i class="tab-arrow"></i>
                <!--<i class="tab-arrow"></i>-->
            </a>
            <nuxt-link to="/home/zq/hot/" :class="{'cur': ~$route.path.indexOf('/hot/')}" replace>精选<i class="tab-arrow"></i></nuxt-link>
            <a :class="{'cur': ~$route.path.indexOf('/my/')}">我的比赛<i class="tab-arrow"></i></a>
        </div>

        <div v-if="showNav">
            <div class="l-relative" style="z-index: 11;">
                <div class="ui-navbox-item">
                    <ul>
                        <li :class="{'select': ~$route.path.indexOf('/jczq/')}"><nuxt-link to="/home/zq/jczq/" replace><span>竞彩足球</span></nuxt-link></li>
                        <li :class="{'select': ~$route.path.indexOf('/sfc/')}"><nuxt-link to="/home/zq/sfc/" replace><span>胜负彩</span></nuxt-link></li>
                        <li :class="{'select': ~$route.path.indexOf('/bjdc/')}"><nuxt-link to="/home/zq/bjdc/" replace><span>北京单场</span></nuxt-link></li>
                        <li :class="{'select': ~$route.path.indexOf('/all/')}"><span>全部</span></li>
                    </ul>
                </div>
            </div>
            <div class="ui-alert-layer" v-tap="{methods: toggleNav}" style="z-index: 10"></div>
        </div>

        <div class="l-flex-1 l-relative">

            <nuxt-child/>


        </div>

    </div>


</template>
<style>
    .in-tab {
        padding-top: 0;
        position: relative;
        top: 0

    }
</style>
<script>
    import NuxtLink from '../../../.nuxt/components/nuxt-link'
export default {
        components: {NuxtLink},
        data () {
            return {
                showNav: false
            }
        },
        computed: {
            curNavName () {
                if (~this.$route.path.indexOf('/jczq/')) {
                    return '竞彩足球'
                } else if (~this.$route.path.indexOf('/bjdc/')) {
                    return '北京单场'
                } else if (~this.$route.path.indexOf('/sfc/')) {
                    return '胜负彩'
                } else if (~this.$route.path.indexOf('/all/')) {
                    return '全部'
                } else {
                    return '竞彩足球'
                }
            },
            isNav () {
                return !!(~this.$route.path.indexOf('/jczq/') || ~this.$route.path.indexOf('/bjdc/') || ~this.$route.path.indexOf('/sfc/') || ~this.$route.path.indexOf('/all/'))
            }
        },
        methods: {
            tapNav () {
                if (~this.$route.path.indexOf('/jczq/') || ~this.$route.path.indexOf('/bjdc/') || ~this.$route.path.indexOf('/sfc/') || ~this.$route.path.indexOf('/all/')) {
                    this.showNav = !this.showNav
                } else {
                    this.$router.replace('/home/zq/jczq/')
                }
            },
            toggleNav () {
                this.showNav = !this.showNav
            }
        }
    }

</script>
