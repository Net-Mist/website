<template lang="pug">
  div.markdown-body
    :markdown-it
      # VSCode
      After many years using [Jetbrains](https://www.jetbrains.com/")' IDEs, I switched to VSCode.

      The main reason was that I didn't had access anymore to a free Licence of Jetbrains (I'm no more a student...). As I code most of my time in python, but also
      in Javascript, C++ or go, the Community Edition of pycharm was not an option for me (it was also missing some critical features like Docker
      support and remote development).

      After some time exploring several IDE I tried VSCode. And now I'm working with it. I really like the way it behaves and all the extensions it provides.
      All these extensions transform VSCode to a very powerfull IDE. In this article I will details my configuration
      
      ## For all languages
      - Better Comments (color the TODOs...)
      - Remote - Containers (to work inside docker in a easy way)
      - Remote - SSH (to edit a code written on a remote server)
      - GitLens (better git integration)
      - Docker (for dockerfile and docker-compose support)
      - Spellchecker

      ## Python
      Of course, start by installing the `Python` extension, then `autoDocstring` (that I setup to follow Google conventions).
      I also like to change the settings of autopep8 to set the max length of a line at 180 and only use 2 spaces for indents.
      
      ## Settings
      This is a short recap of my settings. To access them type `F1` and `open settings (json)`
      ```
      {
        "workbench.colorTheme": "Visual Studio Dark",
        "terminal.external.linuxExec": "terminology",
        "workbench.statusBar.feedback.visible": false,
        "autoDocstring.docstringFormat": "google",
        "python.formatting.autopep8Args": [
          "--max-line-length=180",
          "--indent-size=2"
        ],
      }
      ```

      # Other 
      I also like:
      - Vetur (for vue.js coding)      
      - flask-snippets
      
</template>

<script>
export default {
  name: "vscode",
  mounted() {}
};
</script>