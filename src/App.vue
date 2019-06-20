<template lang="pug">
  v-app
    v-toolbar(app)
      v-btn(flat @click="$router.push('/')")
        v-toolbar-title(class="headline text-uppercase")
          span Net-Mist's projects
        
      v-spacer
      v-btn(flat href="https://github.com/Net-Mist" target="_blank")
        span(class="mr-2") github repository

    v-content
      v-container(grid-list-md fluid)
        v-layout(justify-space-around align-space-around row wrap)
          v-flex(xs12 md10)
            router-view(v-if="$route.path=='/'")
            div.js-toc-content(v-if="$route.path!='/'")
              div.js-toc
              router-view

          
    v-footer(inset app)
      span(class="px-3") &copy; Sébastien Iooss {{ new Date().getFullYear() }}
</template>

<script>
import vuejs from "./components/vuejs.vue";
import vscode from "./components/VSCodePug.vue";
import tfcompile from "./components/TFCompile";

export default {
  name: "App",
  computed: {},
  mounted() {
    console.log(this.$route);
  }
};
</script>
<style>
code {
  /* fix vuetify code changes */
  box-shadow: none;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
code::before {
  content: "";
}
code::after {
  content: "";
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
