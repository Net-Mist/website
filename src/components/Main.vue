<template lang="pug">
  v-timeline(:reverse="true")
    v-timeline-item(color="indigo" large v-for="article in article_list")
      template(v-slot:opposite) {{article.date}}
      v-card()
        v-card-title(class="indigo white--text") {{article.title}}
        v-container()
          p {{article.summary}}
          v-btn(color="indigo" class="mx-0" outlined @click="$router.push(article.component_name)") Read    
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      article: "",
      article_list: [
        {
          title: "Compiling Tensorflow 2 for python 3.8",
          summary:
            "Some details about how to gain speed by compiling tensorflow.",
          component_name: "tfcompile",
          date: "22 November 2019"
        },
        {
          title: "AI Demo",
          summary:
            "Here I present some open-source AI Demo I made",
          component_name: "ai_demo",
          date: "October 2019"
        },
        {
          title: "VSCode",
          summary: "My thoughts after switching to VSCode for work.",
          component_name: "vscode",
          date: "June 2019, updated october 2019"
        },
        {
          title: "Javascript for Data Scientist",
          summary:
            "Sometimes, even data scientists need to do some javascript to build a tool for data labeling or a demo for a client.",
          component_name: "javascript",
          date: "June 2019"
        },
        {
          title: "Installing Ubuntu for data science",
          summary:
            "Quick guide to configure Ubuntu to run docker services on GPU.",
          component_name: "ubuntu_install",
          date: "2018, last update September 2019"
        }
      ]
    };
  },
  mounted() {}
};
</script>