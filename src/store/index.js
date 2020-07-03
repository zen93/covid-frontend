import Vue from 'vue'
import Vuex from 'vuex'

import country from './modules/country'
import estimate from './modules/estimate'
import dataset from './modules/dataset'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: 'Please select a country to estimate total infected.'
  },
  mutations: {
    setStatus (state, status) {
      state.status = status
    }
  },
  getters: {
    status: state => state.status
  },
  actions: {
  },
  modules: {
    country,
    estimate,
    dataset
  }
})
