<template>
    <div class="refresh-box" v-tap="{methods: update}"><i id="sx" class="refresh-icon " :class="{'refresh-rorate': loading}"></i></div>
</template>
<script type="text/ecmascript-6">

    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            update () {
                this.$router.replace(this.$route.path + '?_t=' + Date.now())
            },
            start () {
                this.loading = true
            },
            finish () {
                this.loading = false
                setTimeout(() => {
                    this.$router.replace(this.$route.path.split('?_t=')[0])
                }, 16.5)
            }
        }
    }
</script>
