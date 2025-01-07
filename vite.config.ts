import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vite.dev/config/
export default ( { mode }: ConfigEnv ) => {
	const env = loadEnv( mode, process.cwd() );
	return defineConfig( {
		base: env.VITE_BASE_URL,
		plugins: [ vue() ],
		resolve: {
			alias: {
				"@": path.join( __dirname, "./src" )
			}
		},
		server: {
			port: 60721,
			open: true
		},
		optimizeDeps: {
			exclude: [ "fsevents" ]
		},
		build: {
			// https://cn.vitejs.dev/guide/build.html#browser-compatibility
			target: "es2015",
			sourcemap: false,
			// 消除打包大小超过500kb警告
			chunkSizeWarningLimit: 4000,
			rollupOptions: {
				input: {
					index: path.join( __dirname, "index.html" )
				},
				// 静态资源分类打包
				output: {
					chunkFileNames: "static/js/[name]-[hash].js",
					entryFileNames: "static/js/[name]-[hash].js",
					assetFileNames: "static/[ext]/[name]-[hash].[ext]"
				}
			}
		},
	} )
}
