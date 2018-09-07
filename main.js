// https://github.com/poooi/poi/blob/master/app.js

require('dotenv').config()

if (process.env.electron_timeout) {
  console.log(`will timeout after ${process.env.electron_timeout} seconds`)
  setTimeout(() => {
    console.log('timeout')
    process.exit(1)
  }, parseInt(process.env.electron_timeout) * 1000)
}

const { app, BrowserWindow } = require('electron')

app.commandLine.appendSwitch('js-flags', '--harmony')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({})

  mainWindow.setMenu(null)

  mainWindow.loadFile('index.html')

  if (process.env.electron_devtools && process.env.electron_devtools === 'true') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  // app.quit()
  process.exit(1)
})
