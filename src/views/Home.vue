<template>
  <div class="home p-3">
    <section class="mb-8 form-section" :class="{'full-height': !$route.query.search}">
      <h1 class="text-xl mb-2">What ingredients do you have?</h1>
      <form @submit.prevent="submit" class="md:flex md:items-center md:justify-center">
        <input type="search" class="form-input p-3 rounded w-full md:w-1/2 md:rounded-r-none" v-model="search" placeholder="e.g. 2 Eggs, 500grams breast chicken, pasta, ...">
        <button class="rounded border-blue-600 border-1 bg-blue-600 p-3 text-white md:rounded-l-none w-full md:w-auto md:mt-0 mt-2">Find Recipes</button>
      </form>

    </section>

    <section v-if="$route.query.search">
      <div class="results-counter text-left flex justify-between">
        <div class="font-semibold text-xl">
          Found {{recipeMeta.count}} recipes
        </div>
      </div>
      <RecipeList :recipes="recipes" class="flex flex-wrap my-2"/>
    </section>
  </div>
</template>

<script>

import RecipeList from '@/components/RecipeList';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'Home',
  components: {
    RecipeList,
  },
  data: () => ({
    search: '',
  }),
  async created() {
    this.search = this.$route?.query?.search || '';

    if (this.search) {
      const numberOfIngredients = Math.max(this.search.split(',').length, 2);
      const payload = {
        q: this.search,
        ingr: `1-${numberOfIngredients}`
      };

      await this.searchRecipes(payload);
    }
  },
  computed: {
    ...mapState(['recipes', 'recipeMeta']),
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions(['searchRecipes', 'getNewRecipes']),
    async submit() {
      this.$router.push({query: {search: this.search}});

      const numberOfIngredients = Math.max(this.search.split(',').length, 2);
      const payload = {
        q: this.search,
        ingr: `1-${numberOfIngredients}`
      };
      await this.searchRecipes(payload)
    },
    async getNextRecipes() {
      await this.getNewRecipes(this.recipeMeta._links.next.href);
    },
    async handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        await this.getNextRecipes();
      }
    },
  },
}
</script>

<style scoped>
.full-height {
  margin-top: 10rem;
}
.form-section {
  transition: margin 0.3s linear;
}
</style>
