// https://github.com/poooi/poi/blob/master/assets/js/webview-preload.js

const { remote } = require('electron')

const webContent = remote.getCurrentWebContents()

webContent.setAudioMuted(true)

// webContent.addListener('dom-ready', () => {
document.addEventListener('DOMContentLoaded', () => {
  // UA
  webContent.session.setUserAgent(webContent.session.getUserAgent(), 'ja-JP')
  // Cookie
  document.cookie = 'cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/'
  document.cookie = 'cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/'
  document.cookie = 'cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/'
  document.cookie = 'ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=osapi.dmm.com;path=/'
  document.cookie = 'ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=203.104.209.7;path=/'
  document.cookie = 'ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=www.dmm.com;path=/netgame/'
  document.cookie = 'ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=log-netgame.dmm.com;path=/'
  document.cookie = 'ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/'
  document.cookie = 'ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/'
  document.cookie = 'ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/'
})
