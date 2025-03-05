'use strict'

import { IpcMain, IpcRenderer } from "electron"

const Eval = require('./eval')
const electron = require('electron') 

exports.getEvents = () => {
  return Eval.execute(
    () => {


    const getEvents = (emitter) => {
      const events = {}
      Object.keys(emitter._events).sort().forEach((name) => {
        let listeners = emitter.listeners(name)
        if (listeners.length > 0) {
          events[name] = listeners.map((listener) => {
            return formatCode(listener.toString())
          })
        }
      })
      return events
    }
// 是这里通过获取electorn属性的
// 这里的remote是一个对象，里面有很多属性，每个属性都是一个事件发射器
    const ipcMain = electron.ipcMain as Electron.IpcMain
    const IpcRenderer = electron.ipcMain as Electron.IpcRenderer

    const getIPCEvents = (ipc:IpcMain | IpcRenderer) =>{
      const events = {}
      ipc.eventNames().forEach((eventName)=>{
        let listeners = ipc.listeners(eventName)
        if(listeners.length > 0){
          events[eventName] = listeners.map((listener) =>{
            return formatCode(listener.toString())
          })
        }
      })
    }

    const formatCode = (listener) => {
      let lines = listener.split(/\r?\n/)
      if (lines.length === 1) return listener

      let lastLine = lines[lines.length - 1]
      let lastLineMatch = /^(\s+)}/.exec(lastLine)
      if (!lastLineMatch) return listener

      let whitespaceRegex = new RegExp('^' + lastLineMatch[1])
      return lines.map((line) => {
        return line.replace(whitespaceRegex, '')
      }).join('\n')
    }
    return {
      // 'electron.remote.getCurrentWindow()': getEvents(remote.getCurrentWindow()),
      // 'electron.remote.getCurrentWebContents()': getEvents(remote.getCurrentWebContents()),
      'electron.remote.app': getEvents(remote.app),
      'electron.remote.process': getEvents(remote.process),
      'global.process': getEvents(process),
      'electron.remote.ipcMain': getIPCEvents(ipcMain),
      'electron.ipcRenderer': getIPCEvents(IpcRenderer),
    }
  })
}
