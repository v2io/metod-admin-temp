import Vue from 'vue';

Vue.use({
  install: function (Vue, options) {
    Vue.prototype.$route_i18n = function (routeName, locale) {
      return `${routeName}___${locale || this.$i18n.locale}`
    }
  }
});