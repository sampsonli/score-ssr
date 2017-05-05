<template>
    <div class="l-full l-flex-column">
        <!--head begin-->
        <div class="headernav">
            <div class="headernavL"><a onclick="home.back()" class="home-icon">返回</a></div>
            <ul class="toggle-cz">
                <li onclick="location.href='#/football'" class="cur">足球</li>
                <li onclick="location.href='#/basketball'" class="">篮球</li>
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
Vue.use(vueTap)

export default{

        computed: {

        },
        methods: {

        },
        mounted () {
//            入口
        }

    }
</script>
