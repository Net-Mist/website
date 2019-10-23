<template lang="pug">
  div.markdown-body
    :markdown-it
      # AI Demo
      Some times ago, I built some computer vision demos for a friend making an exhibition to promote AI. 
      As all this work is open-source, I've chosen to share in this article the details of my work, to help other people to 
      setup and run these demos.
      Here are four classic applications that I've packaged 
      to make them easy to setup: 
      
      - an example of style-transfer running in real-time, trained on Picasso painting,
      - an object detection algorithm also running in real-time,
      - GauGAN, a NVIDIA algorithm to paint a picture from a drawing,
      - an open-source and on-premise version of Google Quick Draw game.

      All these demo runs inside docker. The source codes are on Github and the pre-build docker images on Dockerhub.

      ## 1. Style transfer
      This demo is the one I'm the most proud because everything here is my own handiwork: writing the algorithm to train the neural network, training it
      and making the webapp to display the results.

      Style transfer is the process of analyzing the style of an image or a collection of images, and applying this style to another image. The goal is to 
      transform a picture to an image with the same content, but with another style, for instance the style of Picasso.
      In this demo, we apply in real-time the style from Picasso to the video feed coming from the camera.


      ![/aidemo/house.svg](/aidemo/house.svg)


      I've started working on it for the Devpost challenge: [#PoweredByTF 2.0](https://tensorflow.devpost.com/), and since then I have continued to improve it.

      
      To train the model I used a Generative Adversarial Network (or GAN) following the paper "adaptive style transfer". A first neural network, the generator, 
      take as input a picture and transforms it to a Picasso painting. A second neural network (the discriminator) take as input this transformed image
      and try to predict if this
      image is a true Picasso painting. 
      The generator tries to trick the discriminator and the discriminator tries to stay efficient at recognizing which pictures are real Picasso painting, hence "adverserial". 
      

      The evolution of the neural network during the training can be tracked on 
      the following image.
      At first (below 2000 iterations), the generator drew some random noise. 
      The output became more recognizable after a while (2000-20000).
      and after many iterations
      the results looked a lot like Picasso's painting. 

      ![style_transfer](aidemo/style_transfer.svg)

      This demo works in realtime if you have a Nvidia GPU (tested with gtx1070). You also need a 
      webcam connected to the computer that you can access through `/dev/video0` for instance.

      * start the demo: `docker run -it --rm --runtime=nvidia -d /dev/video0 -p 80:8080 -e PROCESSED_HEIGHT=768 -e PROCESSED_WIDTH=1024 netmist/style_transfer_webapp:0.1`
      * github: [https://github.com/Net-Mist/style-transfer-tf2](https://github.com/Net-Mist/style-transfer-tf2)
      * Research paper: [https://arxiv.org/abs/1807.10201](https://arxiv.org/abs/1807.10201)

      ## 2. Object recognition
      When working on computer vision tasks, we often need to find objects in an image. 
      Using an object recognition neural network is an efficient way
      to handle this problem. 

      Object recognition is the task of recognizing objects in an image. 
      For convenience's sake, the recognized object can be marked with a bounding box 
      (see image below).

      This algorithm outputs a list of bounding boxes (the boxes in green and yellow in the following image)
       surrounding all the objects, 
      followed by a classification (e.g. person or kite).

      | ![object_detection](aidemo/kites_detections_output.jpg) |
      |:--:| 
      | *Image from [TensorFlow object detection](https://github.com/tensorflow/models/tree/master/research/object_detection)* |

      For this demo, I dowloaded one model from the [Tensorflow object detection zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md)
      and built a webapp to do realtime inference.

      As for style transfer demo, you will need a nvidia GPU (tested with gtx1070) and a webcam to run this demo.

      * start the demo: `docker run -it --rm --runtime=nvidia -d /dev/video0 -p 80:8080 netmist/object_detection:0.1`
      * github: [https://github.com/Net-Mist/demo_object_detection](https://github.com/Net-Mist/demo_object_detection)

      ## 3. GauGAN

      GauGAN is another application of Generative Adversarial Networks. The generator takes as input a simple drawing, where colors encode 
      the texture and generates a photo-realistic picture from this information.
      The discriminator tries to make the difference between this generated picture and real pictures. 

      ![gaugan](aidemo/gaugan.png)

      * start the demo: `docker run -it --rm -p 80:80 netmist/spade:2.0`
      * github : [https://github.com/Net-Mist/smart-sketch](https://github.com/Net-Mist/smart-sketch)
      * fork from : [https://github.com/noyoshi/smart-sketch](https://github.com/noyoshi/smart-sketch)
      * Original NVIDIA work : [https://github.com/NVlabs/SPADE/](https://github.com/NVlabs/SPADE/)
      * Research paper : [https://arxiv.org/abs/1903.07291](https://arxiv.org/abs/1903.07291)

      ## 4. Quick draw
      This is a game designed by google. Can an IA recognize an object drawn by a human?
      The classification model used here was trained on a dataset released by Google, 
      gathered from the images drew by all the players.

      ![sketcher](aidemo/sketcher.png)
      * start the demo: `docker run -it --rm -p 80:80 netmist/sketcher:2.0`
      * github : [https://github.com/zaidalyafeai/zaidalyafeai.github.io](https://github.com/zaidalyafeai/zaidalyafeai.github.io)
      



</template>

<script>
// TODO add images of overfit ?
export default {
  mounted() {}
};
</script>