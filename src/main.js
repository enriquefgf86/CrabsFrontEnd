import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// import "@progress/kendo-ui";
// // import '@progress/kendo-theme-default/dist/all.scss'
// import { Chart, ChartInstaller } from "@progress/kendo-charts-vue-wrapper";

// Vue.use(ChartInstaller);

import loginComponentTag from "./components/LoginComponent.vue";
import signUpComponentTag from "./components/SignUpComponent.vue";
import gameComponentTag from "./components/GameComponent.vue";
import selectedGameComponentTag from "./components/SelectedGameComponent.vue";
import scoreComponentTag from "./components/ScoreComponent.vue";
import graphicComponentTag from "./components/GraphicComponent.vue";

(Vue.config.productionTip = false),
  Vue.component("LoginComponent", loginComponentTag);
Vue.component("SignUpComponent", signUpComponentTag);
Vue.component("GameComponent", gameComponentTag);
Vue.component("SelectedGameComponent", selectedGameComponentTag);
Vue.component("ScoreComponent", scoreComponentTag);
Vue.component("GraphicComponent", graphicComponentTag);
// Vue.component("GraphicComponent", graphicComponetTag);

new Vue({
  router,
  store,
  vuetify,
  // components: {
  //   Chart,
  // },
  render: (h) => h(App),
  // created() {
  //   store.dispatch("scorePlayer");
  // },
}).$mount("#app");
