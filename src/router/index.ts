import {
	createRouter,
	createWebHistory
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		meta: { title: "首页" },
		component: () => import( "@/views/home/index.vue" )
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
