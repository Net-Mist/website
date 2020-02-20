<template lang="pug">
  div.markdown-body
    :markdown-it
      # Blender for datascience
      For the [TFWorld TF 2.0 Challenge](https://tfworld.devpost.com/) I decided to integrate tensorflow inside Blender, so artist could easely use 
      state-of-the-art neural network technologies inside there projects.

      I started to work to add new compositing nodes for differents deep learning model, like style transfer. First, I will code some generic node able to 
      call a huge set of different code, then when my idea would be fixed, a set of more specific nodes.

      Regarding the generic node, my idea was first to create a "python node" able to call a extern python script. However the drawback of this method is that
      the script would be stateless, meaning that each time the node is run, I need to instanciate tensorflow again.

      My next idea was to create a "grpc node" : a node that call a extern grpc server to perform the computation. In the case of tensorflow, the server could 
      instanciate the model once and then keep it in memory.

      So, lets stat with this implementation :

      ## New compositing node: "grpc node"
      Implementing a new node is quite easy following [blender dev wiki](https://archive.blender.org/wiki/index.php/User:Nazg-gul/WritingNewNode/), or
      looking at some existing [patches](https://github.com/bitsawer/blender-custom-nodes/blob/master/patch/compositor_nodes.diff). 
      Here I will give more details regarding the several parts of the process.

      ### Create DNA structure
      Here our node has only one parameter : the URL of the GRPC server. So the code is simply:
      ```c
      typedef struct NodeGRPC {
        char grpcurl[1024];
      } NodeGRPC;
      ```

      ## Register new node
      - modify BKE_node.h
      ```c
      #define CMP_NODE_GRPC 305
      ```

      - then node.c, add in `registerCompositNodes` function : 
      ```c
      register_node_type_cmp_grpc();
      ```

      - now declare the register function in NOD_composite.h
      ```c
      void register_node_type_cmp_grpc(void);
      ```

      - and implement it in nodes folder. So here we will create a files `node_composite_grpc.c` which contains 
      the implementation of `register_node_type_cmp_grpc` function, but also 2 static variables for defining input and output of the node, and the 
      init function. You can base your code on `node_composite_blur.c` which is quite straitforward.

      ## Define RNA accessors
      - NOD_static_types.h, follow the examples. Here:
      ```c
      DefNode(CompositorNode, CMP_NODE_GRPC, def_cmp_grpc, "GRPC", GRPC, "GRPC Server", "")
      ```
      
      ## Writing tile-based-node
      For this example I created 2 files :
        - source/blender/compositor/nodes/COM_GRPCNode.cpp
        - source/blender/compositor/nodes/COM_GRPCNode.h

      ## Writing Writing tile-based operation
      

      ## Update the python GUI
      in file `release/scripts/startup/nodeitems_builtins.py` add
      ```python
      NodeItem("CompositorNodePython")
      ```



      # Blender for datascience
      Blender is a 3D modelisation open-source tool. The last major release (2.8) introduce a real time render engine, call Eevee.
      Eevee use the same technology as a game engine, and so can be used to generate a dataset without investing in huge computation power for rendering the images. 
      But how well can we train a model on these syntetic data ? 

      Below you will find some experiment I did to answer this question

      ## Experiment 1 : people detection
      to build the simulation I followed [this tutorial](https://www.youtube.com/watch?v=xWq-ZPMhai8). It gives me a crowd simulation.

      TODO add image

      Next step is to generate both an image and a mask. This can be done in the compositing part. The idea is to generate both the images and for each image,
      a black and white mask where the white area maps to real people 

      TODO image of the compositing node system

      ## Experiment 2 : fruit recognition

      Is it possible to train a classification problem using only syntetic data ?

      In this experiment we tried to classify 4 different kind of apples.

      The first step is to create some photo-realist apples. This is quite staitforrward : we need to take 3 pictures of an apple, one on the top, one on the
      left and one on the from, to model one apply and then to apply the 3 images we have.

      ![apple_3D](/blender/apple_model.png)

      then we can apply the textures

      ![apple_with_texture](/blender/apple_texture_1.png) 

      ### 3D model

      ### UV map

      ### texture application

      ![material_node](/blender/material_node.png)


      Next we need to generate a huge amont of images to build the training dataset. For this step we can use bullet, a physical engine for moving the object around
      the scene. We can also increase the noise in the dataset by mouving the camera around and changing the lighting configuration.

      At the end, we generate XXX images per classes. Now we can train the model using this generated dataset as training set a a dataset of real apple for the 
      validation set

      TODO : add tensorflow output.

      As you can see, we can achieve 90% validation score. For a classification between 4 instances it is not greate, but as we didn't have any data to begin with, 
      at the end it is quite interesting and such ethod can probably be used to start a training. Of course we still need to fine-tune the model on a set with images
      of read products.

      ## Fun with no link with datascience

      ![particles](/blender/particles.mp4)

      ![crystal](/blender/untitled.png) 



</template>

<script>
export default {
  mounted() {}
};
</script>