import { ProxyOptions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const defaultProxyOption: ProxyOptions = {
	changeOrigin: true,	
	secure: false,
	ws: true
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
	vue(),
	vuetify({ autoImport: true }),
  ],

  server: {
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		proxy: {
			'/api': {
				target: 'https://a993e630-bbb4-4e5e-87c9-6a0f187f5c15.api.kr-central-1.kakaoi.io',
				rewrite: (path) => path.replace(/^\/api/, ''),
       			 ...defaultProxyOption,
			},
			'/naver': {
				target: 'https://openapi.naver.com',
				rewrite: (path) => path.replace(/^\/naver/, ''),
        		...defaultProxyOption,
			},
			'/geocoding': {
				target: 'https://naveropenapi.apigw.ntruss.com',
				rewrite: (path) => path.replace(/^\/geocoding/, ''),
				...defaultProxyOption,
			},
			'/craw': {
				target: 'http://127.0.0.1:5000',
				rewrite: (path) => path.replace(/^\/craw/, ''),
				...defaultProxyOption,
			},
			'/db': {
				target: 'http://localhost:3000',
				rewrite: (path) => path.replace(/^\/db/, ''),
				...defaultProxyOption,
			}
		}
  }
})


