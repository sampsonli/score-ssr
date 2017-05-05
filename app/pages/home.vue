<template>
    <div class="l-full l-flex-column">
        <!--head begin-->
        <div class="headernav">
            <div class="headernavL"><a onclick="home.back()" class="home-icon">返回</a></div>
            <ul class="toggle-cz">
                <li :class="{'cur': ~$route.path.indexOf('/zq/')}"><nuxt-link to="/home/zq/bjdc/1" replace>足球</nuxt-link></li>
                <li :class="{'cur': ~$route.path.indexOf('/lq/')}"><nuxt-link to="/home/lq/jclq/1" replace>篮球</nuxt-link></li>
            </ul>
            <div class="headernavR">
                <a href="../score/match_center/index.html?from=web_home" class="league-icon"></a>
                <a class="sx-icon" onclick="home.showSelect();" href="javascript:;"></a>
            </div>
        </div>


        <!--顶部的tab-->
        <div class="l-flex-1 l-relative">

            <nuxt-child/>

        </div>

    </div>

</template>
<style>
    .headernav{
        position: relative;
    }
</style>

<script>
    import Vue from 'vue'
import vueTap from 'v-tap'
    import NuxtLink from '../../.nuxt/components/nuxt-link'
Vue.use(vueTap)

export default{

        components: {NuxtLink},
        computed: {

        },
        methods: {

        },
        mounted () {
//            入口
        }

    }
</script>
