<template lang="pug">
  div.markdown-body
    :markdown-it
      # AI Demo
      Some times ago, I needed to build some AI demo for a friend making an exhibition. So I've packages some classic AI applications into docker images to
      make the installation easy. Here I share the work I did and the link of the demo, for anyone wanting to play with them.

      ## Style transfer
      This demo is the one I'm the most proud, because everything here is my work: writing the algorithm to train the neural network, training the neural net 
      and making the webapp to display the results.

      Style transfer is the process of analysing the style of an image or a collection of images, and applying this style to another image. In this demo, 
      we apply in real time the style from picasso to the video feed coming from the camera.

      To train the model we use a Generative Adversarial Network (or GAN) following the paper "adaptive style transfer". A first neural network, the generator, take
      as input a picture and transfom it to a picasso painting. A second neural network (the discriminator) take as input images and try to predict if this image is a true picasso
      painting. The generator try to trick the discriminator and the discriminator try to stay efficient at recognising picture. These two models are trained
      together

      TODO image

      ## Object recognition
      Object recognition is the task of recognising all the objects in a image. This algorithm output a list of bounding boxes surounding all the object, 
      followed by a classification.

      TODO image

      ## GauGAN

      GauGAN is another application of Generative Adversarial network. The generator takes as input a simple drawing, where colors encode 
      the type of object there is on the image.
      The discriminator try to make the difference between this image and images in a database. 

      ## Quick draw
      This is a game desined by google. Can a IA recognize a shape drawed by a human ?

      TODO image



</template>

<script>
export default {
  mounted() {}
};
</script>