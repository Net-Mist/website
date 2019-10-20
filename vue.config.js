module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/javascript',
        // '/tfcompile',
        '/vscode',
        "/ubuntu_install",
        '/ai_demo'
      ],
      useRenderEvent: false,
      headless: true,
      onlyProduction: true
    }
  }
}
