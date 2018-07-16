const pkg = require('./package');

module.exports = {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#FFFFFF' },

    /*
    ** Global CSS
    */
    css: [
        '@/assets/scss/main.scss'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/plugins/Api.js',
        '@/plugins/fontawesom.js'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios',
        // Doc: https://bootstrap-vue.js.org/docs/
        'bootstrap-vue/nuxt',
        // Doc: https://github.com/anteriovieira/nuxt-sass-resources-loader
        ['nuxt-sass-resources-loader', '@/assets/scss/main.scss'],
    ],
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.BASE_URL || 'http://localhost:5000',
    },

    /*
    ** Build configuration
    */
    build: {
        /*
    ** You can extend webpack config here
    */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    },
    transition: {
        name: 'fade',
        mode: 'out-in'
    },
    router:{
        extendRoutes(routes, resolve){
            routes.push({
                path: '*',
                component: resolve(__dirname, 'pages/index.vue')
            })
        }
    }
};
