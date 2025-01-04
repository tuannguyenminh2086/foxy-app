import { resolve } from "node:path"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 devtools: { enabled: true },

 // SSR must be turned off
ssr: false,
modules: [
	"@nuxtjs/tailwindcss",
	"@nuxtjs/color-mode",
	"shadcn-nuxt",
	"@pinia/nuxt",
	'@pinia-plugin-persistedstate/nuxt',
	"@vueuse/nuxt",
	"@vee-validate/nuxt",
	"@nuxt/fonts",
	"@sidebase/nuxt-auth",
	"@nuxt/image",
	"dayjs-nuxt",
],
shadcn: {
	prefix: '',
	componentDir: './components/ui'
},
colorMode: {
	classSuffix: ''
},
dayjs: {
	plugins: ['relativeTime', 'utc', 'timezone', 'localeData'],
},

fonts: {
// You can provide overrides for individual families
families: [
				{ name: 'Inter', provider: 'google' },
				{ name: 'Manrope', provider: 'google'}
],
defaults: {
				weights: [400, 500, 600,700, 800],
				styles: ['normal']
				},
},

auth: {
	globalAppMiddleware: true,
	baseURL: process.env.NUXT_PUBLIC_API_URL,
	provider: {
			type: 'authjs'
	},
},

runtimeConfig: {
	authJs: {
		secret: process.env.NUXT_NEXTAUTH_SECRET, // You can generate one with `openssl rand -base64 32`
	},
	cmsUrl: process.env.NUXT_BACKEND_URL,
	public: {
		authJs: {
			baseUrl: process.env.NUXT_PUBLIC_AUTH_URL, // The URL of your deployed app (used for origin Check in production)
			verifyClientOnEveryRequest: true // whether to hit the /auth/session endpoint on every client request
		},
		cmsUrl: process.env.NUXT_BACKEND_URL,
		storageUrl: process.env.NUXT_PUBLIC_STORAGE_URL,
		vaporBucket: process.env.NUXT_PUBLIC_LARAVEL_VAPOR_BUCKET,
		pusherAppId: process.env.PUSHER_APP_ID,
		pusherAppKey: process.env.NUXT_PUBLIC_PUSHER_KEY,
		pusherAppCluster: process.env.NUXT_PUBLIC_PUSHER_CLUSTER
	}
},

 compatibilityDate: '2025-01-04'
})