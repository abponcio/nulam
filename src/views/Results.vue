<template>
  <div class="p-3">
    <section class="mb-8 form-section" :class="{'mt-60': !$route.query.search}">
      <form @submit.prevent="submit" class="mt-20 md:flex md:items-center md:justify-center">
        <input type="text" class="form-input p-18 focus:outline-none border-0 outline-none rounded-14 w-full md:w-1/2 md:rounded-r-none" v-model="search" placeholder="e.g. eggs, chicken, corn">
        <button class="rounded-14 bg-orange border-1 border-orange p-18 text-white md:rounded-l-none w-full md:w-auto md:mt-0 mt-2">Find Recipes</button>
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
  name: 'Results',
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
        ingr: `1-${numberOfIngredients + 3}`
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
        ingr: `1-${numberOfIngredients + 3}`
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
.form-section {
  transition: margin 0.3s linear;
}
</style>
