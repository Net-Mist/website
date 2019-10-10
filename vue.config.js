module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/javascript',
        // '/tfcompile',
        '/vscode',
        "/ubuntu_install"
      ],
      useRenderEvent: false,
      headless: true,
      onlyProduction: true
    }
  }
}
