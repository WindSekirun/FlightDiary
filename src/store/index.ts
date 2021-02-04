import {
  SAVE_MAIN_LIST,
  LOAD_MAIN_DATA,
  SAVE_AIRPORT_MAP,
  SAVE_AIRCRAFT
} from "@/Constants";
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
    airportList: [],
    aircraftList: []
  },
  mutations: {
    [SAVE_MAIN_LIST](state, value) {
      state.itemList = value;
    },
    [SAVE_AIRPORT_MAP](state, value) {
      state.airportList = Object.values(value);
    },
    [SAVE_AIRCRAFT](state, value) {
      state.aircraftList = value;
    }
  },
  actions: {
    [LOAD_MAIN_DATA]({ commit }) {
      Vue.axios
        .get("data.json")
        .then((response) => commit(SAVE_MAIN_LIST, response.data));
      Vue.axios
        .get("airportmap.json")
        .then((response) => commit(SAVE_AIRPORT_MAP, response.data));
      Vue.axios
        .get("aircraft.json")
        .then((response) => commit(SAVE_AIRCRAFT, response.data));
    }
  },
  getters: {
    getMainList: (state) => (searchData: SearchData) => {
      const searchByDeparture =
        searchData.departure != "" && searchData.departure != null;
      const searchByDestination =
        searchData.destination != "" && searchData.destination != null;
      const searchByAircraft =
        searchData.aircraft != "" && searchData.aircraft != null;

      return state.itemList
        .filter((element: ListItem) => {
          return (
            !searchByDeparture ||
            element.departure.icao.includes(searchData.departure)
          );
        })
        .filter((element: ListItem) => {
          return (
            !searchByDestination ||
            element.destination.icao.includes(searchData.destination)
          );
        })
        .filter((element: ListItem) => {
          return (
            !searchByAircraft || element.aircraft.includes(searchData.aircraft)
          );
        });
    }
  }
});

export default store;
