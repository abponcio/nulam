<template>
  <section v-if="$route.query.search">
    <div class="results-counter text-left flex justify-between">
      <div class="font-semibold text-15 my-30">
        Found {{numeral(recipeMeta.count).format('0,0')}} recipes
      </div>
    </div>
    <RecipeList :recipes="recipes" class="flex flex-wrap my-2"/>
  </section>
</template>

<script>

import RecipeList from '@/components/RecipeList';
import {mapActions, mapState} from 'vuex';
import numeral from 'numeral';

export default {
  name: 'Home',
  components: {
    RecipeList,
  },
  data: () => ({
    search: '',
    numeral,
  }),
  async created() {
    this.search = this.$route?.query?.search || '';

    if (this.search) {
      const numberOfIngredients = Math.max(this.search.split(',').length, 2);
      const payload = {
        q: this.search,
        ingr: `1-${numberOfIngredients + 1}`
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
