const { outputFile } = require('fs-extra')

const { remote } = require('electron')

const saveApi = data =>
  outputFile(`${__dirname}/dist/api_start2`, data, () => {
    remote.app.quit()
  })

const env = remote.getGlobal('process').env

const webview = document.querySelector('webview')

if (env.api_method === 'axios' || env.api_method === 'xhr') {
  webview.addEventListener('ipc-message', event => {
    if (event.channel === 'game-api' && event.args[0].endsWith('/kcsapi/api_start2/getData')) {
      saveApi(event.args[1])
    }
  })
}

const onStartLoading = () => {
  if (env.electron_devtools && env.electron_devtools === 'true') {
    webview.openDevTools()
  }
  // Catch API via debugger
  if (env.api_method === 'debugger') {
    const requestMap = {}
    const isDataUrl = url => url.includes('api_start2')
    const debug = webview.getWebContents().debugger
    try {
      debug.attach('1.2')
    } catch (e) {
      console.log('debugger already attached')
    }
    debug.on('message', (_, method, params) => {
      if (method === 'Network.requestWillBeSent') {
        if (isDataUrl(params.request.url)) {
          requestMap[params.requestId] = params.request.url
        }
      } else if (method === 'Network.loadingFinished') {
        const url = requestMap[params.requestId]
        if (url) {
          console.log(url)
          delete requestMap[params.requestId]
          debug.sendCommand('Network.getResponseBody', { requestId: params.requestId }, (err, data) => {
            if (err.code === undefined) {
              saveApi(data.body)
            }
          })
        }
      }
    })
    debug.sendCommand('Network.enable')
  }
  webview.removeEventListener('did-start-loading', onStartLoading)
}

webview.addEventListener('did-start-loading', onStartLoading)
