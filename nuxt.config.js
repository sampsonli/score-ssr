module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: '竞彩足球比分,即时比分_竞足比分_500彩票网',
        meta: [
            {charset: 'utf-8'},
            // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {hid: 'description', name: 'description', content: '500彩票网竞足比分为您提供各热门赛事的竞彩比分直播、足彩即时比分直播、单场即时比分直播、足球即时比分、开赛时间等信息。'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', type: 'text/css', href: 'http://tccache.500.com/mobile/touch/css/bifen.css'},
            {rel: 'stylesheet', type: 'text/css', href: 'http://tccache.500.com/mobile/touch/css/reset.css'},
            {rel: 'stylesheet', type: 'text/css', href: 'http://tccache.500.com/mobile/touch/css/v124.css'}
        ],
        script: [
            {src: 'http://tccache.500.com/mobile/touch/js/flexible.js', type: 'text/javascript'}
        ]

    },
    /*
     ** Add axios globally
     */
    build: {
        vendor: ['axios'],
        /*
         ** Run ESLINT on save
         */
        extend (config, ctx) {
            if (ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    loading: {
        color: '#3366cc',
        height: '.08rem',
        duration: '3000'
    },
    performance: {
        prefetch: false,
        gzip: false
    },
    srcDir: 'app/'
}
