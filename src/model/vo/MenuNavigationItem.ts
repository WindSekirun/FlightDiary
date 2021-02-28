import {
  pageAbout,
  pageAirport,
  pageCollection,
  pageHome,
  PageRouter,
  pageSpec,
  pageLogbook
} from "../PageRouter";

export class MenuNavigationItem {
  icon: string;
  name: string;
  routeTo: PageRouter | undefined;
  link: string | undefined;
  index: number;

  static byRouter(
    icon: string,
    name: string,
    routeTo: PageRouter,
    index: number
  ) {
    const navigation = new MenuNavigationItem();
    navigation.icon = icon;
    navigation.name = name;
    navigation.routeTo = routeTo;
    navigation.index = index;
    return navigation;
  }

  static byExternalLinks(icon: string, name: string, link: string) {
    const navigation = new MenuNavigationItem();
    navigation.icon = icon;
    navigation.name = name;
    navigation.link = link;
    return navigation;
  }
}

export const NAVIGATION_HOME = MenuNavigationItem.byRouter(
  "mdi-home",
  "Home",
  pageHome,
  0
);
export const NAVIGATION_COLLECTION = MenuNavigationItem.byRouter(
  "mdi-package",
  "Collection",
  pageCollection,
  1
);
export const NAVIGATION_SPEC = MenuNavigationItem.byRouter(
  "mdi-file-document",
  "Specification",
  pageSpec,
  2
);
export const NAVIGATION_LOGBOOK = MenuNavigationItem.byRouter(
  "mdi-chart-box",
  "Logbook",
  pageLogbook,
  3
);
export const NAVIGATION_AIRPORT = MenuNavigationItem.byRouter(
  "mdi-airplane-takeoff",
  "Airport",
  pageAirport,
  3
);
export const NAVIGATION_ABOUT = MenuNavigationItem.byRouter(
  "mdi-information",
  "About",
  pageAbout,
  5
);
export const NAVIGATION_GITHUB = MenuNavigationItem.byExternalLinks(
  "mdi-github",
  "Github",
  "https://github.com/WindSekirun/FlightDiary"
);

export const NAVIGATION_PRIMARY = [
  NAVIGATION_HOME,
  NAVIGATION_COLLECTION,
  NAVIGATION_SPEC,
  NAVIGATION_LOGBOOK,
  NAVIGATION_AIRPORT,
  NAVIGATION_ABOUT
];

export const NAVIGATION_SECONDARY = [NAVIGATION_GITHUB];
