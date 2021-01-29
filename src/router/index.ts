import { pageAbout, pageHome, pageSpecification } from "@/model/PageRouter";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: pageHome.path,
    name: pageHome.name,
    component: Home
  },
  {
    path: pageAbout.path,
    name: pageAbout.name,
    component: () => import("../views/About.vue") // route level code-splitting
  },
  {
    path: pageSpecification.path,
    name: pageSpecification.name,
    component: () => import("../views/Specification.vue") // route level code-splitting
  }
];

const router = new VueRouter({
  routes
});

export default router;
