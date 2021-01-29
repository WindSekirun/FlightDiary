import { SAVE_LIST, LOAD_LIST } from "@/Constants";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    itemList: []
  },
  mutations: {
    [SAVE_LIST](state, value) {
      state.itemList = value;
    }
  },
  actions: {
    [LOAD_LIST]({ commit }) {
      Vue.axios.get("data.json").then((response) => {
        commit(SAVE_LIST, response.data);
      });
    }
  }
});

export default store;
