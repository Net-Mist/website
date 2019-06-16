<template>
  <svg :class="class_name" width="640px" height="480px">
    <image :id="image_id" :href="href" x="0" y="0" height="480px" width="640px"></image>
  </svg>
</template>

<script>
const d3 = require("d3");
export default {
  name: "points",
  props: {
    class_name: String,
    href: String, // href of the image showing in the svg
    drawable: Boolean // if true then update the points linked to drawable_name
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    image_id: function(){
      return this.class_name + "_image"
    }
  },
  mounted() {
    let vm = this; // Vue instance
    let svg = d3.select("svg." + vm.class_name);
    let g = svg.append("g");

    // svg.call(
      // d3.zoom().on("zoom", function() {
        // svg.attr("transform", d3.event.transform);
      // })
    // );

    svg.on("mouseup", function() {
      let currentPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];
      // Draw the new point
      g.append("circle")
        .attr("cx", currentPoint[0])
        .attr("cy", currentPoint[1])
        .attr("r", 4)
        .attr("fill", "yellow")
        .attr("stroke", "#000")
        .attr("is-handle", "true")
        .attr("cursor", "move")
        .call(d3.drag().on("drag", handleDrag));
    });

    function handleDrag() {
      d3.select(this)
        .attr("cx", d3.event.x)
        .attr("cy", d3.event.y);
    }

    // be sure the image is not draggable
    document.getElementById(vm.image_id).ondragstart = function() {
      return false;
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>