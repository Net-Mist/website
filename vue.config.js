module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/javascript',
        '/tfcompile',
        '/vscode'
      ],
      useRenderEvent: false,
      headless: true,
      onlyProduction: true
    }
  }
}
