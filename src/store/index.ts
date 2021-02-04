import { SAVE_MAIN_LIST, LOAD_MAIN_DATA, SAVE_AIRPORT_MAP } from "@/Constants";
import { Airport } from "@/model/Airport";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export type AirportMap = Record<string, Airport>; // key for ICAO

const store = new Vuex.Store({
  state: {
    itemList: [],
    airportMap: undefined
  },
  mutations: {
    [SAVE_MAIN_LIST](state, value) {
      state.itemList = value;
    },
    [SAVE_AIRPORT_MAP](state, value) {
      const response = value as [string, Airport];
      console.log(response);
      // state.airportMap = value;
    }
  },
  actions: {
    [LOAD_MAIN_DATA]({ commit }) {
      Vue.axios.get("data.json").then((response) => {
        commit(SAVE_MAIN_LIST, response.data);
      });
      Vue.axios.get("airportmap.json").then((response) => {
        commit(SAVE_AIRPORT_MAP, response.data);
      });
    }
  }
});

export default store;
