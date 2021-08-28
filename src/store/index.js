import { createStore } from 'vuex';
import api from '@/api';

const defaultMeta = {
  from: 0,
  to: 0,
  count: 0,
  _links: {},
};

export default createStore({
  state: {
    recipes: [],
    recipeMeta: {
      from: 0,
      to: 0,
      count: 0,
      _links: {},
    },
    loading: false,
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setRecipesList(state, {value, meta}) {
      state.recipes = value;

      delete meta.hits;
      state.recipeMeta = Object.assign(state.recipeMeta, meta);
    },
    pushRecipesList(state, {value, meta}) {
      state.recipes = [...state.recipes, ...value];

      delete meta.hits;
      state.recipeMeta = Object.assign(state.recipeMeta, meta);
    },
  },
  actions: {
    async searchRecipes({commit}, params) {
      commit('setLoading', true);
      commit('setRecipesList', {value: [], meta: defaultMeta});
      // api search here
      const results = await api('get', '/recipes/v2', params);
      commit('setRecipesList', {value: results.hits, meta: results});
      commit('setLoading', false);
    },
    async getNewRecipes({commit}, endpoint) {
      commit('setLoading', true);
      // api search here
      const results = await api('get', endpoint);
      commit('pushRecipesList', {value: results.hits, meta: results});
      commit('setLoading', false);
    },
  },
})
