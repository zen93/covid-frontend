import Vue from 'vue'
import covid from '@/api/covid'

const state = {
  IFREstimate: null,
  sourcesEstimate: [],
  IFRDates: [],
  IFRCases: []
}

const getters = {
  IFREstimate: state => state.IFREstimate,
  sourcesEstimate: state => state.sourcesEstimate,
  IFRDates: state => state.IFREstimate.data.map(a => Vue.moment(a.date).format('Do MMM')),
  IFRCases: state => state.IFREstimate.data.map(a => a.cases)
}

const actions = {
  async getEstimate (context, payload) {
    if (payload.estimate && Array.isArray(payload.sources)) {
      const data = await covid.getEstimate(payload.estimate, payload.sources)
      if (data.message) {
        if (data.message.IFREstimate && data.message.estimateFromSources) {
          if (data.message.IFREstimate.length === 0) {
            context.commit('setStatus', 'No data for this country!', { root: true })
            return
          }
          const IFREstimate = data.message.IFREstimate[0]
          const sourcesEstimate = data.message.estimateFromSources

          context.commit('setIFREstimate', IFREstimate)
          context.commit('setSourcesEstimate', sourcesEstimate)
          context.commit('setIFRCases', context.getters.IFRCases)
          context.commit('setIFRDates', context.getters.IFRDates)
        } else {
          context.commit('setStatus', 'Error in fetching estimate!', { root: true })
        }
      }
    } else {
      context.commit('setStatus', 'Error: Please input an estimate country!', { root: true })
    }
  }
}

const mutations = {
  reset (state) {
    state.IFREstimate = null
    state.sourcesEstimate = []
    state.IFRDates = []
    state.IFRCases = []
  },
  setIFREstimate (state, IFREstimate) {
    state.IFREstimate = IFREstimate
  },
  setSourcesEstimate (state, sourcesEstimate) {
    state.sourcesEstimate = sourcesEstimate
  },
  setIFRDates (state, IFRDates) {
    state.IFRDates = IFRDates
  },
  setIFRCases (state, IFRCases) {
    state.IFRCases = IFRCases
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
