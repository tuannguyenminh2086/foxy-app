// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
								devtools: { enabled: true },
								future: {
																compatibilityVersion: 4
								},
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
								  "dayjs-nuxt",
								  '@nuxt/eslint',
								  '@nuxthub/core',
								  'nuxt-auth-utils',
								  'nuxt-bugsnag'
								],
								bugsnag: {
									config: {
									  apiKey: 'cd01191361e5395adb6a394e5b0937fa',
									  enabledReleaseStages: ['production'],
									  releaseStage: process.env.NODE_ENV,
									  appVersion: '1.0',
									}
								},
								shadcn: {
																prefix: '',
																componentDir: './app/components/ui'
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
								runtimeConfig: {
																cmsUrl: process.env.NUXT_BACKEND_URL,
																public: {
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