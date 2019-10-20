<template lang="pug">
  div.markdown-body
    :markdown-it
      # AI Demo
      Some times ago, I built some demos for a friend making an exhibition to promote AI. These are four classic computer vision applications that I've packaged 
      to make them easy to setup. As all this work is open-source, I've chosen to share in this article the details of my work, to help other people to 
      setup and run these demo.

      These demos are:
      - an example of style-transfer running in real-time, trained on Picasso painting,
      - an object detection algorithm also running in real-time,
      - GauGAN, a NVIDIA algorithm to paint a picture from a drawing,
      - an open-source and on-premise version of Google Quick Draw game.

      All these demo runs inside docker. The source codes are on Github and the pre-build docker images on Dockerhub.

      ## Style transfer
      This demo is the one I'm the most proud because everything here is my work: writing the algorithm to train the neural network, training it
      and making the webapp to display the results.

      I've started working on it for the Devpost challenge: [#PoweredByTF 2.0](https://tensorflow.devpost.com/), and since then I have continued to improve it.

      Style transfer is the process of analyzing the style of an image or a collection of images, and applying this style to another image. The goal is to 
      transform a picture to an image with the same content, but with another style, for instance the style of Picasso.
      In this demo, we apply in real-time the style from Picasso to the video feed coming from the camera.

      To train the model I used a Generative Adversarial Network (or GAN) following the paper "adaptive style transfer". A first neural network, the generator, 
      take as input a picture and transforms it to a Picasso painting. A second neural network (the discriminator) take as input this transformed image
      and try to predict if this
      image is a true Picasso painting. The generator trys to trick the discriminator and the discriminator trys to stay efficient at recognizing which picture are real Picasso painting. 
      These two models are trained
      together, and so are improving together.

      During the first iterations, the generator drew some random noise. After some iterations, it generated more recognizable output and after many iterations
      the results looked a lot like Picasso painting. 

      ![style_transfer](aidemo/style_transfer.svg)

      This demo works in realtime if you have a Nvidia GPU (tested with gtx1070). You also need a 
      webcam connected to the computer that you can access through `/dev/video0` for instance.

      * start the demo: `docker run -it --rm --runtime=nvidia -d /dev/video0 -p 80:8080 -e PROCESSED_HEIGHT=768 -e PROCESSED_WIDTH=1024 netmist/style_transfer_webapp:0.1`
      * github: [https://github.com/Net-Mist/style-transfer-tf2](https://github.com/Net-Mist/style-transfer-tf2)
      * Research paper: [https://arxiv.org/abs/1807.10201](https://arxiv.org/abs/1807.10201)

      ## Object recognition
      When working on computer vision tasks, we often need to find instances of an object in an image. Using an object recognition neural network is one way
      to handle this problem. 

      Object recognition is the task of recognizing all the objects in an image. This algorithm output a list of bounding boxes surrounding all the objects, 
      followed by a classification.

      | ![object_detection](aidemo/kites_detections_output.jpg) |
      |:--:| 
      | *Image from [TensorFlow object detection](https://github.com/tensorflow/models/tree/master/research/object_detection)* |

      For this demo, I dowloaded one model from the [Tensorflow object detection zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md)
      and built a webapp to do realtime inference.

      As for style transfer demo, you will need a nvidia GPU (tested with gtx1070) and a webcam to run this demo.

      * start the demo: `docker run -it --rm --runtime=nvidia -d /dev/video0 -p 80:8080 netmist/object_detection:0.1`
      * github: [https://github.com/Net-Mist/demo_object_detection](https://github.com/Net-Mist/demo_object_detection)

      ## GauGAN

      GauGAN is another application of Generative Adversarial Networks. The generator takes as input a simple drawing, where colors encode 
      the texture and trys to generate a picture from this information.
      The discriminator trys to make the difference between this generated picture and pictures in a database. 

      ![gaugan](aidemo/gaugan.png)

      * start the démo: `docker run -it --rm -p 80:80 netmist/spade:2.0`
      * github : [https://github.com/Net-Mist/smart-sketch](https://github.com/Net-Mist/smart-sketch)
      * fork from : [https://github.com/noyoshi/smart-sketch](https://github.com/noyoshi/smart-sketch)
      * Original NVIDIA work : [https://github.com/NVlabs/SPADE/](https://github.com/NVlabs/SPADE/)
      * Research paper : [https://arxiv.org/abs/1903.07291](https://arxiv.org/abs/1903.07291)

      ## Quick draw
      This is a game designed by google. Can an IA recognize an object drew by a human?
      The classification model used here was train on a dataset released by Google, gather from the images drew by all the 
      players.

      ![sketcher](aidemo/sketcher.png)
      * start the demo: `docker run -it --rm -p 80:80 netmist/sketcher:2.0`
      * github : [https://github.com/zaidalyafeai/zaidalyafeai.github.io](https://github.com/zaidalyafeai/zaidalyafeai.github.io)
      



</template>

<script>
export default {
  mounted() {}
};
</script>