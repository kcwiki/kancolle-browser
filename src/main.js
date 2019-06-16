// https://github.com/poooi/poi/blob/master/app.js

const { app, BrowserWindow, Menu } = require('electron')

app.commandLine.appendSwitch('js-flags', '--harmony')

Menu.setApplicationMenu(null)

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      // webSecurity: false,
    },
  })

  mainWindow.setMenu(null)

  mainWindow.loadFile(`${__dirname}/index.html`)

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools({ mode: 'undocked' })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  process.exit(1)
})
