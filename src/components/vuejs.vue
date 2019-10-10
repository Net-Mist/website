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
      - _pug_ (previously known as _jade_) for template. Even better with _jstransformer-markdown-it_ for writing web pages in markdown.
      Can be install with `~/.yarn/bin/vue add pug`
      - _prism_ for writing source code in web pages
      - _d3_ for data visualization
      - _vue-cli-plugin-prerender-spa_ (see [it's page](https://www.npmjs.com/package/vue-cli-plugin-prerender-spa)) for prerender the website.
      Usefull for instance for github.io

      ## D3 example
      all these examples are Vue components that can be added to other projects

      ### Points
    
    v-layout(justify-space-around align-space-around row wrap)
      v-flex(xs12)
      points(class_name="points", href="img.jpg" drawable=true)
      v-flex(xs12)
        v-btn(color="indigo" outline @click="update_list_of_points()") Send
        v-btn(color="indigo" outline @click="clear_list_of_points()") Clear
      v-flex(xs12)
        v-data-table(:headers="points_list_header" :items="points")
          template(v-slot:items="props")
            td.text-xs-right {{props.item.x}}
            td.text-xs-right {{props.item.y}} 
    
    h3 Rectangles
    v-layout(justify-space-around align-space-around row wrap)
      v-flex(xs12)
      rectangles(class_name="rectangles", href="img.jpg" drawable=true)
      v-flex(xs12)
        v-btn(color="indigo" outline @click="update_list_of_rectangles()") Send
        v-btn(color="indigo" outline @click="clear_list_of_rectangles()") Clear
      v-flex(xs12)
        v-data-table(:headers="rectangles_list_header" :items="rectangles")
          template(v-slot:items="props")
            td.text-xs-right {{props.item.xMin}}
            td.text-xs-right {{props.item.yMin}} 
            td.text-xs-right {{props.item.xMax}}
            td.text-xs-right {{props.item.yMax}} 
    
</template>

<script>
import points from "./labelme/Points";
import rectangles from "./labelme/Rectangle";
export default {
  name: "vuejs",
  mounted() {
    Prism.highlightAll();
  },
  data() {
    return {
      points: [],
      points_list_header: [
        { text: "x", value: "x" },
        { text: "y", value: "y" }
      ],
      rectangles_list_header: [
        { text: "x min", value: "xMin" },
        { text: "y min", value: "yMin" },
        { text: "x max", value: "xMax" },
        { text: "y max", value: "yMax" }
      ],
      rectangles: []
    };
  },
  components: {
    points,
    rectangles
  },
  methods: {
    update_list_of_points() {
      let element = document.getElementsByClassName("points");
      let circles = element[0].getElementsByTagName("circle");
      let points = [];
      for (let circle of circles) {
        points.push({ x: circle.cx.baseVal.value, y: circle.cy.baseVal.value });
      }
      this.points = points;
    },
    update_list_of_rectangles() {
      let element = document.getElementsByClassName("rectangles");
      let polylines = element[0].getElementsByTagName("polyline");

      let points = [];
      for (let polyline of polylines) {
        points.push({
          xMin: polyline.animatedPoints[0].x,
          yMin: polyline.animatedPoints[0].y,
          xMax: polyline.animatedPoints[2].x,
          yMax: polyline.animatedPoints[2].y
        });
      }
      this.rectangles = points;
    },
    clear_list_of_points() {
      let element = document.getElementsByClassName("points");
      let circles = element[0].getElementsByTagName("circle");
      while (circles.length !== 0) {
        circles[0].parentNode.removeChild(circles[0]);
      }
      this.points = [];
    },
    clear_list_of_rectangles() {
      let element = document.getElementsByClassName("rectangles");
      let circles = element[0].getElementsByTagName("circle");
      while (circles.length !== 0) {
        circles[0].parentNode.removeChild(circles[0]);
      }
      let polylines = element[0].getElementsByTagName("polyline");
      while (polylines.length !== 0) {
        polylines[0].parentNode.removeChild(polylines[0]);
      }
      
      this.rectangles = [];
    }
  }
};
</script>