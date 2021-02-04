import { SAVE_MAIN_LIST, LOAD_MAIN_DATA, SAVE_AIRPORT_MAP } from "@/Constants";
import { Airport } from "@/model/metadata/Airport";
import { ListItem } from "@/model/metadata/ListItem";
import { SearchData } from "@/model/SearchData";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export type AirportMap = Map<string, Airport>; // key for ICAO

const store = new Vuex.Store({
  state: {
    itemList: [],
    airportMap: new Map()
  },
  mutations: {
    [SAVE_MAIN_LIST](state, value) {
      state.itemList = value;
    },
    [SAVE_AIRPORT_MAP](state, value) {
      Object.keys(value).forEach((key) => {
        state.airportMap.set(key, value[key]);
      });
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
  },
  getters: {
    getMainList: (state) => (searchData: SearchData) => {
      const searchByDeparture = searchData.departure != "";
      const searchByDestination = searchData.destination != "";
      const searchByAircraft = searchData.aircraft != "";

      return state.itemList
        .filter((element: ListItem) => {
          return (
            searchByDeparture ||
            element.departure.icao.includes(searchData.departure)
          );
        })
        .filter((element: ListItem) => {
          return (
            searchByDestination ||
            element.destination.icao.includes(searchData.destination)
          );
        })
        .filter((element: ListItem) => {
          return (
            searchByAircraft || element.aircraft.includes(searchData.aircraft)
          );
        });
    },
    airportList: (state) => {
      return Array.from(state.airportMap.keys()).map((key) =>
        state.airportMap.get(key)
      );
    }
  }
});

export default store;
