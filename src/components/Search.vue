<template>

    <form @submit.prevent="onSubmit">

      <input type="text" name="search" v-model.lazy="searchLocation" class="search" :placeholder="copy_en.PLACEHOLDER_ENTER_CITY + ' ' + copy_jp.PLACEHOLDER_ENTER_CITY">

    </form>

</template>

<script>
export default {
  name: 'Search',
  props: ['location', 'copy_en', 'copy_jp'],
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
    padding: 4px 96px;
    font-size: 72px;
  }
  @media screen and (min-width: 1280px) {
    padding: 4px 196px;
  }
  @media screen and (min-width: 1600px) {
    padding: 4px 248px;
  }
}
  
</style>
