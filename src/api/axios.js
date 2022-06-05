import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  params: {
    apiKey: process.env.VUE_APP_SPOONACULAR_APP_KEY,
  },
});

export default instance;
