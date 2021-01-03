<template>

  <!-- MASTER -->

  <article :class="'main ' + weather.weather[0].main">

    <h1 class="brand">{{ copy_en.TITLE_MAIN }} <br> <span class="light">{{ copy_jp.TITLE_MAIN }}</span></h1>

    <!-- LOADER -->
    <Loader v-bind:class="loader" />

    <!-- ERROR -->
    <Error v-bind:class="error" v-bind:copy_en="copy_en" v-bind:copy_jp="copy_jp" />

    <!-- SEARCH -->
    <Search v-bind:copy_en="copy_en" v-bind:copy_jp="copy_jp" v-bind:location="location" @new-location="getLocation" />

    <article class="content">

      <!-- DASHBOARD -->
      <Dashboard v-bind:copy_en="copy_en" v-bind:copy_jp="copy_jp" v-bind:weather="weather" />

    </article>

  </article>

</template>

<script>

  import axios from 'axios'
  import Loader from './components/Loader.vue'
  import Dashboard from './components/Dashboard.vue'
  import Search from './components/Search.vue'
  import Error from './components/Error.vue'

  export default {
    name: 'App',

    data() {
      return {
        loader: 'show',
        error: 'hide',
        copy_en: {},
        copy_jp: {},
        weather: {
          clouds: {
            all: 0
          },
          main: {
            feels_like: 0,
            humidity: 0,
            temp: 0,
            temp_max: 0,
            temp_min: 0,
          },
          weather: [
            {
              description: 'Cannot get weather',
              icon: '01d',
              id: 0,
              main: 'Weather'
            }
          ]
        },
        location: 'tokyo',
        time: ''
      }
    },

    components: {
      Loader,
      Dashboard,
      Search,
      Error
    },

    methods: {
      getLocation(location) {

        this.loader = 'show';

        axios.post(`${process.env.VUE_APP_WEATHER_LAMBDA_URL}`, {
            location: location,
            api_key: process.env.VUE_APP_WEATHER_API_KEY
          })
            
            .then(results => {
              // overwrite weather object with new data
              this.weather = results.data;
              return 'hide'
            })

            .then(result => {
              this.loader = result;
              this.error = result;
            })

            .catch(error => {
              // error
              console.log('ERROR:', error);
              this.loader = 'hide';
              this.error = 'show';
              this.weather.weather[0].main = "Thunderstorm";
            });
      }
    },

    mounted() {

      // console.log('enviroment:', process.env.NODE_ENV, 'secret:', process.env.VUE_APP_SECRET);

      axios.all([
          // copydeck
          axios.post(`${process.env.VUE_APP_COPYDECK_LAMBDA_URL}`, {
              id: process.env.VUE_APP_COPYDECK_ID,
              api_key: process.env.VUE_APP_COPYDECK_API_KEY
          }),
          // weather
          axios.post(`${process.env.VUE_APP_WEATHER_LAMBDA_URL}`, { 
              location: this.location,
              api_key: process.env.VUE_APP_WEATHER_API_KEY
          })
        ])

        .then(results => {

          this.copy_en = results[0].data.EN;
          this.copy_jp = results[0].data.JP;
          this.weather = results[1].data;

          return 'hide'

        })

        .then(result => {

          // hide loader and error states
          this.loader = result;
          this.error = result;

        })

        .catch(error => {

          // error
          console.log('ERROR 1:', error);
          this.loader = 'hide';
          this.error = 'show';
          this.weather.weather[0].main = "Thunderstorm";

        });
    }
  }


</script>

<style lang="scss">

  #app {
    font-family: 'Noto Sans SC', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
  }

  body, h1, h2, h3, h4, h5, p {
    padding: 0;
    margin: 0;
    font-weight: 300;
  }

  h1, h2, h3 {
    text-transform: capitalize;
  }

  h3 {
    font-size: 24px;
  }

  p {
    font-size: 19px;
  }

  .light {
    opacity: 0.5;
  }

  h1.brand {
    position: fixed;
    right: 40px;
    top: 40px;
    z-index: 10;
    font-size: 16px;
    text-align: right;
  }

  p + p {
    padding-top: 8px;
  }

  article.main {
    height: 100%;
    height: 100vh;
    padding: 0;
    position: relative;
  }

  article.content {
    padding: 0 24px 40px;
    // max-width: 1280px;
    margin: 0 auto;

    @media screen and (min-width: 720px) {
      padding: 0 96px 40px;
    }
    @media screen and (min-width: 1280px) {
      padding: 0 196px 40px;
    }
    @media screen and (min-width: 1600px) {
      padding: 0 248px 40px;
    }
  }

  .Thunderstorm, .Rain, .Tornado, .Squall { background-color: #122C34; }
  .Drizzle, .Mist, .Clouds { background-color: #94A8B3; }
  .Haze, .Fog, .Snow { background-color: #CFD2CD; }
  .Sand, .Ash { background-color: #646881; }
  .Clear { background-color: #8CD9E3; }


  .Thunderstorm, .Rain, .Tornado, .Sand, .Ash {
    color: #F0F0F0;
    input.search { 
      color: #F0F0F0; 
    }
    ::placeholder {
      color: #F0F0F0;
      opacity: 1;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #F0F0F0;
    }
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: #F0F0F0;
    }
    .data {
      border-top: 1px solid rgba(255,255,255,0.25);
    }
  }

  .Drizzle, .Mist, .Clouds, .Squall, .Haze, .Fog, .Snow, .Clear {
    color: #101010;
    input.search { 
      color: #101010; 
    }
    ::placeholder {
      color: #101010;
      opacity: 1;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #101010;
    }
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: #101010;
    }
    .data {
      border-top: 1px solid rgba(0,0,0,0.25);
    }
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
