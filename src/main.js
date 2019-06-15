import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import "github-markdown-css/github-markdown.css";
import 'prismjs/themes/prism-okaidia.css'
import Prism from 'prismjs';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
