let electron = require('electron')

let {BrowserWindow, app} = electron

app.on('ready', _ => {
    console.log('in')
    let window = new BrowserWindow({
        height: 400,
        width: 400
    })
})
