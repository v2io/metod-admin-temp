module.exports = {
	mode: 'history',
	head: {title: 'METOD'}, // Headers of the page
	loading: true, // Disable default loading bar
	build: {
		extend (config, { isDev, isClient }) {
			if (isDev && isClient) {
				// Run ESLint on save
				// config.module.rules.push({
				// 	enforce: 'pre',
				// 	test: /\.(js|vue)$/,
				// 	loader: 'eslint-loader',
				// 	exclude: /(node_modules)/
				// })
			}
			// Extend only webpack config for client-bundle
			if (isClient) {
				config.target = process.env.BUILD_TARGET || 'electron-renderer';
			}
		}
	},
	dev: process.env.NODE_ENV === 'DEV',
	css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
		'@/assets/css/global.css',
		'element-ui/lib/theme-chalk/index.css'
	],
	plugins: [
			'~plugins/element',
			'~plugins/i18n',
			'~plugins/lodash',
			'~plugins/api',
			'~plugins/vue-awesome',
			'~plugins/components',
    	'~plugins/filters.js',
			{src: '~plugins/vueEditor', ssr: false},
			{src: '~plugins/draggable', ssr: false},
			{src: '~plugins/apexcharts', ssr: false}
	],
	modules: [
		['nuxt-i18n', {
			locales: [{
				code: 'ru',
				file: 'ru-UA.js'
			}],
			defaultLocale: 'ru',
			seo: false, // temp, see https://github.com/nuxt/nuxt.js/issues/3957
			lazy: true,
			langDir: 'lang/'
		}]
	]
}
