<template lang="pug">
  v-app
    v-toolbar(app)
      v-btn(flat @click="change_path('main')")
        v-toolbar-title(class="headline text-uppercase")
          span Net-Mist's projects
        
      v-spacer
      v-btn(flat href="https://github.com/Net-Mist" target="_blank")
        span(class="mr-2") github repository

    v-content
      v-container(grid-list-md fluid)
        v-layout(justify-space-around align-space-around row wrap)
          v-flex(xs12 md10 v-if="article === 'main'")
            
            v-timeline
              v-timeline-item(color="indigo" large v-for="article in article_list")
                template(v-slot:opposite) {{article.date}}
                v-card(color="indigo" dark)
                  v-card-title(class="headline") {{article.title}}
                  v-card-text(class="white text--primary")
                    p {{article.summary}}
                    v-btn(color="indigo" class="mx-0" outline @click="change_path(article.component_name)") Read


            </v-timeline>
          </v-flex>
          <v-flex xs12 v-if="article !== 'main'">
              <vuejs v-if="article === 'vuejs'"/>
              <vscode v-if="article === 'vscode'"/>
              <tfcompile v-if="article === 'tfcompile'"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer inset app>
      <span class="px-3">&copy; Sébastien Iooss {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import vuejs from "./components/vuejs.vue";
import vscode from "./components/VSCodePug.vue";
import tfcompile from "./components/TFCompile";

export default {
  name: "App",
  components: { vuejs, vscode, tfcompile },
  methods: {
    change_path(newPath) {
      window.location.href = "#/" + newPath;
      this.article = newPath;
    }
  },
  data() {
    return {
      article: "",
      article_list: [
        {
          title: "Compiling Tensorflow 1 and 2",
          summary: "Some details about how to gain speed by compiling tensorflow.",
          component_name: "tfcompile",
          date: "17 June 2019"
        },
        {
          title: "VSCode",
          summary: "My thoughts after switching to VSCode for work.",
          component_name: "vscode",
          date: "June 2019"
        },
        {
          title: "Javascript for Data Scientist",
          summary: "Sometimes, even data scientists need to do some javascript to build a tool for data labeling or a demo for a client.",
          component_name: "vuejs",
          date: "June 2019"
        },
        
      ]
    };
  },
  computed: {},
  mounted() {
    let article = window.location.hash.substr(2);
    if (article) this.article = article;
    else this.article = "main";

    console.log(this.article);
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
