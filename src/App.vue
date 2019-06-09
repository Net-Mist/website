<template>
  <v-app>
    <v-toolbar app>
      <v-btn flat @click="change_path('main')">
        <v-toolbar-title class="headline text-uppercase">
          <span>Net-Mist's projects</span>
        </v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/Net-Mist" target="_blank">
        <span class="mr-2">github repository</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container grid-list-md fluid>
        <v-layout justify-space-around align-space-around row wrap>
          <v-flex xs10 v-if="article === 'main'">
            <v-timeline>
              <v-timeline-item key="1" color="indigo" large>
                <template v-slot:opposite>
                  <span>June 2019</span>
                </template>
                <v-card color="indigo" dark>
                  <v-card-title class="headline">VSCode</v-card-title>
                  <v-card-text class="white text--primary">
                    <p>My thoughts after switching to VSCode for work.</p>
                    <v-btn color="indigo" class="mx-0" outline @click="change_path('vscode')">Read</v-btn>
                  </v-card-text>
                </v-card>
              </v-timeline-item>

              <v-timeline-item key="2" color="indigo" large>
                <template v-slot:opposite>
                  <span>June 2019</span>
                </template>
                <v-card color="indigo" dark>
                  <v-card-title class="headline">Javascript for Data Scientist</v-card-title>
                  <v-card-text class="white text--primary">
                    <p>Sometimes, even data scientists need to do some javascript to build a tool for data labeling or a demo for a client.</p>
                    <v-btn color="indigo" class="mx-0" outline @click="change_path('vuejs')">Read</v-btn>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-flex>
          <v-flex xs6 v-if="article !== 'main'">
            <vuejs v-if="article === 'vuejs'"/>
            <vscode v-if="article === 'vscode'"/>
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
import vscode from "./components/VSCode.vue";

export default {
  name: "App",
  components: { vuejs, vscode },
  methods: {
    change_path(newPath) {
      window.location.href = "#/" + newPath;
      this.article = newPath;
    }
  },
  data() {
    return {
      article: ""
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
