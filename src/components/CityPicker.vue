<template>
    
    <article :class="'modal__overlay ' + status" @click="toggleModal('hide')"></article>

    <article :class="'modal modal__cities ' + status">

        <header class="modal__header">
            <button class="btn btn__close" @click="toggleModal('hide')" @keypress.enter="toggleModal('hide')" tabindex="20">{{ copy_en.BUTTON_CLOSE }}</button>
            Choose which <strong>{{ location }}</strong>
        </header>
        
        <section v-for="(city, index) in cityMatches" :key="city.id" class="line__city">
            <a @click="getLocation(city.name + ', ' + city.country)" @keypress.enter="getLocation(city.name + ', ' + city.country)" :ref="'item' + (index + 1)" :tabindex="index + 3">
                <span>
                  {{ city.name }}, 
                  <span v-if="city.state !== ''">{{ city.state }}, </span>
                  {{ city.country }}
                </span>
                <img :src="'https://www.countryflags.io/' + city.country + '/flat/32.png'" :alt="'Country flag for ' + city.country" title="Flag icon">
            </a>
        </section>

    </article>

    <section v-if="cityMatches.length > 1" class="more-locations">
        <button class="btn btn__simple" @click="toggleModal('show')" tabindex="2">
            {{ cityMatches.length }} {{ copy_en.BUTTON_MORE_CITIES }} <span class="light">{{ copy_jp.BUTTON_MORE_CITIES }}</span>
        </button>
    </section>

    <!-- <article :class="'modal ' + status">

        <header>Choose which <strong>{{ location }}</strong></header>
        
        <section v-for="city in cityMatches" :key="city.id" class="line__city">
            <a @click="pickCity(city.name + ', ' + city.country)">
                <span>{{ city.name }}, {{ city.country }}</span>
                <img :src="'https://www.countryflags.io/' + city.country + '/flat/32.png'" :alt="'Country flag for ' + city.country" title="Flag icon">
            </a>
        </section>

    </article> -->

</template>

<script>
export default {
  name: 'CityPicker',
  props: ['copy_en', 'copy_jp', 'cityMatches', 'location'],
  data() {
      return {
          status: 'hide'
      }
  },
  methods: {

    handleKeyDown(e) {
      if (e.code ===  27) {
        this.status = 'hide';
      }
    },

    toggleModal(a) {
        this.status = a;
        const firstItem = this.$refs.item1;
        firstItem.focus();
    },

    getLocation(location) {
        this.status = 'hide';
        this.$emit('new-location', location);
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
}
</script>

<style lang="scss" scoped>

    .btn__simple {
        font: normal 16px/100% 'Noto Sans SC', sans-serif;
        text-decoration: underline;
        padding: 0ch;
    }

    .btn__close {
        font: normal 14px/100% 'Noto Sans SC', sans-serif;
        padding: 0;
        color: #686668;
        position: absolute;
        top: 16px;
        right: 0;
        &:hover {
            color: #313231;
        }
    }

    .more-locations {
        padding: 8px 0 0;
    }

    article.modal {
        background: #fafafa;
        width: 80%;
        max-width: 480px;
        padding: 0 24px 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 20;
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

    .modal__cities {
        z-index: 20;
        height: auto;
        max-height: 290px;
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
        &:hover {
            cursor: pointer;
        }
    }

</style>