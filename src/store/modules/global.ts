import Vue from "vue";
// https://github.com/championswimmer/vuex-module-decorators
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { ListItem } from "@/model/ListItem";

export interface GlobalStateInterface {
  list: ListItem[];
}

@Module({
  store,
  name: "GlobalState",
  namespaced: true,
  dynamic: true
})
export class GlobalState extends VuexModule implements GlobalStateInterface {
  list: ListItem[] = [];

  @Mutation
  saveList(value: ListItem[]) {
    this.list = value;
  }

  @Action({ commit: "saveList" })
  async loadList() {
    return Vue.axios.get("data.json");
  }

  getList(search: string) {
    return this.list.filter((element) => {
      return (
        element.departure.icao.includes(search) ||
        element.departure.iata.includes(search) ||
        element.destination.icao.includes(search) ||
        element.destination.iata.includes(search)
      );
    });
  }
}

export default getModule(GlobalState);
