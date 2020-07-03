<template>
  <div class="about">
    <Navbar
      currentPage="about"
    />
    <b-container>
      <h1>Frequently Asked Questions</h1>
      <div role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.faq-1 variant="info">What is this site about?</b-button>
          </b-card-header>
          <b-collapse id="faq-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>I'm glad you asked.
                This site is about estimating the true number of people infected with coronavirus (Infected Fatality Rate, IFR) in your country.
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.faq-2 variant="info">How to use this site?</b-button>
          </b-card-header>
          <b-collapse id="faq-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>To get an estimate of the true infected based on serological testing, select your country from the dropdown under "Predict for country".
                The results will show up in a graph as "IFR Estimate". Once you have chosen the estimate country, we can select source countries.
                Source countries are used to estimate the true infected of the estimate country based on the Case Fatality Rate (CFR) of the source country.
                <br><br><strong>Example:</strong> Let us select "India" under "Predict for country". It loads the IFR Estimate. Then we select "Korea (south)" under "Sources for prediction".
                Using the Case Fatality Rate of south korea, we will get a new estimate of the true number of infected in India.
                Usually, this estimate is lower than IFR Estimate but it can be useful to compare real countries' data in this way.
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.faq-3 variant="info">What sources have you used to build this website?</b-button>
          </b-card-header>
          <b-collapse id="faq-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>The number of cases and deaths for all countries is saved from a coronavirus api: <a href="https://api.covid19api.com">https://api.covid19api.com</a>.
                The serological studies percentages are taken from <a href="https://www.bloomberg.com/opinion/articles/2020-04-24/is-coronavirus-worse-than-the-flu-blood-studies-say-yes-by-far">Bloomberg.</a>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.faq-4 variant="info">Why does my country have no data?</b-button>
          </b-card-header>
          <b-collapse id="faq-4" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>We get all our data from the coronavirus api. If they do not provide us with data for your country, we cannot display any information. Sorry for the inconvenience.
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.faq-5 variant="info">Why does it show 0 cases on a particular date?</b-button>
          </b-card-header>
          <b-collapse id="faq-5" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>We have noticed that the coronavirus api has some hiccups. We have left the data as is for now. If the api fixes the error in the data we will update our database.
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'About',
  components: {
    Navbar
  }
}
</script>

<style scoped>
.card-text {
  color: black;
}
.btn-info {
  background-color: #28a745;
  border-color: #28a745;
}
</style>
