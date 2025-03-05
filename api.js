const { session } = require('electron')

exports.install = () => {
  const ses = session.defaultSession
  if (process.type === 'renderer') {
    console.log(`Installing [renderer] Devtron from ${__dirname}`)
    if (ses.getAllExtensions && ses.getAllExtensions().devtron) return true
    return ses.loadExtension(__dirname)
  } else if (process.type === 'browser') {
    console.log(`Installing [browser] Devtron from ${__dirname}`)
    if (ses.getAllExtensions && ses.getAllExtensions().devtron) return true
    return ses.loadExtension(__dirname)
  } else {
    throw new Error('Devtron can only be installed from an Electron process.')
  }
}

exports.uninstall = () => {
  const ses = session.defaultSession

  if (process.type === 'renderer') {
    console.log(`Uninstalling [renderer] Devtron from ${__dirname}`)
    return ses.removeExtension('devtron')
  } else if (process.type === 'browser') {
    console.log(`Uninstalling [browser] Devtron from ${__dirname}`)
    return ses.removeExtension('devtron')
  } else {
    throw new Error('Devtron can only be uninstalled from an Electron process.')
  }
}


exports.path = __dirname


// // exports.install = async () => {
// //   const session = electron.session
// //   // if (process.type === 'renderer') {
// //   //   console.log(`Installing Devtron from ${__dirname}`)
// //   //   if (electron.remote.BrowserWindow.getDevToolsExtensions &&
// //   //       electron.remote.BrowserWindow.getDevToolsExtensions().devtron) return true
// //   //   return electron.remote.BrowserWindow.addDevToolsExtension(__dirname)
// //   // } else if (process.type === 'browser') {
// //   //   console.log(`Installing Devtron from ${__dirname}`)
// //   //   if (electron.BrowserWindow.getDevToolsExtensions &&
// //   //       electron.BrowserWindow.getDevToolsExtensions().devtron) return true
// //   //   return electron.BrowserWindow.addDevToolsExtension(__dirname)
// //   // } else {
// //   //   throw new Error('Devtron can only be installed from an Electron process.')
// //   // }
// //   try {
// //     if(process.type === 'browser'){
// //       await session.defaultSession.loadExtension(__dirname)
// //     }
// //   } catch(e) {
// //     console.log(e)
// //   }


// // }

// // exports.uninstall = () => {
// //   if (process.type === 'renderer') {
// //     console.log(`Uninstalling Devtron from ${__dirname}`)
// //     return electron.remote.BrowserWindow.removeDevToolsExtension('devtron')
// //   } else if (process.type === 'browser') {
// //     console.log(`Uninstalling Devtron from ${__dirname}`)
// //     return electron.BrowserWindow.removeDevToolsExtension('devtron')
// //   } else {
// //     throw new Error('Devtron can only be uninstalled from an Electron process.')
// //   }
// // }

// const preloadInit = ()=>{
//   const contextBridge = require('electron').contextBridge
//   const ipcRenderer = require('electron').ipcRenderer
//   contextBridge.exposeInMainWorld('devtron',{
//     install:()=>{
//       // session.defaultSession.loadExtension(__dirname)
//       // console.log('devtron installed')
//       ipcRenderer.send('devtron-install',__dirname)
//     }
//   })
// }

// const MainInit = ()=>{
//   const ipcMain = require('electron').ipcMain
//   const session = require('electron').session
//   ipcMain.on('devtron-install',(path)=>{
//     session.defaultSession.loadExtension(path)
//   })
// }


// exports.preloadInit = preloadInit
// exports.MainInit = MainInit

// exports.install = () => {
//   const ses = session.defaultSession
//   if (process.type === 'renderer') {
//     console.log(`Installing [renderer] Devtron from ${__dirname}`)
//     if (ses.getAllExtensions && ses.getAllExtensions().devtron) return true
//     return ses.loadExtension(__dirname)
//   } else if (process.type === 'browser') {
//     console.log(`Installing [browser] Devtron from ${__dirname}`)
//     if (ses.getAllExtensions && ses.getAllExtensions().devtron) return true
//     return ses.loadExtension(__dirname)
//   } else {
//     throw new Error('Devtron can only be installed from an Electron process.')
//   }
// }
// exports.uninstall = () => {

//   const ses = session.defaultSession

//   if (process.type === 'renderer') {
//     console.log(`Uninstalling [renderer] Devtron from ${__dirname}`)
//     return ses.removeExtension('devtron')
//   } else if (process.type === 'browser') {
//     console.log(`Uninstalling [browser] Devtron from ${__dirname}`)
//     return ses.removeExtension('devtron')
//   } else {
//     throw new Error('Devtron can only be uninstalled from an Electron process.')
//   }
// }


// exports.path = __dirname
