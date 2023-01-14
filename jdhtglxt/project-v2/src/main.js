import Vue from "vue";
import App from "./App.vue";
import "./assets/css/reset.css";
import "font-awesome/css/font-awesome.min.css";
import service from "@/service";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "@/router";
import echarts from "echarts";

Vue.use(ElementUI);
// Vue.prototype.axios = axios //挂载到原型,可以在全局使用
Vue.prototype.service = service; //挂载到原型,可以在全局使用
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
//路由导航守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("username")) {
    if (to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  } else next();
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
