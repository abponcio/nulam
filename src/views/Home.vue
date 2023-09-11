<template>
  <section v-if="$route.query.search" class="mb-40">
    <div class="results-counter text-left flex justify-between">
      <div class="font-semibold text-15 my-30" v-if="!loading">
        Found {{ numeral(recipes.length).format('0,0') }} recipes
      </div>
      <div class="font-semibold text-15 my-30" v-else>
        Creating new recipes for you...
      </div>
    </div>
    <RecipeList :recipes="recipes" class="flex flex-wrap my-2" />
  </section>
</template>

<script>

import RecipeList from '@/components/RecipeList';
import { mapActions, mapState } from 'vuex';
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
      const payload = {
        ingredients: this.search.split(','),
      };

      await this.searchRecipes(payload);
    }
  },
  computed: {
    ...mapState(['recipes', 'loading']),
  },
  methods: {
    ...mapActions(['searchRecipes']),
  },
}
</script>

<style scoped>
.form-section {
  transition: margin 0.3s linear;
}
</style>
