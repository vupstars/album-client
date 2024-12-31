import {
	createRouter,
	createWebHistory
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Home",
		meta: { title: "首页" },
		component: () => import( "@/views/home/index.vue" )
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

const index = createRouter( {
	history: createWebHistory(),
	routes
} );

export default index;
