import Vue from "vue";
import App from "./App.vue";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import vuetify from "@/plugins/vuetify"; // path to vuetify export


Vue.use(Vuesax, {
  // options here
});

Vue.use(require("vue-moment"));

new Vue({
  render: (h) => h(App),
  vuetify,
}).$mount("#app");
