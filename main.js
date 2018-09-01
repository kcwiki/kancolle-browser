// https://github.com/poooi/poi/blob/master/app.js

const { app, BrowserWindow } = require('electron')

app.commandLine.appendSwitch('js-flags', '--harmony')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({})

  mainWindow.setMenu(null)

  mainWindow.loadFile('index.html')

  if (process.env.dev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
