<template lang="pug">
  div.markdown-body
    :markdown-it
      # Compiling Tensorflow 2 for Python 3.8 with gpu support

      ## Why compiling Tensorflow ?
      Well, there are many reasons. First, the official Tensorflow package is quite conservative. For instance it is not compiled to support recent CPU 
      optimizations like avx2, fma or sse4.2. Futhermore The official docker image also only support python 3.6, but we may want to use 
      new features from python 3.7 or 3.8.

      The understanding of Tensorflow compilation also allow us to enable non-default optimisation and increasing its speed by working with the last
       versions of CUDA, CUDNN, Ubuntu and python3.

      We can also specialised tensorflow for a specific range of GPU cards, to lower the size of the pakage.

      The easiest way to compile TensorFlow is probably by using Docker. The idea is to install the compilation environment inside a docker image, then
      compile tensorflow to generate the python package. Then we can either install this package on a host system or build a new docker image with 
      runtime environment.

      > In the specific case of compiling tensorflow, we can't use docker multi-stage building. Indeed, compiling Tensorflow need gpu access that 
      > docker doesn't have during building (well, for a standard docker installation, at least).

      ## Prerequisites 
      You need to have on your computer:
      - docker
      - nvidia-docker
      - nvidia drivers

      ## Compilation using docker
      All the files to compile tensorflow and build a docker image can be found [here](https://github.com/Net-Mist/tensorflow-compiler)
      To compile tensorflow you just need to run:
      ```bash
      git clone git@github.com:Net-Mist/tensorflow-compiler.git
      cd tensorflow-compiler
      make build
      ```

      this command start by building a docker image called `netmist/tfdevel:0.1` with the compilation environment for tensorflow,
      then compile tensoflow and create a file `tensorflow_pkg/tensorflow-2.0.0-cp38-cp38-linux_x86_64.whl`, a pip wheel that can be installed everywhere and
      finish by building an image `netmist/tensorflow:2.0.0` with a working python3.8 and tensorflow 2 (this image can also be found
      on [dockerhub](https://hub.docker.com/r/netmist/tensorflow/tags)).

      Now, if you want to understand how it works, read the rest of this article.

      ## Prepare the compilation environment
      You can find in tensorflow repository a file named 
      [devel-gpu.Dockerfile](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/dockerfiles/dockerfiles/devel-gpu.Dockerfile)
      which contained everything to compile TensorFlow. It's a good base to start working, but it is possible to change it to fit our need. For instance 
      we can :
      - Change ubuntu version
      - Force python 3, and install the last version of python
      - Only keep TF_CUDA_COMPUTE_CAPABILITIES=6.1,7.0 instead of everything from 3.5 to 7.0. With less options the final package is smaller. 
      To know which compute capabilities to keep you can go to [nvidia website](https://developer.nvidia.com/cuda-gpus) to check.
      - udpate CUDA and CUDNN versions
      - Prepare the compilation by configuring all the environment variables needed by Tensorflow configurator.

      More precessly regarding this last point, to configure the build we need to setup a list of environment variables in the dockerfile.
      The full list of environment variables can be found in this file: [Tensorflow configure.py](https://github.com/tensorflow/tensorflow/blob/master/configure.py)
      I took a look at the options chosen by [Archlinux TensorFlow Package](https://www.archlinux.org/packages/community/x86_64/tensorflow/)
      and start from here.

      When all environment variables are ready, we can configure the build by running
      ```bash
      ./configure
      ```

      And then compile:
      ```markup
      bazel build --config=opt \
            //tensorflow/tools/pip_package:build_pip_package && \
        ./bazel-bin/tensorflow/tools/pip_package/build_pip_package /tensorflow_pkg
      ```


</template>

<script>
import Prism from 'prismjs';
export default {
  name: "tfcompile",
  mounted() {
    Prism.highlightAll();

    // tocbot.refresh();
  }
};
</script>