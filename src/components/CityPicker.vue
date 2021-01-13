<template>
    
    <!-- <article :class="'modal__overlay ' + modal"></article>

    <article :class="'modal modal__cities ' + modal">

        <header class="modal__header">Choose which <strong>{{ searchLocation }}</strong></header>
        
        <section v-for="(city, index) in cityMatches" :key="city.id" class="line__city">
            <a @click="getLocation(city.name + ', ' + city.country)" :ref="'item' + (index + 1)" :tabindex="index + 1">
                <span>
                  {{ city.name }}, 
                  <span v-if="city.state !== ''">{{ city.state }}, </span>
                  {{ city.country }}
                </span>
                <img :src="'https://www.countryflags.io/' + city.country + '/flat/32.png'" :alt="'Country flag for ' + city.country" title="Flag icon">
            </a>
        </section>

    </article> -->

    <article :class="'modal ' + status">

        <header>Choose which <strong>{{ location }}</strong></header>
        
        <section v-for="city in cityMatches" :key="city.id" class="line__city">
            <a @click="pickCity(city.name + ', ' + city.country)">
                <span>{{ city.name }}, {{ city.country }}</span>
                <img :src="'https://www.countryflags.io/' + city.country + '/flat/32.png'" :alt="'Country flag for ' + city.country" title="Flag icon">
            </a>
        </section>

    </article>

</template>

<script>
export default {
  name: 'CityPicker',
  props: ['cityMatches', 'location', 'status'],
  methods: {
      pickCity(location) {
          console.log(location);
          this.$emit('new-location', location);
      }
  }
}
</script>

<style lang="scss" scoped>

    article.modal {
        background: #fafafa;
        width: 80%;
        max-width: 480px;
        padding: 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 12;
        border-radius: 6px;
        color: #2f2f2f;

        .line__city {
            border: 1px solid #f0f0f0;
            border-radius: 3px;
            margin-top: 16px;
            font-size: 14px;
            font-weight: 600;

            > a {
                display: flex;
                padding: 8px;
                justify-content: space-between;

                &:hover {
                    cursor: pointer;
                    background: #F1F8F9;
                }

                > img {
                    display: block;
                    width: 24px;
                }
            }
        }
    }

    .modal__overlay {
  position: fixed;
  width: 100%;
  width: 100vw;
  height: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.65;
  z-index: 16;
}

.modal__cities {
  height: auto;
  max-height: 280px;
  overflow-y: scroll;

  .line__city {
    border: 1px solid #f0f0f0;
    border-radius: 3px;
    margin-top: 16px;
    font-size: 14px;
    font-weight: 600;

    > a {
        display: flex;
        padding: 8px;
        justify-content: space-between;

        &:hover {
            cursor: pointer;
            background: #F1F8F9;
        }

        > img {
            display: block;
            width: 24px;
        }
    }
  }
}

</style>