import {
  SAVE_MAIN_LIST,
  LOAD_MAIN_DATA,
  SAVE_AIRPORT_MAP,
  SAVE_AIRCRAFT,
  LOAD_DETAIL_DATA,
  SAVE_DETAIL_DATA,
  SAVE_DEPARTURE_DATA,
  SAVE_DESTINATION_DATA,
  LOAD_COLLECTION_DATA,
  SAVE_COLLECTION_DATA,
  SAVE_COLLECTION_DETAIL_DATA,
  LOAD_COLLECTION_DETAIL_DATA
} from "@/Constants";
import { AirportDetailItem } from "@/model/airport/AirportDetailItem";
import { Aircraft } from "@/model/list/Aircraft";
import { Airport } from "@/model/list/Airport";
import { ListItem } from "@/model/list/ListItem";
import { Metadata } from "@/model/plan/Metadata";
import { SearchData } from "@/model/SearchData";
import {
  DetailData,
  DETAIL_HEADER_ROUTE
} from "@/model/vo/DetailData";
import Vue from "vue";
import Vuex from "vuex";
import {
  getApproachInformation,
  getFullPlanTitle,
  getPlanRoute,
  getPlanSubtitle,
  getPlanTitle,
  getPlanImageList,
  getWaypointMarker,
  getRouteTable
} from "@/calculator/PlanCalculator";
import { AirportData } from "@/model/vo/AirportData";
import { CollectionDataItem } from "@/model/collection/CollectionDataItem";
import {
  CollectionDetailData,
  CollectionDetailTableContent,
  COLLECTION_DETAIL_TABLE_HEADER
} from "@/model/vo/CollectionDetailData";
import { mergeCollectionWaypoint } from "@/calculator/CollectionCalculator";
import {
  MarkerData,
} from "@/model/vo/MarkerData";

Vue.use(Vuex);

export type AirportMap = Map<string, Airport>; // key for ICAO

export interface StoreState {
  itemList: ListItem[];
  airportList: Airport[];
  aircraftList: Aircraft[];
  detailMetadata: Metadata | undefined;
  detailDeparture: AirportDetailItem | undefined;
  detailDestination: AirportDetailItem | undefined;
  collectionList: CollectionDataItem[];
  collectionDetail: CollectionDetailData | undefined;
}

const state: StoreState = {
  itemList: [],
  airportList: [],
  aircraftList: [],
  detailMetadata: undefined,
  detailDeparture: undefined,
  detailDestination: undefined,
  collectionList: [],
  collectionDetail: undefined
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
    },
    [SAVE_COLLECTION_DATA](state, value) {
      state.collectionList = value;
    },
    [SAVE_COLLECTION_DETAIL_DATA](state, value) {
      state.collectionDetail = value;
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
    },
    async [LOAD_COLLECTION_DATA]({ commit }) {
      const response = await Vue.axios.get("collection.json");
      commit(SAVE_COLLECTION_DATA, response.data);
    },
    async [LOAD_COLLECTION_DETAIL_DATA]({ commit }, data) {
      const id = data.id;
      const response = await Vue.axios.get("collection.json");
      const currentItem: CollectionDataItem = response.data.filter(
        (element: CollectionDataItem) => element.id.includes(id)
      )[0];
      const metadataRequestList = currentItem.flights.map((element) =>
        Vue.axios.get(`data/${element}/metadata.json`)
      );
      return Vue.axios.all(metadataRequestList).then(
        Vue.axios.spread((...responses) => {
          const data = new CollectionDetailData();
          data.item = currentItem;
          data.metadataList = responses.map((element) => element.data);
          data.waypoints = mergeCollectionWaypoint(data.metadataList);
          data.tableHeaders = COLLECTION_DETAIL_TABLE_HEADER;
          data.tableContents = data.metadataList.map(
            (element) => new CollectionDetailTableContent(element)
          );
          const lastIndex = data.waypoints.length - 1;
          data.markers = data.waypoints.map((element, index) =>
            MarkerData.makeByWaypoint(index, lastIndex, element)
          );
          commit(SAVE_COLLECTION_DETAIL_DATA, data);
        })
      );
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
      data.planRoute = getPlanRoute(metadata);
      data.markers = getWaypointMarker(metadata);
      data.headers = DETAIL_HEADER_ROUTE;
      data.contents = getRouteTable(metadata);
      return data;
    },
    getAirportData: (state) => {
      const data = new AirportData();
      data.departure = state.detailDeparture || ({} as AirportDetailItem);
      data.destination = state.detailDestination || ({} as AirportDetailItem);
      return data;
    },
    getCollectionList: (state) => {
      return state.collectionList.reverse();
    }
  }
});

export default store;
