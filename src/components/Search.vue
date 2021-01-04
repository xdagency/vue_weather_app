<template>

    <form @submit.prevent="onSubmit">

      <figure class="flag">
        <img :src="'https://www.countryflags.io/' + country_code + '/flat/32.png'" :alt="'Country flag for ' + country_code" title="Flag icon">
      </figure>

      <input type="search" name="search" v-model.lazy="searchLocation" class="search" id="search" :placeholder="copy_en.PLACEHOLDER_ENTER_CITY + ' ' + copy_jp.PLACEHOLDER_ENTER_CITY">

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
  box-sizing: border-box;
  width: 100%;
  padding: 4px 24px;
  font-size: 56px;
  background: none;
  border: none;
  font: 'Noto Sans SC', sans-serif;
  font-weight: 300;
  // border-radius: 10px;
  &:hover {
    background: rgba(255,255,255,0.1);
  }
  &:focus {
    background: rgba(255,255,255,0.33);
    outline: none;
  }

  &::-webkit-search-cancel-button {
    // position:relative;
    // -webkit-appearance: none;
    // background: red;
    // height: 20px;
    // width: 20px;
    // border-radius:10px;
  }

  @media screen and (min-width: 720px) {
    padding: 4px 96px;
    font-size: 72px;
  }
  @media screen and (min-width: 1280px) {
    padding: 4px 196px;
  }
  @media screen and (min-width: 1600px) {
    padding: 4px 296px;
  }
}

figure.flag {
  display: none;
  position: absolute;
  left: 48px;
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
    left: 148px;
  }
  @media screen and (min-width: 1600px) {
    left: 248px;
  }

}
  
</style>
