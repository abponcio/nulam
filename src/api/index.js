import $axios from './axios';

export default (action, endpoint, params = {}) => {
    return $axios[action](endpoint, {params}).then(data => data.data);
};