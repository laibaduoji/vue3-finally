import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { Buffer } from "buffer";
import App from "./App.vue";
import router from "./router";
import process from "process";

if (typeof (window as any).Buffer === "undefined") {
  (window as any).Buffer = Buffer;
}

if (typeof global === "undefined") {
  window.global = window;
}

window.process = process;
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
