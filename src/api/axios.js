import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  params: {
    app_id: process.env.VUE_APP_ENDEMAM_APP_ID,
    app_key: process.env.VUE_APP_ENDEMAM_APP_KEY,
    type: 'public',
  },
});

export default instance;
