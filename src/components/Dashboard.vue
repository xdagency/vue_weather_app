<template>
  
  <h1>DASHBOARD</h1>

  <label for="">{{ copy.LABEL_LOCATION }}</label>
  <h2>SEARCH BAR</h2>

  <h2>{{ weather.weather[0].description }}</h2>
  <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" :alt="weather.weather[0].description" title="Weather Icon">

  <p>Weather Description</p>

  <h3>TEMPURATURE</h3>

</template>

<script>
export default {
  name: 'Dashboard',
  props: ['copy', 'weather']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  

</style>
