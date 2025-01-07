import {
	createRouter,
	createWebHistory,
	createWebHashHistory
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const clientLayout = () => import( "@/layout/client/index.vue" );

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: clientLayout,
		children: [ {
			path: "/",
			name: "Home",
			meta: { title: "首页" },
			component: () => import( "@/views/home/index.vue" )
		}, {
			path: "/artwork/:id",
			name: "WorkDetail",
			meta: { title: "插画详情" },
			component: () => import( "@/views/work-detail/index.vue" )
		}, {
			path: "/tag/:tag",
			name: "Tag",
			meta: { title: "标签" },
			component: () => import( "@/views/tag/index.vue" )
		}, {
			path: "/user/:id",
			name: "UserHome",
			meta: { title: "个人主页" },
			component: () => import( "@/views/user/index.vue" )
		} ]
	},
	{
		path: "/login",
		name: "Login",
		meta: { title: "登录" },
		component: () => import( "@/views/login/index.vue" )
	},
	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		meta: { title: "404", noAuth: true },
		component: () => import( "@/views/not-found/index.vue" )
	}
];

/* github pages 页面无法配置 404 跳转，改用 hash 模式 */
const createRouterHistory = import.meta.env.MODE === "github" ? createWebHashHistory : createWebHistory;

const index = createRouter( {
	history: createRouterHistory( import.meta.env.VITE_BASE_URL ),
	routes
} );

export default index;
