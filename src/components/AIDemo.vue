<template lang="pug">
  div.markdown-body
    :markdown-it
      # AI Demo
      Some times ago, I built some demos for a friend making an exhibition to promote AI. These are four classic computer vision applications that I've packaged 
      to make them easy to setup. As all this work is open-source, I've choose to share in this article the details of my work, to help other peoples to 
      setup and run these demo.

      These demos are:
      - an example of style-transfer running in real time, trained on Picasso painting
      - an object detection algorithm also running in real time
      - GauGAN, a NVIDIA algorithm to paint a picture from a drawing
      - an open-source and on-premise version of Google Quick Draw game.

      All these demo runs inside docker. The sources code are on Github and the pre-build docker images on dockerhub.

      ## Style transfer
      This demo is the one I'm the most proud, because everything here is my work: writing the algorithm to train the neural network, training the neural net 
      and making the webapp to display the results.

      I've started working on it for the Devpost challenge: [#PoweredByTF 2.0](https://tensorflow.devpost.com/), and since then I continued improving it.

      Style transfer is the process of analysing the style of an image or a collection of images, and applying this style to another image. The goal is to 
      transform a picture to an image with the same content but with another style, for instance the style of Picasso.
      In this demo, we apply in real time the style from picasso to the video feed coming from the camera.

      To train the model I used a Generative Adversarial Network (or GAN) following the paper "adaptive style transfer". A first neural network, the generator, 
      take as input a picture and transfom it to a picasso painting. A second neural network (the discriminator) take as input this transformed image
      and try to predict if this
      image is a true picasso painting. The generator try to trick the discriminator and the discriminator try to stay efficient at recognising picture. 
      These two models are trained
      together, and so are improving together.

      During the first iterations, the generator draw some random noise. After some iterations it generate more recognisable output and after many iterations
      the results are quite nice. 

      TODO image

      ## Object recognition
      When working on computer vision tasks, we often need to find instances of an object in a image. Using an object recognition neural network is one way
      to handle this problem. 

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