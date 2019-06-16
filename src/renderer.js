const { writeFileSync } = require('fs')
const { remote } = require('electron')

const args = remote.getGlobal('process').argv.slice(1)

const handleApi = data => {
  const i = args.indexOf('--save-api-and-exit')
  if (i >= 0) {
    writeFileSync(args[i + i] || 'api_start2', data, () => remote.app.quit())
    remote.app.quit()
  }
}

const log = url => {
  if (args.includes('--log')) {
    // eslint-disable-next-line no-console
    console.log(url)
  }
}

const webview = document.querySelector('webview')

webview.addEventListener('ipc-message', event => {
  if (event.channel === 'game-api') {
    log(event.args[0])
    if (event.args[0].endsWith('/kcsapi/api_start2/getData')) {
      handleApi(event.args[1])
    }
  }
})

const onStartLoading = () => {
  if (args.includes('--dev')) {
    webview.openDevTools({ mode: 'undocked' })
  }
  // Catch API via debugger
  /*
  const requestMap = {}
  const isDataUrl = url => url.includes('api_start2')
  const debug = webview.getWebContents().debugger
  try {
    debug.attach('1.2')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('debugger already attached')
  }
  debug.on('message', (_, method, params) => {
    if (method === 'Network.requestWillBeSent') {
      if (isDataUrl(params.request.url)) {
        requestMap[params.requestId] = params.request.url
      }
    } else if (method === 'Network.loadingFinished') {
      const url = requestMap[params.requestId]
      if (url) {
        log(url)
        delete requestMap[params.requestId]
        debug.sendCommand('Network.getResponseBody', { requestId: params.requestId }, (err, data) => {
          if (err.code === undefined) {
            handleApi(data.body)
          }
        })
      }
    }
  })
  debug.sendCommand('Network.enable')
  */
  webview.removeEventListener('did-start-loading', onStartLoading)
}

webview.addEventListener('did-start-loading', onStartLoading)
