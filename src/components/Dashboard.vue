<template>

    <header class="desc">
      <h3>{{ copy_en.LABEL_TEMP }} <span class="light">{{ copy_jp.LABEL_TEMP }}</span> {{ parseInt(weather.main.temp) }}&#176;</h3>
      <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'" :alt="weather.weather[0].description" class="icon" title="Weather Icon" width="64"> 
      <h3>{{ weather.weather[0].description }}</h3>
    </header>

    <article class="data">

      <p>{{ copy_en.LABEL_FEELS_LIKE }} <span class="light">{{ copy_jp.LABEL_FEELS_LIKE }}</span> {{ parseInt(weather.main.feels_like) }}&#176;</p>

      <p>{{ copy_en.LABEL_TEMP_MAX  }} <span class="light">{{ copy_jp.LABEL_TEMP_MAX }}</span> {{ parseInt(weather.main.temp_max) }}&#176;</p>

      <p>{{ copy_en.LABEL_TEMP_MIN }} <span class="light">{{ copy_jp.LABEL_TEMP_MIN }}</span> {{ parseInt(weather.main.temp_min) }}&#176;</p>

      <p>{{ copy_en.LABEL_HUMIDITY }} <span class="light">{{ copy_jp.LABEL_HUMIDITY }}</span> {{ parseInt(weather.main.humidity) }}%</p>

    </article>

</template>

<script>
export default {
  name: 'Dashboard',
  props: ['copy_en', 'copy_jp', 'weather']
}
</script>

<style lang="scss" scoped>
  
  header.desc {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    :nth-child(1) {
      width: 100%;
    }

    @media screen and (min-width: 640px) {
      .icon {
        padding-left: 3.3%;
      }
      :nth-child(1) {
        width: auto;
      }
    }
  }

  .data {
    padding: 40px 0 0;
    margin: 40px 0 0;
  }

</style>
