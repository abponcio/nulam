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
          Found {{recipes.length}} recipes
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
      const payload = {
        ingredients: this.search,
      };

      await this.searchRecipes(payload);
    }
  },
  computed: {
    ...mapState(['recipes']),
  },
  methods: {
    ...mapActions(['searchRecipes']),
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
.form-section {
  transition: margin 0.3s linear;
}
</style>
