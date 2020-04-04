<template lang="pug">
  div.markdown-body
    :markdown-it
      # Compiling Tensorflow 1 and 2 with gpu support

      ## Why compiling Tensorflow ?
      Well, there are many reasons.

			 First, the official Tensorflow package is quite conservative. For instance it is not compiled to support recent CPU 
      optimizations like avx2, fma or sse4.2. It also doesn't have intel MKL, which is quite good when using CPU for computation. 
			So, by compiling Tensorflow it is possible to increase its speed.

      Moreover, for the GPU version of Tensorflow, by compiling Tensorflow for a smaller range of GPU card it is possible to save quite a lot of space.

      Finally, it allows us to work with the last versions of CUDA, CUDNN, Ubuntu and python3.

      The easiest way to compile TensorFlow is probably to use Docker. The idea is to install the compilation environment inside a docker image, then
      compile tensorflow to generate the python package. Then we can either install this package on a host system or build a new docker image with 
      runtime environment.

      > In the specific case of compiling tensorflow, we can't use docker multi-stage building. Indeed, compiling Tensorflow needs gpu access that 
      > Docker doesn't have while building.

      ## Prerequisites 
      You need to have on your computer:
      - docker
      - nvidia-docker

      ## Compilation environment
      You can find in the tensorflow repository a file named 
      [devel-gpu.Dockerfile](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/dockerfiles/dockerfiles/devel-gpu.Dockerfile)
      which contains everything to compile TensorFlow. It's a good base to start, but it is possible to change it to fit our need. For instance 
      we can :
      - Update Ubuntu from 16.04 to 18.04 (more recent and with python 3.6)
      - Force python 3
      - Remove ARCH because I work on standard x86_64 computers
      - Only keep TF_CUDA_COMPUTE_CAPABILITIES=6.1,7.0 instead of everything from 3.5 to 7.0. With less options the final package is smaller. 
      To know which compute capabilities to keep you can go to [nvidia website](https://developer.nvidia.com/cuda-gpus) to check.
      - udpate CUDA and CUDNN versions
      - write the command for compiling tensorflow at the end of the file, so a simple docker run will do the compilation

      More precisely regarding this last point,
      first we need to configure the environment variables in the dockerfile:
      ```dockerfile
      ENV     PYTHON_BIN_PATH=/usr/bin/python3
      ENV     USE_DEFAULT_PYTHON_LIB_PATH=1
      ENV     TF_ENABLE_XLA=1
      ENV     TF_NEED_OPENCL_SYCL=0
      ENV     TF_NEED_ROCM=0
      ENV     TF_CUDA_CLANG=0
      ENV     GCC_HOST_COMPILER_PATH=/usr/bin/gcc
      ENV     TF_NEED_MPI=0
      ENV     CC_OPT_FLAGS="-march=native -Wno-sign-compare"
      ENV     TF_SET_ANDROID_WORKSPACE=0
      ```
      To know the list of environment variables to configure, see [Tensorflow configure.py](https://github.com/tensorflow/tensorflow/blob/master/configure.py)

      Then you can configure the build:
      ```dockerfile
      WORKDIR /tensorflow_src
      RUN ./configure
      ```

      And write the compile command:
      ```markup
      CMD bazel build --config=opt --config=cuda --copt=-mavx --copt=-mavx2 \
            --copt=-mfma --copt=-mfpmath=both --copt=-msse4.2 --copt=-O3 \
            --config=noaws \
            --config=nohdfs \
            --config=noignite \
            --config=nokafka \
            --config=v2 \
            //tensorflow/tools/pip_package:build_pip_package && \
          bazel-bin/tensorflow/tools/pip_package/build_pip_package --gpu --nightly_flag /tensorflow_pkg
      ```
      This command is the most generic one you can write. In fact, you probably don't need to specify all the arguments:
      - `--config=v2` builds tensorflow 2 version,
      - `--config=opt` builds tensorflow with all the optimizations for the computer you're working on. If using it then the other `--copt` arguments
      are useless,
      - the `--config=no****` disables parts of tensorflow we're not using, like kafka or aws support.


      The resulting dockerfile can be found here.

      ## Compiling tensorflow
      First build the devel image:
      `docker build -t tfdevel -f devel.Dockerfile .`

      Then you can create the folder for the compilation result and start compiling tensorflow:

      ```bash
      mkdir -p tensorflow_pkg
      docker run -it --rm --runtime=nvidia \
            -v $(pwd)/tensorflow_pkg:/tensorflow_pkg \
            tfdevel
      ```
      It will generate the python wheel
      `tensorflow_pkg/tf_nightly_gpu-1.13.1-cp36-cp36m-linux_x86_64.whl` (Please note than even if it's writen 1.13.1 it is version 2)

      ## Installing Tensorflow
      If you want to use this version of tensorflow on your host system, just do a `pip install`, else you can also build a docker image and 
      install tensorflow inside.
      
      Here as well you will find in the tensorflow repository a file named 
      [gpu.Dockerfile](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/dockerfiles/dockerfiles/gpu.Dockerfile)
      which contains everything to run TensorFlow. Again I like to change:
      - ubuntu version from 16.04 to 18.04
      - Remove ARCH because not usefull for me
      - Force python 3

      The resulting dockerfile can be found here.
      


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