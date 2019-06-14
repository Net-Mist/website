import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import "github-markdown-css/github-markdown.css";
import VuePrism from 'vue-prism'
import 'prismjs/themes/prism.css'

Vue.config.productionTip = false

Vue.use(VuePrism)

new Vue({
  render: h => h(App),
}).$mount('#app')
