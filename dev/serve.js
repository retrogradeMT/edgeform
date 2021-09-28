import Vue from "vue";
import Vuex from "vuex";

import Dev from "./serve.vue";
import vuetify from "./plugins/vuetify.js";
import EdgeForm from "@/entry.js";

Vue.use(Vuex);
const store = new Vuex.Store();
Vue.use(EdgeForm);
Vue.config.productionTip = false;
new Vue({
  store,
  vuetify,
  render: (h) => h(Dev),
}).$mount("#app");
