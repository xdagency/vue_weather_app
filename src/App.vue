<template>

  <!-- MASTER -->

  <article :class="'main ' + weather.weather[0].main + '--' + time">

    <h1 class="brand">{{ copy_en.TITLE_MAIN }} <br> <span class="light">{{ copy_jp.TITLE_MAIN }}</span></h1>

    <!-- LOADER -->
    <Loader v-bind:class="loader" />

    <!-- ERROR -->
    <Error v-bind:class="error" v-bind:copy_en="copy_en" v-bind:copy_jp="copy_jp" />

    <!-- SEARCH -->
    <Search v-bind:copy_en="copy_en" v-bind:copy_jp="copy_jp" v-bind:location="location" v-bind:country_code="weather.sys.country" @new-location="getLocation" @multi-locations="multiLocation" />

    <!-- MAP IMAGE -->
    <Map v-bind:location="location" v-bind:lon="weather.coord.lon" v-bind:lat="weather.coord.lat" v-bind:time="time" />

    <article class="content">

      <CityPicker v-bind:copy_en="copy_en" v-bind:copy_jp="copy_jp" v-bind:cityMatches="matchedLocations" v-bind:location="location" @new-location="getLocation" />

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
  import Map from './components/Map.vue'
  import CityPicker from './components/CityPicker.vue'
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
          coord: {
            lon: -74.01,
            lat: 40.71
          },
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
          ],
          sys: {
            country: 'JP'
          }
        },
        location: 'new york',
        matchedLocations: [],
        time: ''
      }
    },

    components: {
      Loader,
      Dashboard,
      Search,
      Map,
      CityPicker,
      Error
    },

    methods: {

      multiLocation(arr) {

        this.matchedLocations = arr;

      },

      getLocation(location) {

        this.loader = 'show';
        this.location = location;

        axios.post(`${process.env.VUE_APP_WEATHER_LAMBDA_URL}`, {
            location: location,
            api_key: process.env.VUE_APP_WEATHER_API_KEY
          })
            
            .then(results => {
              // overwrite weather object with new data
              this.weather = results.data;
              // set day or night
              let mapTheme = "";
              let iconName = results.data.weather[0].icon.split("");
              if (iconName[iconName.length - 1] === "d") {
                this.time = "day";
                mapTheme = "ckjnoh0jp31lx19t84xqj116n";
              } else {
                this.time = "night";
                mapTheme = "ckjnofb9q315s19mx5b83p61z";
              }

              return axios.get(`https://api.mapbox.com/styles/v1/xenodesign/${mapTheme}/static/${this.weather.coord.lon},${this.weather.coord.lat},10/720x560?access_token=pk.eyJ1IjoieGVub2Rlc2lnbiIsImEiOiJja2pqYXF5bGo1Mm15MnNwa3ZvNXZicWo2In0.c2MJSlLShcMEon71nvPzug`);

            })

            .then(result => {

              console.log('MAPBOX: ', result.status);

              return 'hide';

            })

            .then(result => {
              this.loader = result;
              this.error = result;
            })

            .catch(error => {
              // error
              console.log('ERROR B:', error);
              this.loader = 'hide';
              this.error = 'show';
              this.weather.sys.country = "AQ";
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

          // set day or night
          let mapTheme = "";
          let iconName = results[1].data.weather[0].icon.split("");
          if (iconName[iconName.length - 1] === "d") {
            this.time = "day";
            mapTheme = "ckjnoh0jp31lx19t84xqj116n";
          } else {
            this.time = "night";
            mapTheme = "ckjnofb9q315s19mx5b83p61z";
          }

          return axios.get(`https://api.mapbox.com/styles/v1/xenodesign/${mapTheme}/static/${this.weather.coord.lon},${this.weather.coord.lat},10/720x560?access_token=pk.eyJ1IjoieGVub2Rlc2lnbiIsImEiOiJja2pqYXF5bGo1Mm15MnNwa3ZvNXZicWo2In0.c2MJSlLShcMEon71nvPzug`);

        })

        .then(result => {

          console.log('MAPBOX: ', result.status);

          return 'hide';

        })

        .then(result => {

          // hide loader and error states
          this.loader = result;
          this.error = result;

        })

        .catch(error => {

          // error
          console.log('ERROR A:', error);
          this.loader = 'hide';
          this.error = 'show';
          this.weather.weather[0].main = "Thunderstorm";

        });
    }
  }


</script>

