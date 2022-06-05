<template>
  <div>
    <div
      class="isolate px-gutter text-center search-form bg-yellow-gradient h-screen overflow-hidden py-74 relative"
      :class="{'search-container gap-6': $route.query.search}"
    >
      <router-link
        to="/"
        class="my-0 mx-auto max-w-288 inline-block"
        :class="{'logo': $route.query.search}">
        <inline-svg :src="require('@/assets/svg/logo.svg')" height="100%" width="100%"/>
      </router-link>
      <h2 class="font-cursive text-center text-20 mt-1.5 tracking-6.4" v-show="!$route.query.search">( ANONG ULAM? )</h2>
      <section class="form-section" :class="{'mt-60': !$route.query.search}">
        <h1 class="text-24 leading-29 text-white mb-gutter" v-show="!$route.query.search">Enter ingredients that you have?</h1>
        <form
          v-if="$route.query.search"
          @submit.prevent="submit"
          class="flex items-center flex-grow-0 justify-end">
          <input
            type="text"
            class="form-search form-input p-18 focus:outline-none border-0 outline-none rounded-14 md:w-1/2 w-full rounded-r-none"
            v-model="search"
            placeholder="e.g. eggs,chicken,corn">
          <button
            class="form-search rounded-14 bg-orange border-0 border-orange text-white rounded-l-none p-18"
          >
            <i class="font-icon lni lni-search-alt"></i>
          </button>
        </form>
        <form
          v-else
          @submit.prevent="submit"
          class="flex items-center flex-wrap gap-4 md:gap-0 justify-center">
          <input
            type="text"
            class="form-input p-18 focus:outline-none border-0 outline-none rounded-14 md:w-1/2 w-full md:rounded-r-none"
            v-model="search"
            placeholder="e.g. eggs,chicken,corn">
          <button
            class="rounded-14 bg-orange border-1 border-orange text-white md:rounded-l-none w-full md:w-auto p-18"
          >
            Find Recipes
          </button>
        </form>
      </section>
      <div ref="plate" class="plate-rotate rotate md:max-w-1140 w-full h-auto" v-if="!this.search">
        <inline-svg :src="require('@/assets/svg/plate.svg')" width="100%"/>
      </div>
    </div>
    <div class="px-gutter text-center">
      <router-view/>
    </div>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'Home',
  components: { InlineSvg },
  data: () => ({
    search: '',
  }),
  watch: {
    ['$route.query.search'](value) {
      this.search = value;
    },
  },
  computed: {
    ...mapState(['recipes']),
  },
  beforeMount() {
    document.body.classList.add('js-loading');

    window.addEventListener('load', this.showPage, false);
  },
  methods: {
    ...mapActions(['searchRecipes', 'getNewRecipes']),
    showPage() {
      document.body.classList.remove('js-loading');
    },
    async submit() {
      this.$router.push({query: {search: this.search}});

      const payload = {
        ingredients: this.search,
      };
      await this.searchRecipes(payload)
    },
  },
}
</script>

<style scoped>
input:placeholder-shown {
  text-overflow: ellipsis;
}
.isolate {
  isolation: isolate;
}
.plate-rotate {
  position: absolute;
  top: 100vh;
  left: 50%;
  z-index: -1;
}

.plate-rotate svg {
  height: auto;
}

.rotate {
  animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  animation-duration: 1s;
  animation-name: plate;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
}

.remove {
  animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  animation-duration: 1s;
  animation-name: plate;
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

.search-form {
  transition: all 1s linear;
}

.logo {
  max-width: 11.2rem !important;
  @apply mx-0 !important;
}

.search-container {
  max-height: 7rem;
  @apply flex items-center py-10 !important;
}

.form-section {
  flex-grow: 1;
}

.form-search {
  @apply text-13 p-10 !important;
}

@keyframes plate {
  from {
    transform: translate(-50%, 0) rotate(180deg);
    top: 100%;
  }
  to {
    transform: translate(-50%, -50%) rotate(0);
    top: 100%;
  }
}
</style>
