import {
  SAVE_MAIN_LIST,
  LOAD_MAIN_DATA,
  SAVE_AIRPORT_MAP,
  SAVE_AIRCRAFT,
  LOAD_DETAIL_DATA,
  SAVE_DETAIL_DATA,
  SAVE_DEPARTURE_DATA,
  SAVE_DESTINATION_DATA
} from "@/Constants";
import { AirportDetail } from "@/model/airport/AirportDetail";
import { Aircraft } from "@/model/list/Aircraft";
import { Airport } from "@/model/list/Airport";
import { ListItem } from "@/model/list/ListItem";
import { Metadata } from "@/model/plan/Metadata";
import { SearchData } from "@/model/SearchData";
import { FlightPlanData } from "@/model/vo/FlightPlanData";
import { DetailData } from "@/model/vo/DetailData";
import Vue from "vue";
import Vuex from "vuex";
import {
  getMapBounds,
  getWaypointMarker,
  getWaypointTuple
} from "@/calculator/LeafletCalculator";
import {
  getApproachInformation,
  getFullPlanTitle,
  getPlanRoute,
  getFlightPlanRouteData,
  getPlanSubtitle,
  getPlanTitle,
  getPlanImageList
} from "@/calculator/PlanCalculator";

Vue.use(Vuex);

export type AirportMap = Map<string, Airport>; // key for ICAO

export interface StoreState {
  itemList: ListItem[];
  airportList: Airport[];
  aircraftList: Aircraft[];
  detailMetadata: Metadata | undefined;
  detailDeparture: AirportDetail | undefined;
  detailDestination: AirportDetail | undefined;
}

const state: StoreState = {
  itemList: [],
  airportList: [],
  aircraftList: [],
  detailMetadata: undefined,
  detailDeparture: undefined,
  detailDestination: undefined
};

const store = new Vuex.Store({
  state: state,
  mutations: {
    [SAVE_MAIN_LIST](state, value) {
      state.itemList = value;
    },
    [SAVE_AIRPORT_MAP](state, value) {
      state.airportList = Object.values(value);
    },
    [SAVE_AIRCRAFT](state, value) {
      state.aircraftList = value;
    },
    [SAVE_DETAIL_DATA](state, value) {
      state.detailMetadata = value;
    },
    [SAVE_DEPARTURE_DATA](state, value) {
      state.detailDeparture = value;
    },
    [SAVE_DESTINATION_DATA](state, value) {
      state.detailDestination = value;
    }
  },
  actions: {
    [LOAD_MAIN_DATA]({ commit }) {
      const data = Vue.axios.get("data.json");
      const airportMap = Vue.axios.get("airportmap.json");
      const aircraft = Vue.axios.get("aircraft.json");

      return Vue.axios
        .all([data, airportMap, aircraft])
        .then(
          Vue.axios.spread((...responses) => {
            commit(SAVE_MAIN_LIST, responses[0].data);
            commit(SAVE_AIRPORT_MAP, responses[1].data);
            commit(SAVE_AIRCRAFT, responses[2].data);
          })
        )
        .catch((errors) => {
          console.log(errors);
          console.log("Can't log main information");
        });
    },
    [LOAD_DETAIL_DATA]({ commit }, data) {
      const id = data.id;
      const departureIcao = data.airport.slice(0, 4);
      const destinationIcao = data.airport.slice(4);

      const metadata = Vue.axios.get(`data/${id}/metadata.json`);
      const departure = Vue.axios.get(`data/airport/${departureIcao}.json`);
      const destination = Vue.axios.get(`data/airport/${destinationIcao}.json`);

      return Vue.axios
        .all([metadata, departure, destination])
        .then(
          Vue.axios.spread((...responses) => {
            commit(SAVE_DETAIL_DATA, responses[0].data);
            commit(SAVE_DEPARTURE_DATA, responses[1].data);
            commit(SAVE_DESTINATION_DATA, responses[2].data);
          })
        )
        .catch((errors) => {
          console.log(errors);
          console.log("Can't log metadata information");
        });
    }
  },
  getters: {
    // from Home.vue
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
        })
        .reverse();
    },
    getDetailData: (state) => {
      const data = new DetailData();
      const metadata = state.detailMetadata || ({} as Metadata);
      data.planTitle = getPlanTitle(metadata);
      data.planSubtitle = getPlanSubtitle(metadata);
      data.imageList = getPlanImageList(metadata);
      data.approachTitle = getApproachInformation(metadata);
      data.fullPlanTitle = getFullPlanTitle(metadata);
      return data;
    },
    getFlightPlanData: (state) => {
      const data = new FlightPlanData();
      const metadata = state.detailMetadata || ({} as Metadata);
      data.planTitle = getPlanTitle(metadata);
      data.bounds = getMapBounds(metadata);
      data.latLngs = getWaypointTuple(metadata);
      data.planRoute = getPlanRoute(metadata);
      data.markers = getWaypointMarker(metadata);
      return data;
    },
    getFlightPlanRouteData: (state) => {
      const metadata = state.detailMetadata || ({} as Metadata);
      return getFlightPlanRouteData(metadata);
    }
  }
});

export default store;
