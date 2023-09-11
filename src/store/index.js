import { createStore } from 'vuex';
import api from '@/api';

export default createStore({
  state: {
    meta: {
      number: 50,
    },
    loading: false,
    recipeLoading: false,
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setRecipeLoading(state, value) {
      state.recipeLoading = value;
    },
    setRecipesList(state, results) {
      state.recipes = results;
    },
    getRecipeInfo(state, result) {
      const recipeIndex = state.recipes.findIndex(recipe => recipe.id === result.id);

      if (recipeIndex > -1) {
        Object.assign(state.recipes[recipeIndex], result);
      }
    },
  },
  actions: {
    async searchRecipes({ commit }, params) {
      commit('setLoading', true);
      commit('setRecipesList', []);

      // api search here
      try {
        const results = await api('get', '/generate-recipes', { ingredients: params.ingredients.join(',') });
        commit('setRecipesList', results.results);
      }
      finally {
        commit('setLoading', false);
      }
    },
    async getRecipeInformation({ commit }, id) {
      commit('setRecipeLoading', true);

      // api search here
      const results = await api('get', `/recipes/${id}/information`, { includeNutrition: false });

      commit('getRecipeInfo', results);
      commit('setRecipeLoading', false);
    },
  },
})
