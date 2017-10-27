const electron = require('electron')
const fs = require('fs')
const path = require('path')

const {ipcRenderer: ipc, desktopCapturer, screen} = electron

function getMainSource(desktopCapturer, screen, done) {
    const options = {types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize} // assume that the primary display has the size that we need
    desktopCapturer.getSources(options, (err, sources) => {
        if (err) return console.log('canot capture screen: ', e);
        const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1'
        done(sources.filter(isMainSource)[0])
    })
}

function onCapture(evt, targetPath) {
    console.log('writeScreenshot')
    getMainSource(desktopCapturer, screen, source => {
        const png = source.thumbnail.toPng()
        const filePath = path.join(targetPath, Date.now() + '.png')
        writeScreenshot(png, filePath)
    })
}

function writeScreenshot(png, filePath) {
    console.log(`Screenshot written to '${filePath}'`);    
    fs.writeFile(filePath, png, err => {
        if (err) return console.log('Failed to write screen: ', err);
    })
}

ipc.on('capture', onCapture)
console.log('capture')
