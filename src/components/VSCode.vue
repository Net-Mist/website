<template>
  <div>
    <h1 class="display-3">VSCode</h1>
    <p>
      After many years using
      <a href="https://www.jetbrains.com/">Jetbrains</a>' IDEs, I switched to VSCode for working on computing projects.
      The main reason was that I didn't had access anymore to a free Licence of Jetbrains. As I code most of my time in python, but also sometimes
      in Javascript, C++ or other languages the Community Edition of pycharm was not an option for me (it was also missing some critical features like Docker
      support).
    </p>
    <p>
      After exploring several tools like vim, emacs and Atom I tried VSCode. And now I'm working with it. The default configuration fits my needs and it's even
      better with some extensions like :
    </p>
    <ul>
      <li>Python (for python coding)</li>
      <li>SpellChecker</li>
      <li>Vetur (for vue.js coding)</li>
      <li>Docker (for dockerfile and docker-compose support)</li>
      <li>Better Comments</li>
      <li>autoDocstring with Google as docstring format</li>
      <li>flask-snippets</li>
      <li>Remote - Containers</li>
      <li>Remote - SSH</li>
      <li>GitLens</li>
    </ul>
    <p>And with Monokai Dimmed as color theme</p>

    

    <p>
      the list of shortcuts can be found
      <a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf">here</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "vscode",
  mounted() {}
};
</script>