<template lang="pug">
  v-app
    v-app-bar(app)
      v-btn(text @click="$router.push('/')")
        v-toolbar-title(class="headline text-uppercase")
          span Net-Mist's projects
        
      v-spacer
      v-btn(text href="https://github.com/Net-Mist" target="_blank")
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
      span(class="px-3") &copy; Net-Mist {{ new Date().getFullYear() }}
</template>

<script>
export default {
  name: "App",
  computed: {},
  mounted() {
  }
};
</script>
<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
code[class*="language-"]::after {
  content: normal;
}
code[class*="language-"]::before {
  content: normal;
}
.markdown-body code {
  box-shadow: none;
  background: none;
  border: none;
  color: inherit;
  /* font: inherit; */
}

.markdown-body pre code {
  /* fix vuetify code changes */
  box-shadow: none;
  background: none;
  border: none;
  color: inherit;
  /* font: inherit; */
}
/*
code::before {
  content: "";
}

pre[class*="language-"] {
  padding-bottom: 0px;
  border-bottom-width: 0px;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
} */
</style>
