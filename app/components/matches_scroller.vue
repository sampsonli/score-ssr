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
            const firstEndEl = document.querySelector('.__first_no_end')
            const oTop = firstEndEl ? -firstEndEl.offsetTop : 0
            import('iscroll').then((IScroll) => {
                this.myScroll = new IScroll('._scroll_container', {
                    deceleration: 0.003,
                    mouseWheel: true,
                    startY: oTop
                })
            })
        },
        beforeDestroy () {
            console.log(this.myScroll.y)
        }
    }
</script>
