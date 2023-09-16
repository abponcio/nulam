<template>
  <section v-if="$route.query.search" class="mb-40">
    <div class="results-counter flex justify-center mt-20">
      <div class="font-semibold text-24 my-30" v-if="loading || !recipes.length">
        Creating new recipes for you...
      </div>
      <div v-else>
        <button class="rounded-14 bg-orange border-1 border-orange text-white w-full md:w-auto p-18"
          @click="() => submit()">
          Thank you, next!
        </button>
      </div>
    </div>

    <div class="flex justify-center gap-12 mt-30" v-if="loading || !recipes.length">
      <div>
        <Skeleton type="square" size="512" />
      </div>
      <div class="flex gap-12 flex-col">
        <Skeleton size="28" style="width: 20ch" />
        <div class="flex gap-12 flex-col">
          <div class="flex gap-5 flex-col">
            <Skeleton style="width: 30ch" />
            <Skeleton style="width: 30ch" />
            <Skeleton style="width: 30ch" />
            <Skeleton style="width: 30ch" />
          </div>
          <div class="flex gap-5 flex-col">
            <Skeleton style="width: 30ch" />
            <Skeleton style="width: 30ch" />
            <Skeleton style="width: 30ch" />
            <Skeleton style="width: 30ch" />
            <Skeleton style="width: 30ch" />
          </div>
        </div>

      </div>
    </div>
    <div class="flex justify-center gap-12 mt-30" v-else>
      <div>
        <Skeleton type="square" size="512" v-if="!imageLink" />
        <img :src="imageLink" :alt="item.title" loading="lazy" class="rounded object-cover custom-image w-full h-auto"
          v-else>
      </div>
      <div class="flex gap-10 flex-col text-left">
        <h1 class="font-semibold text-24">{{ item.title }}</h1>
        <div class="flex gap-10 flex-col">
          <div class="flex gap-5 flex-col">
            <h1 class="font-semibold text-20 mb-5">Ingredients:</h1>
            <ul>
              <li v-for="(ingredient, index) in item.ingredients" :key="index" style="max-width: 60ch;"
                class="text-16 leading-8">
                {{ ingredient }}
              </li>
            </ul>
          </div>
          <div class="flex gap-6 flex-col text-left">
            <h1 class="font-semibold text-20 mb-8">Steps:</h1>
            <ul>
              <li v-for="(step, index) in item.steps" :key="index" style="max-width: 50ch;" class="mb-12">
                {{ step }}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>

// import RecipeList from '@/components/RecipeList';
import { mapActions, mapState } from 'vuex';
import numeral from 'numeral';
import Skeleton from '../components/Skeleton.vue';

export default {
  name: 'Home',
  data: () => ({
    search: '',
    numeral,
    imageLink: '',
  }),
  async created() {
    this.search = this.$route?.query?.search || '';
    if (this.search) {
      const payload = {
        ingredients: this.search.split(','),
      };
      await this.searchRecipes(payload);
    }

    this.getLink();
  },
  computed: {
    ...mapState(['recipes', 'loading']),
    item() {
      if (!this.recipes.length) return null
      return this.recipes[0];
    },
  },
  methods: {
    ...mapActions(['searchRecipes', 'getRecipeImage', 'setRecipesList']),
    async getLink() {
      if (!this.item) return ''
      this.imageLink = (await this.getRecipeImage(this.item.title)).results;
    },
    async submit() {
      const search = this.$route.query.search.split(',')
      const payload = {
        ingredients: search,
      };

      await this.searchRecipes(payload)
      await this.getLink()
    },
  },
  components: { Skeleton }
}
</script>

<style scoped>
.form-section {
  transition: margin 0.3s linear;
}

.custom-image {
  aspect-ratio: 1;
}
</style>
