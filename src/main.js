import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVue)
Vue.config.productionTip = false;
{/* <div v-if="querySearch">
        <h3>Resultados...</h3>
      <div v-for="item in items" :key="item.title" class="imgResults">
        <a :href="item.link"><img :src="item.link" :alt="item.title" target="_blank"></a>
        <button @click="getEmployees" class="ImgButton">elegir</button>
      </div>
    </div> */}
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
