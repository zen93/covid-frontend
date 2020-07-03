import config from '../config'
import store from '../store/index'

const BASE_URL = config.BASE_URL

class Covid {
  handleHTTPError (response) {
    if (response.ok) { return response }
    throw Error(response.message)
  }

  getCountries () {
    return fetch(`${BASE_URL}/countries`)
      .then(this.handleHTTPError)
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch((err) => {
        store.commit('setStatus', 'Error: ' + err)
      })
  }

  getEstimate (estimateCountry, sourceCountries) {
    const sources = sourceCountries.map(a => a.slug.trim()).join(',')
    return fetch(`${BASE_URL}/?estimate=${estimateCountry}&source=${sources}`)
      .then(this.handleHTTPError)
      .then(response => response.json())
      .then(data => {
        // if (data.Response == 'False') {
        //   store.commit('setStatus', 'Failed to load data. ' + data.Error)
        // }
        // if (data.Response == 'True') {
        //   store.commit('setStatus', '')
        // }
        return data
      })
      .catch((err) => {
        store.commit('setStatus', 'Error: ' + err)
      })
  }
}

const covid = new Covid()

export default covid