<style lang="scss">

  :root {
    --color__black: #212221;
    --color__white: #fefcfe;
    --color__error: #772C3B;
    --color__success: green;
    --color__warn: #251627;

    --color__storm: #122C34;
    --color__storm--light: #1F4D5B;
    --color__snow: #CFD2CD;
    --color__snow--dark: #C0C5BF;
    --color__sunshine: #8CD9E3;
    --color__sunshine--dark: #207883;
    --color__cloudy: #94A8B3;
    --color__cloudy--dark: #556C77;
    --color__ash: #757995;

    --zBottom: 1;
    --zContent: 5;
    --zBelowSearch: 10;
    --zSearch: 15;
    --zAboveSearch: 20;
    --zAboveAll: 99;

    --base: 8px;
  }

  //////////////////////////////
  // MAIN STRUCTURE
  //////////////////////////////

  #app {
    font-family: 'Noto Sans SC', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
  }

  // show or hide
  .show { display: block; }
  .hide { display: none; }

  article.main {
    height: 100%;
    height: 100vh;
    padding: 0;
    position: relative;
  }

  article.content {
    position: relative;
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
      padding: 0 296px 40px;
    }
  }

  article.modal {
      position: absolute;
      z-index: var(--zAboveSearch);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 82%;
      max-width: 480px;
      
      background-color: var(--color__white);
      color: var(--color__black);
      padding: 0 calc(var(--base) * 3) calc(var(--base) * 3);
      border-radius: 6px;

      header.modal__header {
        position: sticky;
        margin: 0;
        padding: calc(var(--base) * 2) 0;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        background-color: var(--color__white);
        border-bottom: 1px solid rgba(0,0,0,0.15);
      }
  }

  .btn {
    padding: 4px 8px;
    border: none;
    background: none;
    &:hover {
      cursor: pointer;
    }
  }


  //////////////////////////////
  // TYPOGRAPHY
  //////////////////////////////

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
    z-index: var(--zContent);
    font-size: 16px;
    text-align: right;
  }

  p + p {
    padding-top: calc(var(--base) * 1);
  }

  

  //////////////////////////////
  // THEMEING
  //////////////////////////////

  .Thunderstorm--night, .Rain--night, .Tornado-night, .Squall--night { 
    background-color: var(--color__storm); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__storm), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__storm), rgba(0,0,0,0) 75%);
    }
  }
  .Thunderstorm--day, .Rain--day, .Tornado-day, .Squall--day { 
    background-color: var(--color__storm--light); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__storm--light), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__storm--light), rgba(0,0,0,0) 75%);
    }
  }
  
  .Drizzle--night, .Mist--night, .Clouds--night { 
    background-color: var(--color__cloudy--dark); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__cloudy--dark), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__cloudy--dark), rgba(0,0,0,0) 75%);
    }
  }
  .Drizzle--day, .Mist--day, .Clouds--day { 
    background-color: var(--color__cloudy); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__cloudy), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__cloudy), rgba(0,0,0,0) 75%);
    }
  }

  .Haze--night, .Fog--night, .Snow--night { 
    background-color: var(--color__snow--dark); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__snow--dark), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__snow--dark), rgba(0,0,0,0) 75%);
    }
  }
  .Haze--day, .Fog--day, .Snow--day { 
    background-color: var(--color__snow);
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__snow), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__snow), rgba(0,0,0,0) 75%);
    }
  }

  .Sand--night, .Ash--night { 
    background-color: var(--color__ash); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__ash), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__ash), rgba(0,0,0,0) 75%);
    }
  }
  .Sand--day, .Ash--day { 
    background-color: var(--color__ash); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__ash), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__ash), rgba(0,0,0,0) 75%);
    }
  }

  .Clear--night { 
    background-color: var(--color__sunshine--dark); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__sunshine--dark), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__sunshine--dark), rgba(0,0,0,0) 75%);
    }
  }
  .Clear--day { 
    background-color: var(--color__sunshine); 
    .map__overlay {
      background: linear-gradient(to bottom, var(--color__sunshine), rgba(0,0,0,0) 75%), 
                  linear-gradient(to right, var(--color__sunshine), rgba(0,0,0,0) 75%);
    }
  }


  .Thunderstorm--night, .Thunderstorm--day, .Rain--night, .Rain--day, .Tornado--night, .Tornado--day, .Sand--night, .Sand--day, .Squall--night, .Squall--day, .Ash--night, .Ash--day, .Clear--night, .Clouds--night {
    color: var(--color__white);
    input.search { 
      color: var(--color__white); 
    }
    ::placeholder {
      color: var(--color__white);
      opacity: 1;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: var(--color__white);
    }
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: var(--color__white);
    }
    .data {
      border-top: 1px solid rgba(255,255,255,0.25);
    }
    .btn__simple {
      color: var(--color__white);
    }
  }

  .Drizzle--day, .Drizzle--night, .Mist--day, .Mist--night, .Clouds--day, .Haze--day, .Haze--night, .Fog--day, .Fog--night, .Snow--day, .Snow--night, .Clear--day {
    color: var(--color__black);
    input.search { 
      color: var(--color__black); 
    }
    ::placeholder {
      color: var(--color__black);
      opacity: 1;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: var(--color__black);
    }
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: var(--color__black);
    }
    .data {
      border-top: 1px solid rgba(0,0,0,0.25);
    }
    .btn__simple {
      color: var(--color__black);
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
