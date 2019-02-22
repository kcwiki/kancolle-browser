// https://github.com/poooi/poi/blob/master/assets/js/webview-preload.js

const { remote, ipcRenderer } = require('electron')

const wait = (test, finish, n = 1000) => {
  setTimeout(() => {
    const r = test()
    if (r) {
      finish(r)
    } else {
      wait(test, finish, n)
    }
  }, n)
}

const env = remote.getGlobal('process').env

const webContent = remote.getCurrentWebContents()

// webContent.addListener('dom-ready', () => {
document.addEventListener('DOMContentLoaded', () => {
  // UA
  webContent.session.setUserAgent(webContent.session.getUserAgent(), 'ja-JP')
  // Cookie
  document.cookie = 'cklg=welcome;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=.dmm.com;path=/'
  document.cookie = 'cklg=welcome;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=.dmm.com;path=/netgame/'
  document.cookie = 'cklg=welcome;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=.dmm.com;path=/netgame_s/'
  document.cookie = 'ckcy=1;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=osapi.dmm.com;path=/'
  document.cookie = 'ckcy=1;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=203.104.209.7;path=/'
  document.cookie = 'ckcy=1;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=www.dmm.com;path=/netgame/'
  document.cookie = 'ckcy=1;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=log-netgame.dmm.com;path=/'
  document.cookie = 'ckcy=1;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=.dmm.com;path=/'
  document.cookie = 'ckcy=1;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=.dmm.com;path=/netgame/'
  document.cookie = 'ckcy=1;expires=Thu, 16-Jan-2020 00:00:00 GMT;domain=.dmm.com;path=/netgame_s/'
  // Catch API from game frame
  if (env.api_method === 'axios') {
    wait(
      () =>
        (((((document.getElementById('game_frame') || {}).contentWindow || {}).document || {}).getElementById('htmlWrap') || {}).contentWindow || {})
          .axios,
      axios => {
        if (!axios.interceptors.response.handlers.length) {
          axios.interceptors.response.use(res => {
            ipcRenderer.sendToHost('game-api', res.config.url, res.data)
            return res
          })
        }
      }
    )
  } else if (env.api_method === 'xhr') {
    wait(
      () => ((((document.getElementById('game_frame') || {}).contentWindow || {}).document || {}).getElementById('htmlWrap') || {}).contentWindow,
      gameWindow => {
        if (!gameWindow.__XMLHttpRequestWrapper) {
          gameWindow.__XMLHttpRequestWrapper = true
          const send = gameWindow.XMLHttpRequest.prototype.send
          gameWindow.XMLHttpRequest.prototype.send = function() {
            const onreadystatechange = this.onreadystatechange
            this.onreadystatechange = function() {
              if (this.readyState === 4) {
                ipcRenderer.sendToHost('game-api', this.responseURL, this.response)
              }
              if (onreadystatechange) {
                return onreadystatechange.apply(this, arguments)
              }
            }
            return send.apply(this, arguments)
          }
        }
      }
    )
  }
})
