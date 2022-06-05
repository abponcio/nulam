<template>
  <section v-if="$route.query.search">
    <div class="results-counter text-left flex justify-between">
      <div class="font-semibold text-15 my-30">
        Found {{numeral(recipes.length).format('0,0')}} recipes
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
    this.$emit('search', this.search);

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
  },
}
</script>

<style scoped>
.form-section {
  transition: margin 0.3s linear;
}
</style>
