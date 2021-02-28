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
  LOAD_COLLECTION_DETAIL_DATA,
  SAVE_AIRPORT_DETAIL_DATA,
  LOAD_AIRPORT_DETAIL_DATA,
  SAVE_REVISION,
  LOAD_REVISION
} from "@/Constants";
import { AirportDetailItem } from "@/model/airport/AirportDetailItem";
import { Aircraft } from "@/model/list/Aircraft";
import { Airport } from "@/model/list/Airport";
import { ListItem } from "@/model/list/ListItem";
import { Metadata } from "@/model/plan/Metadata";
import { SearchData } from "@/model/SearchData";
import { DetailData, DETAIL_HEADER_ROUTE } from "@/model/vo/DetailData";
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
  getRouteTable,
  getPlanElevation
} from "@/calculator/PlanCalculator";
import { AirportData } from "@/model/vo/AirportData";
import { CollectionDataItem } from "@/model/collection/CollectionDataItem";
import {
  CollectionDetailData,
  CollectionDetailTableContent,
  COLLECTION_DETAIL_TABLE_HEADER
} from "@/model/vo/CollectionDetailData";
import { mergeCollectionWaypoint } from "@/calculator/CollectionCalculator";
import { MarkerData } from "@/model/vo/MarkerData";
import { PaginationData } from "@/model/vo/PaginationData";
import { parseLogbook } from "@/calculator/LogbookCalculator";

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
  airportDetailItem: AirportDetailItem | undefined;
  revision: string;
}

const state: StoreState = {
  itemList: [],
  airportList: [],
  aircraftList: [],
  detailMetadata: undefined,
  detailDeparture: undefined,
  detailDestination: undefined,
  collectionList: [],
  collectionDetail: undefined,
  airportDetailItem: undefined,
  revision: ""
};

