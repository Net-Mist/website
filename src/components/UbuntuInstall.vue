<template lang="pug">
    div.markdown-body
        :markdown-it
            # Installing Ubuntu with nvidia-docker support
            ## Before starting
            You need a clean install of Ubuntu 18.04 on a computer with a NIVIDA GPU and a internet connection.

            ## Basic install
            ### NVIDIA Driver
            First start by installing NVIDIA driver. Follow [the Ubuntu doc](https://doc.ubuntu-fr.org/nvidia#via_un_ppa) or run
            ```bash
            sudo add-apt-repository ppa:graphics-drivers/ppa 
            sudo apt-get update 
            ubuntu-drivers devices
            ```
            The output will display the list of possible driver and the recommended drivers. When writing this article the recommended is version 415
            so we can run:
            ```bash
            sudo apt-get install nvidia-driver-415
            ```

            Then you need to restart the computer and run `nvidia-smi` to check if the driver is running.

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
            ### zsh installation and configuration
            run
            ```bash
            sudo apt install zsh
            sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
            cd .oh-my-zsh/themes
            wget https://raw.githubusercontent.com/caiogondim/bullet-train-oh-my-zsh-theme/master/bullet-train.zsh-theme
            sudo apt-get install fonts-powerline
            ```
            then change the theme in `.zshrc`

            ### If working with NAS and compute cluster
            ```
            sudo apt install openssh-server net-tools nfs-common htop
            ```

            ### Other packages
            ```bash
            apt install htop
            ```
               
</template>

<script>
export default {
  name: "ubuntu-install",
  mounted() {
    Prism.highlightAll();
  },
};
</script>