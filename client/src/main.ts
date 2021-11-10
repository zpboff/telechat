import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { clickOutsideDirective } from "@/directives/clickOutside";

export const app = createApp(App);

app.use(store)
    .directive("click-outside", clickOutsideDirective)
    .use(router)
    .mount("#app");
