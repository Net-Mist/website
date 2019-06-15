<template lang="pug">
  div.markdown-body
    :markdown-it
      # Javascript for Data Scientist
      Most of the time, my work start with a discussion with a client and stop when I deliver a docker image containing some machine learning models with
      an API to use it. But sometimes I need to go one step further and also build a tool use it. Until now I was using some GUI framework like Qt, openCV or
      pygame. But Javascript is a wonderful tool when building app. I've tested 3 frameworks : Angular, React and Vue and decided to go with Vue.
      ## Start a new project
      ### Installation
      #### On ubuntu
      - First you need to install yarn : `sudo apt-get update && sudo apt-get install yarn`
      - Then you can install vue-cli : `yarn global add @vue/cli`

      #### On Archlinux
      - `pacman -S yarn && yarn global add @vue/cli`

      ### Project setup
      ```bash
      ~/.yarn/bin/vue create front
      cd front
      ~/.yarn/bin/vue add vuetify
      yarn add 
      yarn serve
      ```
      
      ### Best packages
      - _axios_ for using web API
      - _pug_ (previously known as _jade_) for template. Even better with _jstransformer-markdown-it_ for writing web pages in markdown
      - _prism_ for writing source code in web pages

</template>

<script>
export default {
  name: "vuejs",
  mounted() {
    Prism.highlightAll();
  }
};
</script>