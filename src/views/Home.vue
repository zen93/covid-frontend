<template>
  <div class="home">
    <Navbar />
    <b-container>
      <b-img v-if="!loaded && estimate && !$store.getters['status']" fluid center src="../assets/loading.svg" alt="Loading..."></b-img>
      <b-img v-if="!initialLoad" fluid center src="../assets/loading.svg" alt="Loading..."></b-img>
      <line-chart v-if="loaded && !$store.getters['status']" :chart-data="datacollection" :options="chartOptions"></line-chart>

      <div v-show="initialLoad">
        <p align="center">{{ $store.getters['status'] }}</p>
        <label for="estimateCountry">Predict for Country</label>
        <b-form-select class="mb-2 mb-sm-0" id="estimateCountry" v-model="estimate" :options="selectCountries"></b-form-select>

        <label class="mt-2" for="sourceCountries">Sources for prediction</label>
        <b-form-select class="mb-2 mb-sm-0" id="sourceCountries" v-model="source" :options="selectCountries"></b-form-select>

        <div class="text-center">
          <b-button squared variant="outline-danger" class="mt-2 mb-2" @click="addSource">Add Country to Sources</b-button>
        </div>
        <b-alert v-model="showStatus" variant="danger" dismissible>
          {{ status }}
        </b-alert>
      </div>

      <h3>
        <b-badge
          v-for="(country, index) in sources"
          :key="index"
          variant="danger"
          class="mx-1"
        >
          {{ country.country }}
          <span id="closeBtn" @click="deleteSource(country.slug)">
            &times;
          </span>
        </b-badge>
      </h3>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import LineChart from '@/components/LineChart.vue'

import { mapState } from 'vuex'
// import config from '@/config'

export default {
  name: 'Home',
  components: {
    Navbar,
    LineChart
  },
  data: function () {
    return {
      loaded: false,
      initialLoad: false,
      datacollection: null,
      colors: [],
      estimate: null,
      source: null,
      sources: [],
      chartOptions: null,
      status: '',
      showStatus: false
    }
  },
  mounted () {
    // this.fillData()
    this.fetchCountries()
  },
  methods: {
    async fetchCountries () {
      await this.$store.dispatch('country/getCountries')
      this.initialLoad = true
    },
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max))
    },
    getColor (reset = false) {
      const chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(231,233,237)'
      }

      if (reset || this.colors.length === 0) {
        for (const prop in chartColors) { this.colors.push(chartColors[prop]) }
      }
      // if (this.colors.length === 0) return 'rgb(0,0,0)'
      const index = this.getRandomInt(this.colors.length)
      const color = this.colors[index]
      this.colors.splice(index, 1)
      return color
    },
    setChartOptions () {
      this.chartOptions = { // Chart.js options
        title: {
          display: true,
          position: 'top',
          text: ['Total Infected for ' + this.estimate],
          fontColor: '#FFF'
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              value = value.toString()
              value = value.split(/(?=(?:...)*$)/)
              value = value.join(',')
              return data.datasets[tooltipItem.datasetIndex].label + ' : ' + value
            }
          } // end callbacks:
        }, // end tooltips
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
                // Convert the number to a string and split the string every 3 charaters from the end
                value = value.toString()
                value = value.split(/(?=(?:...)*$)/)
                value = value.join(',')
                return value
              },
              fontColor: '#FFF'
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: '#FFF'
            }
          }]
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: 'white'
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    },
    fillDataWithZeros (data) {
      for (let i = 0; i < this.IFRDates.length; i++) {
        const date = this.IFRDates[i]
        if (data.filter(a => a.date === date).length === 0) {
          data.push({
            date,
            cases: 0
          })
        }
      }
      // sort data
      data.sort((a, b) => new Date(a.Date) - new Date(b.Date))
      return data
    },
    async fillData () {
      try {
        this.$store.commit('dataset/reset')

        const sourcesEstimate = this.$store.getters['estimate/sourcesEstimate']

        let color = this.getColor()
        let payload = { label: 'IFR Estimate', color, data: this.IFRCases, slug: 'ifr-estimate' }

        this.$store.dispatch('dataset/setDataset', payload)

        for (const source of sourcesEstimate) {
          color = this.getColor()
          const country = this.$store.getters['country/getCountryBySlug'](source.sourceCountry)

          const sortedData = this.fillDataWithZeros(source.data)
          payload = { label: country.Country, color, data: sortedData.map(a => a.cases), slug: country.Slug }
          this.$store.dispatch('dataset/setDataset', payload)
        }

        this.setChartOptions()
        this.datacollection = {
          labels: this.IFRDates,
          datasets: this.datasets
        }

        this.loaded = true
      } catch (err) {
        console.error(err.stack)
        this.$store.commit('setStatus', err.message)
      }
    },
    deleteSource (slug) {
      this.$store.dispatch('dataset/deleteSource', { slug })
      this.sources = this.sources.filter(a => a.slug !== slug)

      this.datacollection = {
        labels: this.IFRDates,
        datasets: this.datasets
      }
    },
    async addSource () {
      if (this.source && this.estimate) {
        const country = this.$store.getters['country/getCountryBySlug'](this.source)
        if (country) {
          if (this.sources.filter(a => a.slug === country.Slug).length === 0) {
            if (this.sources.length === 5) {
              this.status = 'Cannot add more than 5 countries'
              this.showStatus = true
              return
            }
            this.loaded = false
            this.sources.push({
              slug: country.Slug,
              country: country.Country
            })
            await this.$store.dispatch('estimate/getEstimate', { estimate: this.estimate, sources: this.sources })
            this.fillData()
          } else {
            this.status = 'Cannot add the same source country more than once'
            this.showStatus = true
          }
        } else {
          this.status = 'Invalid country'
          this.showStatus = true
        }
      } else if (!this.estimate) {
        this.status = 'Select an estimate country first under "Predict for country"'
        this.showStatus = true
      }
      this.source = null
    },
    async addEstimate () {
      if (this.estimate) {
        this.loaded = false
        this.$store.commit('setStatus', '')
        this.$store.commit('estimate/reset')
        await this.$store.dispatch('estimate/getEstimate', { estimate: this.estimate, sources: this.sources })
        this.fillData()
      }
    }
  },
  computed: {
    ...mapState('country', ['countries', 'selectCountries']),
    ...mapState('estimate', ['IFRDates', 'IFRCases']),
    ...mapState('dataset', ['datasets'])
  },
  watch: {
    estimate: function () {
      this.addEstimate()
    }
  }
}
</script>

<style scoped>
#closeBtn {
  cursor: pointer;
}
</style>
