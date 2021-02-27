import {
  pageAbout,
  pageCollection,
  pageHome,
  PageRouter,
  pageSpec
} from "../PageRouter";

export class MenuNavigationItem {
  icon: string;
  name: string;
  routeTo: PageRouter | undefined;
  link: string | undefined;

  static byRouter(icon: string, name: string, routeTo: PageRouter) {
    const navigation = new MenuNavigationItem();
    navigation.icon = icon;
    navigation.name = name;
    navigation.routeTo = routeTo;
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
  pageHome
);
export const NAVIGATION_COLLECTION = MenuNavigationItem.byRouter(
  "mdi-package",
  "Collection",
  pageCollection
);
export const NAVIGATION_SPEC = MenuNavigationItem.byRouter(
  "mdi-file-document",
  "Spec",
  pageSpec
);
export const NAVIGATION_ABOUT = MenuNavigationItem.byRouter(
  "mdi-information",
  "About",
  pageAbout
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
  NAVIGATION_ABOUT
];

export const NAVIGATION_SECONDARY = [NAVIGATION_GITHUB];
