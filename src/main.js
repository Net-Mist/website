import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css'
import "github-markdown-css/github-markdown.css";
import 'prismjs/themes/prism-okaidia.css'
import tocbot from "tocbot"
import App from './App.vue'
import Main from "./components/Main"
import vuejs from "./components/vuejs.vue";
import vscode from "./components/VSCodePug.vue";
// import tfcompile from "./components/TFCompile";
import ubuntu_install from "./components/UbuntuInstall";
import ai_demo from "./components/AIDemo";
import blender from './components/BlenderForDatascience'

tocbot.init({
  // Where to render the table of contents.
  tocSelector: '.js-toc',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.js-toc-content',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h1, h2, h3',
});

Vue.use(VueRouter)
Vue.config.productionTip = false



const routes = [
  { path: "/blender", component: blender},
  { path: '/javascript', component: vuejs },
  // { path: '/tfcompile', component: tfcompile },
  { path: '/vscode', component: vscode },
  { path: '/', component: Main },
  { path: '/ubuntu_install', component: ubuntu_install },
  { path: '/ai_demo', component: ai_demo },
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
