<template>
    <div class="l-full l-flex-column">
        <!--head begin-->
        <div class="headernav">
            <div class="headernavL"><a onclick="home.back()" class="home-icon">返回</a></div>
            <ul class="toggle-cz">
                <li :class="{'cur': ~$route.path.indexOf('/zq/')}">
                    <nuxt-link to="/home/zq/jczq/cur" replace>足球</nuxt-link>
                </li>
                <li :class="{'cur': ~$route.path.indexOf('/lq/')}">
                    <nuxt-link to="/home/lq/jclq/cur" replace>篮球</nuxt-link>
                </li>
            </ul>
            <div class="headernavR">
                <a href="../score/match_center/index.html?from=web_home" class="league-icon"></a>
                <a class="sx-icon" v-tap="{methods: triggerFilter}"></a>
            </div>
        </div>


        <!--顶部的tab-->
        <div class="l-flex-1 l-relative">

            <nuxt-child/>

        </div>
        <transition name="slide">
            <league v-if="filter.show"
                    :matches="filter.matches"
                    :inited="filter.inited"
                    @ok="filter.onOk($event)"
                    @cancel="filter.onCancel($event)"></league>
        </transition>

    </div>

</template>
<style>
    .headernav {
        position: relative;
    }
</style>

<script>
    import Vue from 'vue'
    import vueTap from 'v-tap'
    import NuxtLink from '../../.nuxt/components/nuxt-link'
    import league from '~components/league'
    Vue.use(vueTap)

    export default{

        components: {NuxtLink, league},
        computed: {
            filter () {
                return this.$store.state.home.filter
            }
        },
        methods: {
            triggerFilter () {
                this.$store.dispatch('home/triggerFilter')
            }
        },
        mounted () {
//            入口
        }

    }
</script>
