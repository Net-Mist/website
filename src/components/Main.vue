<template lang="pug">
  v-timeline
    v-timeline-item(color="indigo" large v-for="article in article_list")
      template(v-slot:opposite) {{article.date}}
      v-card(color="indigo" dark)
        v-card-title(class="headline") {{article.title}}
        v-card-text(class="white text--primary")
          p {{article.summary}}
          v-btn(color="indigo" class="mx-0" outline @click="$router.push(article.component_name)") Read    
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      article: "",
      article_list: [
        {
          title: "Compiling Tensorflow 1 and 2",
          summary:
            "Some details about how to gain speed by compiling tensorflow.",
          component_name: "tfcompile",
          date: "17 June 2019"
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
          date: "last update September 2019"
        }
      ]
    };
  },
  mounted() {}
};
</script>