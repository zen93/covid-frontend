const state = {
  datasets: []
}

const getters = {
  datasets: state => state.datasets
}

const actions = {
  setDataset (context, payload) {
    if (payload.label && payload.color && Array.isArray(payload.data) && payload.slug) {
      if (payload.slug === 'ifr-estimate') context.dispatch('deleteSource', { slug: payload.slug })
      context.commit('pushDatasets', {
        label: payload.label,
        fill: false,
        borderColor: payload.color,
        pointBackgroundColor: payload.color,
        data: payload.data,
        slug: payload.slug
      })
    } else {
      context.commit('setStatus', 'Error: dataset payload parameters not defined.', { root: true })
    }
  },
  deleteSource (context, payload) {
    let datasets = context.state.datasets
    datasets = datasets.filter(a => a.slug !== payload.slug)
    context.commit('setDatasets', datasets)
  }
}

const mutations = {
  reset (state) {
    state.datasets = []
  },
  setDatasets (state, datasets) {
    state.datasets = datasets
  },
  pushDatasets (state, dataset) {
    state.datasets.push(dataset)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations

}
