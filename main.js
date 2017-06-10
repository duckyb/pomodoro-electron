const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
  let win = new BrowserWindow({width:570, height:520, icon: __dirname + '/favicon.ico'})
  win.loadURL(__dirname + '/index.html')
  win.setMenu(null)
  // win.webContents.openDevTools()
})
