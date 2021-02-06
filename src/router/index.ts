import { applicationTitle, LOAD_DETAIL_DATA } from "@/Constants";
import { pageAbout, pageDetail, pageHome, pageSpec } from "@/model/PageRouter";
import store from "@/store";
import Vue from "vue";
import VueRouter, { Next, RawLocation, Route, RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: pageHome.path,
    name: pageHome.name,
    meta: {
      title: `${pageHome.name} - ${applicationTitle}`
    },
    component: Home
  },
  {
    path: pageAbout.path,
    name: pageAbout.name,
    meta: {
      title: `${pageAbout.name} - ${applicationTitle}`
    },
    component: () => import("../views/About.vue")
  },
  {
    path: pageSpec.path,
    name: pageSpec.name,
    meta: {
      title: `${pageSpec.name} - ${applicationTitle}`
    },
    component: () => import("../views/Specs.vue")
  },
  {
    path: pageDetail.path,
    name: pageDetail.name,
    meta: {
      title: `${pageDetail.name} - ${applicationTitle}`
    },
    component: () => import("../views/Detail.vue"),
    props: true,
    beforeEnter: function(to: Route, from: Route, next) {
      store
        .dispatch(LOAD_DETAIL_DATA, {
          id: to.params.id,
          airport: to.params.airport
        })
        .then(() => next());
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title;
  next();
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

  // eslint-disable-next-line
  return route!;
};
