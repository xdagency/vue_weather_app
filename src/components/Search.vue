<template>

    <form @submit.prevent="onSubmit">

      <figure class="flag">
        <img :src="'https://www.countryflags.io/' + country_code + '/flat/32.png'" :alt="'Country flag for ' + country_code" title="Flag icon">
      </figure>

      <input type="text" name="search" v-model.lazy="searchLocation" class="search" :placeholder="copy_en.PLACEHOLDER_ENTER_CITY + ' ' + copy_jp.PLACEHOLDER_ENTER_CITY">

    </form>

</template>

<script>
export default {
  name: 'Search',
  props: ['location', 'copy_en', 'copy_jp', 'country_code'],
  methods: {
    onSubmit() {
      // console.log(this.searchLocation);
      this.$emit('new-location', this.searchLocation);
    }
  },
  data() {
    return {
      searchLocation: this.location
    }
  }
}
</script>

<style lang="scss" scoped>

form {
  position: relative;
  z-index: 11;
  padding: 104px 0 0;
}

input.search {
  width: 100%;
  padding: 4px 24px;
  font-size: 56px;
  background: none;
  border: none;
  font: 'Noto Sans SC', sans-serif;
  font-weight: 300;
  // border-radius: 10px;
  &:focus {
    background: rgba(255,255,255,0.33);
    outline: none;
  }

  @media screen and (min-width: 720px) {
    padding: 4px calc(96px + 48px);
    font-size: 72px;
  }
  @media screen and (min-width: 1280px) {
    padding: 4px calc(196px + 48px);
  }
  @media screen and (min-width: 1600px) {
    padding: 4px calc(296px + 48px);
  }
}

figure.flag {
  display: none;
  position: absolute;
  left: 96px;
  bottom: 26px;
  padding: 0;
  margin: 0;
  // border: 1px solid red;

  > img {
    display: block;
    margin: 0;
  }

  @media screen and (min-width: 720px) {
    display: block;
  }
  @media screen and (min-width: 1280px) {
    left: 196px;
  }
  @media screen and (min-width: 1600px) {
    left: 296px;
  }

}
  
</style>
