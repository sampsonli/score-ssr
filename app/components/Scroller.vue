<template>
    <div class="l-full _scroll_container">
        <div class="_scroll_content">
            <slot>

            </slot>
        </div>
    </div>

</template>
<style>
    ._scroll_container, ._scroll_content{
        overflow: hidden;

    }
</style>
<script>
    import {Scroller} from 'scroller'
    export default {
/*        mounted () {
            this.$on('config', this.config)
        }, */
        methods: {
            config () {
                const container = document.querySelector('._scroll_container')
                const scrollContent = document.querySelector('._scroll_content')

                const transform = typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'

                const scrollerObj = new Scroller(function (left, top, zoom) {
                    scrollContent.style[transform] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')'
                }, {
                    scrollingX: false,
                    scrollingY: true,
//                    bouncing: false,
                    animationDuration: 150
                })

                const cwidth = container.offsetWidth
                let cheight = container.offsetHeight
                let iwidth = scrollContent.offsetWidth
                let iheight = scrollContent.offsetHeight

                scrollerObj.setDimensions(cwidth, cheight, iwidth, iheight)
                this.touchstartHandler = function (e) {
                    scrollerObj.doTouchStart(e.touches, e.timeStamp)
                    e.preventDefault()
                }

                container.addEventListener('touchstart', this.touchstartHandler, false)

                this.touchmoveHandler = function (e) {
                   /* if (cheight !== container.offsetHeight) {
                        scrollerObj.setDimensions(cwidth, container.offsetHeight, iwidth, iheight)
                    } */
                    scrollerObj.doTouchMove(e.touches, e.timeStamp, e.scale)
                }

                container.addEventListener('touchmove', this.touchmoveHandler, false)

                this.touchendHandler = function (e) {
                    scrollerObj.doTouchEnd(e.timeStamp)
                }
                container.addEventListener('touchend', this.touchendHandler, false)

                this.touchcancelHandler = function (e) {
                    scrollerObj.doTouchEnd(e.timeStamp)
                }
                container.addEventListener('touchcancel', this.touchcancelHandler, false)
            }
        }
    }
</script>
