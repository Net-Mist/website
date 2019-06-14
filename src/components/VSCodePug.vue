<template lang="pug">
  div.markdown-body
    :markdown-it
      # VSCode
      After many years using [Jetbrains](https://www.jetbrains.com/")' IDEs, I switched to VSCode for working on computing projects.

      The main reason was that I didn't had access anymore to a free Licence of Jetbrains. As I code most of my time in python, but also sometimes
      in Javascript, C++ or other languages the Community Edition of pycharm was not an option for me (it was also missing some critical features like Docker
      support).

      After exploring several tools like vim, emacs and Atom I tried VSCode. And now I'm working with it. The default configuration fits my needs and it's even
      better with some extensions like :

        - Python (for python coding)
        - SpellChecker
        - Vetur (for vue.js coding)
        - Docker (for dockerfile and docker-compose support)
        - Better Comments
        - autoDocstring with Google as docstring format
        - flask-snippets
        - Remote - Containers
        - Remote - SSH
        - GitLens

      And with Monokai Dimmed as color theme

      ## Change default terminal :
      go to  Files -> Preferences -> Settings -> terminal Linux Exec and type for instance terminology

</template>

<script>
export default {
  name: "vscode",
  mounted() {}
};
</script>