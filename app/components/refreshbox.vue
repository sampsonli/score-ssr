<template>
    <div class="refresh-box"><i id="sx" class="refresh-icon " :class="{'refresh-rorate': loading}"></i></div>
</template>
<script type="text/ecmascript-6">

    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start () {
                this.loading = true
            },
            finish () {
                this.loading = false
            }
        }
    }
</script>
