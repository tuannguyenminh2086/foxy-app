import { resolve } from "node:path"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	// SSR must be turned off
	ssr: false,

	modules: [
        "@nuxtjs/tailwindcss",
        "shadcn-nuxt",
        "@pinia/nuxt",
        "@vueuse/nuxt",
        "@vee-validate/nuxt",
        "@nuxt/fonts",
        "@sidebase/nuxt-auth"
    ],
	shadcn: {
			prefix: '',
			componentDir: './components/ui'
	},
	fonts: {
			// You can provide overrides for individual families
			families: [
				{ name: 'Inter', provider: 'google' },
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
		public: {
			authJs: {
				baseUrl: process.env.NUXT_PUBLIC_AUTH_URL, // The URL of your deployed app (used for origin Check in production)
				verifyClientOnEveryRequest: true // whether to hit the /auth/session endpoint on every client request
			}
		},
		cmsUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
		storageUrl: process.env.NUXT_PUBLIC_STORAGE_URL,
		vaporBucket: process.env.NUXT_PUBLIC_LARAVEL_VAPOR_BUCKET
	}
})