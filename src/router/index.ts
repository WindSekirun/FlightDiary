import {
  pageAbout,
  pageDetail,
  pageHome,
  pageSpecification
} from "@/model/PageRouter";
import Vue from "vue";
import VueRouter, { RawLocation, Route, RouteConfig } from "vue-router";
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
    component: () => import("../views/About.vue")
  },
  {
    path: pageSpecification.path,
    name: pageSpecification.name,
    component: () => import("../views/Specification.vue")
  },
  {
    path: pageDetail.path,
    name: pageDetail.name,
    component: () => import("../views/Detail.vue"),
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = async function(location: RawLocation) {
  let route: Route;
  try {
    route = await originalPush.call<VueRouter, [RawLocation], Promise<Route>>(
      this,
      location
    );
  } catch (err) {
    if (err.name !== "NavigationDuplicated") {
      throw err;
    }
  }

  return route!;
};
