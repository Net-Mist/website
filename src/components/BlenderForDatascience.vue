<template lang="pug">
  div.markdown-body
    :markdown-it
      # Blender for datascience
      Blender is an open-source 3D modeling tool. The last major release (2.8) introduces a real time render engine, called Eevee.
      Eevee uses the same technology as a game engine, and so can be used to generate a dataset without investing in huge computation power for rendering the images. 
      But how well can we train a model on these synthetic data? 
      Below you will find some experiment I did to answer this question

      ## Experiment 1 : people detection
      to build the simulation I followed [this tutorial](https://www.youtube.com/watch?v=xWq-ZPMhai8). It gives me a crowd simulation.

      TODO add image

      Next step is to generate both an image and a mask. 
      - Go to compositing
      - Click "use node"

      ## Experiment 2 : fruit recognition

      ## Experiment 3 : 



</template>

<script>
export default {
  mounted() {}
};
</script>
