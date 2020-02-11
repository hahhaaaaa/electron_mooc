// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain} = require('electron')
const path = require('path')
class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}
// function createWindow () {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       // preload: path.join(__dirname, 'preload.js')
//     }
//   })
//   // and load the index.html of the app.
//   mainWindow.loadFile('./renderer/index.html')
//   mainWindow.webContents.openDevTools();
//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
  
//   ipcMain.on('add-music-window', function(event, arg) {
//     const addWindow = new BrowserWindow({
//           width:800,
//           height:600,
//           webPreferences: {
//             nodeIntegration: true
//           },
//           parent: mainWindow
//         })
//         addWindow.loadFile('./renderer/add.html')
//   });
// }
// ipcMain.on('add-muisc-window',()=>{
//   const addWindow = new BrowserWindow({
//     width:800,
//     height:600,
//     webPreferences: {
//       nodeIntegration: true
//     },
//     parent: mainWindow
//   })
//   addWindow.loadFile('./renderer/add.html')
// })


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  const mainWindow = new AppWindow({},'./renderer/index.html')
  mainWindow.webContents.openDevTools();
  // mainWindow.loadFile('./render/indx')
  ipcMain.on('add-music-window',()=>{
    const addWindow = new AppWindow({
      width:500,
      height:400,
      parent:mainWindow,
    },'./renderer/add.html')
  })
  // addWindow.loadFile('./renderer/add.html')
})
 
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
}) 

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
  