const store = new Vuex.Store({
  state: state,
  mutations: {
    [SAVE_MAIN_LIST](state: StoreState, value: ListItem[]) {
      state.itemList = value;
    },
    [SAVE_AIRPORT_MAP](state: StoreState, value: Airport[]) {
      state.airportList = Object.values(value);
    },
    [SAVE_AIRCRAFT](state: StoreState, value: Aircraft[]) {
      state.aircraftList = value;
    },
    [SAVE_DETAIL_DATA](state: StoreState, value: Metadata) {
      state.detailMetadata = value;
    },
    [SAVE_DEPARTURE_DATA](state: StoreState, value: AirportDetailItem) {
      state.detailDeparture = value;
    },
    [SAVE_DESTINATION_DATA](state: StoreState, value: AirportDetailItem) {
      state.detailDestination = value;
    },
    [SAVE_COLLECTION_DATA](state: StoreState, value: CollectionDataItem[]) {
      state.collectionList = value;
    },
    [SAVE_COLLECTION_DETAIL_DATA](
      state: StoreState,
      value: CollectionDetailData
    ) {
      state.collectionDetail = value;
    },
    [SAVE_AIRPORT_DETAIL_DATA](state: StoreState, value: AirportDetailItem) {
      state.airportDetailItem = value;
    },
    [SAVE_REVISION](state: StoreState, value: string) {
      state.revision = value;
    }
  },
  actions: {
    [LOAD_MAIN_DATA]({ commit }) {
      const data = Vue.axios.get("data.json");
      const airportMap = Vue.axios.get("airportmap.json");
      const aircraft = Vue.axios.get("aircraft.json");

      return Vue.axios.all([data, airportMap, aircraft]).then(
        Vue.axios.spread((...responses) => {
          commit(SAVE_MAIN_LIST, responses[0].data);
          commit(SAVE_AIRPORT_MAP, responses[1].data);
          commit(SAVE_AIRCRAFT, responses[2].data);
        })
      );
    },
    [LOAD_DETAIL_DATA]({ commit }, data) {
      const id = data.id;
      const departureIcao = data.airport.slice(0, 4);
      const destinationIcao = data.airport.slice(4);

      const metadata = Vue.axios.get(`data/${id}/metadata.json`);
      const departure = Vue.axios.get(`data/airport/${departureIcao}.json`);
      const destination = Vue.axios.get(`data/airport/${destinationIcao}.json`);

      return Vue.axios.all([metadata, departure, destination]).then(
        Vue.axios.spread((...responses) => {
          commit(SAVE_DETAIL_DATA, responses[0].data);
          commit(SAVE_DEPARTURE_DATA, responses[1].data);
          commit(SAVE_DESTINATION_DATA, responses[2].data);
        })
      );
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
    },
    async [LOAD_AIRPORT_DETAIL_DATA]({ commit }, data) {
      const response = await Vue.axios.get(`data/airport/${data.airport}.json`);
      commit(SAVE_AIRPORT_DETAIL_DATA, response.data);
    },
    async [LOAD_REVISION]({ commit }) {
      const response = await Vue.axios.get(
        "https://api.github.com/repos/WindSekirun/FlightDiary/releases/latest"
      );
      commit(SAVE_REVISION, response.data.tag_name);
    }
  },
  getters: {
    // from Home.vue
    getMainList: (state: StoreState) => (searchData: SearchData) => {
      const searchByDeparture =
        searchData.departure != "" && searchData.departure != null;
      const searchByDestination =
        searchData.destination != "" && searchData.destination != null;
      const searchByAircraft =
        searchData.aircraft != "" && searchData.aircraft != null;

      const filtered: ListItem[] = state.itemList
        .filter((element: ListItem) => {
          return (
            !searchByDeparture ||
            element.departure.icao.includes(searchData.departure || "")
          );
        })
        .filter((element: ListItem) => {
          return (
            !searchByDestination ||
            element.destination.icao.includes(searchData.destination || "")
          );
        })
        .filter((element: ListItem) => {
          return (
            !searchByAircraft ||
            element.aircraft.includes(searchData.aircraft || "")
          );
        })
        .reverse();

      const data = new PaginationData();
      const startIndex = searchData.page * 6;
      const endIndex = startIndex + 6;
      data.data = filtered.slice(startIndex, endIndex);
      data.itemCount = filtered.length;
      data.pageLength = Math.ceil(data.itemCount / 6);
      return data;
    },
    getCollectionList: (state: StoreState) => (searchData: SearchData) => {
      const filtered = state.collectionList.reverse();
      const data = new PaginationData();
      const startIndex = searchData.page * 6;
      const endIndex = startIndex + 6;
      data.data = filtered.slice(startIndex, endIndex);
      data.itemCount = filtered.length;
      data.pageLength = Math.ceil(data.itemCount / 6);
      return data;
    },
    getDetailData: (state: StoreState) => {
      const data = new DetailData();
      const metadata = state.detailMetadata || ({} as Metadata);
      const elevation = getPlanElevation(metadata);
      data.planTitle = getPlanTitle(metadata);
      data.planSubtitle = getPlanSubtitle(metadata);
      data.imageList = getPlanImageList(metadata);
      data.approachTitle = getApproachInformation(metadata);
      data.fullPlanTitle = getFullPlanTitle(metadata);
      data.planRoute = getPlanRoute(metadata);
      data.markers = getWaypointMarker(metadata);
      data.headers = DETAIL_HEADER_ROUTE;
      data.contents = getRouteTable(metadata);
      data.elevationHeader = elevation[0];
      data.elevationContent = elevation[1];
      return data;
    },
    getAirportData: (state: StoreState) => {
      const data = new AirportData();
      data.departure = state.detailDeparture || ({} as AirportDetailItem);
      data.destination = state.detailDestination || ({} as AirportDetailItem);
      return data;
    },
    getLogbookData: (state: StoreState) => {
      return parseLogbook(
        state.itemList,
        state.airportList,
        state.aircraftList
      );
    }
  }
});

export default store;
