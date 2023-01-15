import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/es/locale/lang/zh-cn";
import axios from "axios";
import service from "@/service";
import echarts from "echarts";

const app = createApp(App);
app.config.globalProperties.$https = axios;
app.config.globalProperties.service = service;
app.config.globalProperties.$echarts = echarts;

app.use(Router);
app.use(ElementPlus, { locale });
app.mount("#app");
