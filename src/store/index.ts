import Vue from "vue";
import Vuex from "vuex";
import { GlobalStateInterface } from "./modules/global";

Vue.use(Vuex);
export interface RootState {
  globalState: GlobalStateInterface;
}

export default new Vuex.Store<RootState>({});
