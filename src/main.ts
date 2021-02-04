import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import VueAxios from "vue-axios";
import axios from "axios";
import vSelect from "vue-select";
import { baseDomain } from "./Constants";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component("v-select", vSelect);
Vue.axios.defaults.baseURL = baseDomain;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
