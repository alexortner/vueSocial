import Vue from "vue";
import App from "./App";
import router from "./router";

// Vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import styles
import "tiptap-vuetify/dist/main.css";

const vuetify = new Vuetify({
  lang: {
    // If you change the language here, then it changes in the editor itself
    current: "en" // en | es | fr | pl | ru
  }
});

// you don't need it. this is for example purposes
const iconsGroup = localStorage.getItem("current_icons_group") || "fa";

Vue.use(Vuetify);
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  // "md" (default), "fa", "mdi"
  iconsGroup // same as "iconsGroup: iconsGroup"
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  router,
  vuetify,
  el: "#app",
  components: { App },
  template: "<App/>"
});
