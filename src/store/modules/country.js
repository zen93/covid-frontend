import covid from '@/api/covid'

const state = {
  countries: [],
  selectCountries: []
}

const getters = {
  countries: state => state.countries,
  getCountryBySlug: state => slug => {
    if (slug) { return state.countries.filter((country) => country.Slug === slug)[0] }
    return null
  },
  getCountryByName: state => name => {
    if (name) { return state.countries.filter((country) => country.Country.trim().toLowerCase() === name.trim().toLowerCase())[0] }
    return null
  },
  selectCountries: state => state.selectCountries
}

const actions = {
  async getCountries (context) {
    let countries = await covid.getCountries()
    if (countries.message) {
      if (countries.message.countries) { countries = countries.message.countries } else { context.commit('setStatus', 'Error fetching countries!', { root: true }) }
    }
    countries.sort(function (a, b) {
      var textA = a.Country.toUpperCase()
      var textB = b.Country.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })

    const selectCountries = [{
      value: null,
      text: 'Select country',
      disabled: true
    }]

    for (const country of countries) {
      selectCountries.push({
        value: country.Slug,
        text: country.Country
      })
    }

    context.commit('setCountries', countries)
    context.commit('setSelectCountries', selectCountries)
  }
}

const mutations = {
  setCountries (state, countries) {
    state.countries = countries
  },
  setSelectCountries (state, selectCountries) {
    state.selectCountries = selectCountries
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
