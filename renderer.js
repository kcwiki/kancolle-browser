const { outputFile } = require('fs-extra')
const { remote } = require('electron')

const env = remote.getGlobal('process').env

const webview = document.querySelector('webview')

const isDataUrl = url => url.includes('api_start2')

const requestMap = {}

const attachDebugger = () => {
  if (env.electron_devtools && env.electron_devtools === 'true') {
    webview.openDevTools()
  }
  const debug = webview.getWebContents().debugger
  try {
    debug.attach('1.2')
  } catch (e) {
    console.log('debugger already attached')
    // todo: can't grab responses?
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
            outputFile(`${__dirname}/dist/api_start2`, data.body, () => {
              remote.app.quit()
            })
          }
        })
      }
    }
  })
  debug.sendCommand('Network.enable')
  webview.removeEventListener('did-start-loading', attachDebugger)
}

webview.addEventListener('did-start-loading', attachDebugger)
