import {
  applicationTitle,
  LOAD_AIRPORT_DETAIL_DATA,
  LOAD_COLLECTION_DETAIL_DATA,
  LOAD_DETAIL_DATA
} from "@/Constants";
import {
  pageAbout,
  pageAirport,
  pageAirportDetail,
  pageCollection,
  pageCollectionDetail,
  pageDetail,
  pageHome,
  pageLogbook,
  pageSpec
} from "@/model/PageRouter";
import {
  NAVIGATION_AIRPORT,
  NAVIGATION_COLLECTION,
  NAVIGATION_HOME
} from "@/model/vo/MenuNavigationItem";
import store from "@/store";
import Vue from "vue";
import VueRouter, {
  NavigationGuardNext,
  RawLocation,
  Route,
  RouteConfig
} from "vue-router";
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
    component: () => import("../views/Detail.vue"),
    meta: {
      title: `${pageDetail.name} - ${applicationTitle}`,
      parent: NAVIGATION_HOME
    },
    props: true,
    beforeEnter: function (to: Route, from: Route, next: NavigationGuardNext) {
      store
        .dispatch(LOAD_DETAIL_DATA, {
          id: to.params.id,
          airport: to.params.airport
        })
        .then(() => next());
    }
  },
  {
    path: pageCollection.path,
    name: pageCollection.name,
    meta: {
      title: `${pageCollection.name} - ${applicationTitle}`
    },
    component: () => import("../views/Collections.vue")
  },
  {
    path: pageCollectionDetail.path,
    name: pageCollectionDetail.name,
    meta: {
      title: `${pageCollectionDetail.name} - ${applicationTitle}`,
      parent: NAVIGATION_COLLECTION
    },
    component: () => import("../views/CollectionsDetail.vue"),
    props: true,
    beforeEnter: function (to: Route, from: Route, next: NavigationGuardNext) {
      store
        .dispatch(LOAD_COLLECTION_DETAIL_DATA, { id: to.params.id })
        .then(() => next());
    }
  },
  {
    path: pageLogbook.path,
    name: pageLogbook.name,
    meta: {
      title: `${pageLogbook.name} - ${applicationTitle}`
    },
    component: () => import("../views/Logbook.vue")
  },
  {
    path: pageAirport.path,
    name: pageAirport.name,
    meta: {
      title: `${pageAirport.name} - ${applicationTitle}`
    },
    component: () => import("../views/VisitedAirports.vue")
  },
  {
    path: pageAirportDetail.path,
    name: pageAirportDetail.name,
    meta: {
      title: `${pageAirportDetail.name} - ${applicationTitle}`,
      parent: NAVIGATION_AIRPORT
    },
    component: () => import("../views/VisitedAirportsDetail.vue"),
    props: true,
    beforeEnter: function (to: Route, from: Route, next: NavigationGuardNext) {
      store
        .dispatch(LOAD_AIRPORT_DETAIL_DATA, { airport: to.params.airport })
        .then(() => next());
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, _from, next) => {
  if (to?.meta?.title) {
    document.title = to?.meta?.title;
  }
  next();
});

export default router;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = async function (location: RawLocation) {
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
