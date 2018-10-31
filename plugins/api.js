import Vue from 'vue';
import axios from 'axios';

Vue.use({
  install: function (Vue, options) {
    Vue.prototype.$api = axios.create({
      baseURL: /*process.env.API_URL ||*/ 'http://localhost:8080',
      headers: {
        //Authorization: 'Bearer {token}'
      }
    })
  }
});