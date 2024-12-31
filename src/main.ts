import { createApp } from "vue"
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./permission";
import "./assets/style/index.scss";

const app = createApp( App );
const pinia = createPinia();

app.use( router )
	.use( pinia )
	.mount( "#app" );
