<template>
    <div class="l-full _scroll_container">
        <div class="_scroll_content">
            <slot>

            </slot>
        </div>
    </div>

</template>
<script>
    export default {
        mounted () {
            let oTop
            if (window.__scroll_path === this.$route.path && window.__scroll_position) {
                oTop = window.__scroll_position
            } else {
                const firstEndEl = document.querySelector('.__first_no_end')
                oTop = firstEndEl ? -firstEndEl.offsetTop : 0
            }

            window.__scroll_path = this.$route.path
            import('iscroll').then((IScroll) => {
                this.myScroll = new IScroll('._scroll_container', {
                    deceleration: 0.003,
                    mouseWheel: true,
                    startY: oTop
                })
            })
        },

        beforeDestroy () {
            window.__scroll_position = this.myScroll.y
        }
    }
</script>
