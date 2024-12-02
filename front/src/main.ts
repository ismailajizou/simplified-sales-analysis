import "@/styles/main.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(VueQueryPlugin);
app.use(pinia);

app.mount("#app");
