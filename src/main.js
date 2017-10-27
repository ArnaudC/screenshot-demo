const electron = require('electron')

const {BrowserWindow, app, globalShortcut } = electron

app.on('ready', _ => {
    let mainWindow = new BrowserWindow({ // create an invisible window
        height: 0,
        width: 0,
        resizeable: false,
        frame: false,
        show: false
    })

    mainWindow.openDevTools() // open the dev tools

    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.on('clsoe', _ => {
        mainWindow = null // run the gc
    })

    globalShortcut.register('CommandOrControl+Alt+D', _ => {
        console.log('got shortcut');
        mainWindow.webContents.send('capture', app.getPath('pictures'))
    })
})
