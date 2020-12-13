<template>

  <main :class="'main ' + weather.weather[0].main">

    <h1>{{ copy.TITLE_MAIN }}</h1>

    <!-- LOADER -->
    <Loader v-bind:class="loader" />

    <!-- DASHBOARD -->
    <Dashboard v-bind:copy="copy" v-bind:weather="weather" />

  </main>

</template>

<script>

  import axios from 'axios'
  import config from './config'
  import Loader from './components/Loader.vue'
  import Dashboard from './components/Dashboard.vue'

  export default {
    name: 'App',

    data() {
      return {
        loader: 'show',
        copy: {},
        weather: {},
        initialLocation: 'Toronto'
      }
    },

    components: {
      Loader,
      Dashboard
    },

    methods: {
    },

    mounted() {
      axios.all([
          // copydeck api
          axios.get(`${config.COPYDECK_URL}`, { headers: { 'Authorization': 'Bearer ' +  config.COPYDECK_API_KEY }}),
          // weather api
          axios.get(`${config.WEATHER_API_URL}/?q=${this.initialLocation}&appid=${config.WEATHER_API_KEY}&units=metric`)
        ])
        .then(results => {

          // set the results from airtable into copy array
          let copyArray = results[0].data.records;

          // compress what we get back from airtable into simple arrays of KEYS and VALUES
          let compressedCopyArray = copyArray.map(elem => {
            return [elem.fields.Key, elem.fields.EN];
            // return this.copy[elem.fields.Key] = elem.fields.EN;
          });

          // turn the compressed copy array into an object and save to data function
          this.copy = Object.fromEntries(compressedCopyArray);

          // save the weather info into the data weather array
          this.weather = results[1].data;

          return 'hide'

        })
        .then(result => {

          this.loader = result;

        })
        .catch(error => {

          // error
          console.log('ERROR:', error);

        });
    }
  }


</script>

<style>

  body, h1, h2, h3, h4, h5, p {
    padding: 0;
    margin: 0;
  }

  h1, h2, h3 {
    text-transform: capitalize;
  }

  #app {
    font-family: 'Noto Sans SC', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  main.main {
    height: 100%;
    height: 100vh;
    position: relative;
  }

  .Thunderstorm, .Rain, .Tornado {
    background-color: #122C34;
    color: #F0F0F0;
  }

  .Drizzle, .Mist, .Clouds, .Squall {
    background-color: #A9BAC6;
    color: #101010;
  }

  .Haze, .Fog, .Sand, .Ash, .Snow {
    background-color: #CFD2CD;
    color: #101010;
  }

  .Clear {
    background-color: #4EA5D9;
    color: #101010;
  }

  /*

  Thunderstorm
  Drizzle
  Rain
  Snow
  Mist
  Smoke
  Haze
  Dust
  Fog
  Sand
  Ash
  Squall
  Tornado
  Clear
  Clouds

  */

</style>
