<template lang="pug">
    div.markdown-body
        :markdown-it
            # Installing Ubuntu with nvidia-docker support
            This is a quick guide to configure Ubuntu to run docker services on GPU, like deep learning programs for instance.
            
            ## Before starting
            You need a clean an up-to-date install of Ubuntu 18.04 on a computer with a NIVIDA GPU and internet connection.

            If your computer doesn't have a NVIDIA GPU then you can follow this guide to install docker and docker-compose. Just don't follow the parts regarding
            NVIDIA drivers or docker-nvidia.

            first start by updating you computer :
            ```bash
            sudo apt update
            sudo apt upgrade
            ```

            ## Basic install
            ### NVIDIA Driver
            It is highly recommended to start by installing NVIDIA drivers, as it the trickiest part.
            The commands bellow :
              - Adds a ppa (Personal Package Archive). This one is maintained by X.org.
              - Update local package list.
              - List the possible drivers and the recommended ones. 
            ```bash
            sudo add-apt-repository ppa:graphics-drivers/ppa 
            sudo apt-get update 
            ubuntu-drivers devices
            ```
            At the date of this article, the last command says that the recommended version for my GPU is nvidia-driver-440,
            so we can run:
            ```bash
            sudo apt-get install nvidia-driver-440
            ```

            Then you need to restart the computer to load the new driver. Run `nvidia-smi` to check if the driver is running.

            ### Docker CE
            To install Docker CE follow [docker wiki](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository) or run
            ```bash
            sudo apt-get install \
                apt-transport-https ca-certificates curl gnupg-agent software-properties-common
            curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
            sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
                $(lsb_release -cs) \
                stable"
            sudo apt-get update
            sudo apt-get install docker-ce docker-ce-cli containerd.io
            ```
            and add the user to docker group 
            ```bash
            sudo usermod -aG docker $USER
            ```
            To update the user permissions, you will need to logout.
            To check if it works, try to run the command `docker images`

            ### nvidia-docker
            To install nvidia-docker follow [nvidia-docker wiki](https://github.com/nvidia/nvidia-docker/wiki/Installation-(version-2.0)) or run
            ```bash
            curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | \
                sudo apt-key add -
            distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
            curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
                sudo tee /etc/apt/sources.list.d/nvidia-docker.list
            sudo apt-get update
            sudo apt-get install nvidia-docker2
            sudo pkill -SIGHUP dockerd
            ```

            ### docker-compose
            Follow [the doc](https://docs.docker.com/compose/install/) or run
            ```bash
            sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
            ```

            ## Post install tips and tricks
            From this point, you should have a working computer with docker, docker-compose and nvidia-docker. The following commands 
            are extra tools to increase my productivity. Feel free to install them or not.

            ### zsh installation and configuration
            zsh is the command shell that I prefer. oh-my-zsh brings a set of usefull tool to speed productivity.
            Run
            ```bash
            sudo apt install zsh
            sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
            cd .oh-my-zsh/themes
            wget https://raw.githubusercontent.com/caiogondim/bullet-train-oh-my-zsh-theme/master/bullet-train.zsh-theme
            sudo apt-get install fonts-powerline
            ```
            then change the theme in `.zshrc` to setup bullet-train

            ### Other packages
            `htop` is a clearer `top`. `openssh-server` allow you to turn your computer to a ssh server, `net-tools` gives you tools like `ifconfig` and `nfs-common`
            is usefull when working with remote storage system like a nas
            ```bash
            apt install openssh-server net-tools nfs-common htop
            ```
               
</template>

<script>
import Prism from 'prismjs';
export default {
  name: "ubuntu-install",
  mounted() {
    Prism.highlightAll();
  },
};
</script>