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
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { LMap, LTileLayer, LMarker, LPolyline, LControl } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

import "vue-select/dist/vue-select.css";

library.add(faChevronDown, faChevronUp);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component("v-select", vSelect);
Vue.axios.defaults.baseURL = baseDomain;

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-polyline", LPolyline);
Vue.component("l-control", LControl);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
