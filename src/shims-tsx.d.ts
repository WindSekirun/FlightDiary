import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
declare module "vue-router" {
  interface Next<T extends Vue = Vue> {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (to?: (vm: T) => any): void;
  }
}