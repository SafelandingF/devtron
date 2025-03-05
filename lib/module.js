'use strict'

/**
 * 模块类，用于表示应用程序中的模块及其依赖关系
 */
class Module {
  /**
   * 构造函数
   * @param {string} path - 模块的完整路径
   * @param {string} resourcesPath - 应用程序资源目录路径
   * @param {string} appName - 应用程序名称
   */
  constructor(path, resourcesPath, appName) {
    this.path = path                 // 模块文件绝对路径
    this.resourcesPath = resourcesPath // 应用程序资源根目录
    this.appName = appName           // 应用程序名称
    this.size = -1                   // 模块文件大小（字节）
    this.version = ''                // 模块版本号
    this.children = []               // 子模块数组
  }

  // 设置模块版本
  setVersion(version) {
    this.version = version
    return this
  }

  // 获取模块版本
  getVersion() {
    return this.version
  }

  // 设置模块文件大小
  setSize(size) {
    this.size = size
    return this
  }

  // 获取模块文件大小
  getSize() {
    return this.size
  }

  // 判断是否有子模块
  hasChildren() {
    return this.children.length > 0
  }

  // 添加子模块并建立父子关系
  addChild(child) {
    this.children.push(child)
    child.parent = this
  }

  // 获取模块路径
  getPath() {
    return this.path
  }

  // 计算模块在依赖树中的深度
  getDepth() {
    let depth = 1
    let parent = this.parent
    while (parent != null) {
      depth++
      parent = parent.parent
    }
    return depth
  }

  // 获取模块文件名
  getName() {
    if (!this.name) this.name = /\/([^\/]+)$/.exec(this.path)[1]
    return this.name
  }

  // 获取模块所在目录（相对资源路径）
  getDirectory() {
    let directoryPath = /(.+)\/[^\/]+$/.exec(this.path)[1]
    if (directoryPath.indexOf(this.resourcesPath) === 0) {
      directoryPath = directoryPath.substring(this.resourcesPath.length + 1)
    }
    return directoryPath
  }

  /**
   * 计算模块所属库（Electron/第三方库/应用自身）
   * 优先级：Electron > node_modules > 应用代码
   */
  computeLibrary() {
    // 检测Electron核心模块
    if (/\/atom\.asar\/(browser|common|renderer)\//.test(this.path)) return 'Electron'

    // 检测node_modules中的依赖
    const libraryPattern = /\/node_modules\/([^\/]+)(?=\/)/g
    let match = libraryPattern.exec(this.path)
    while (match != null) {
      let library = match[1]
      match = libraryPattern.exec(this.path)
      if (match == null) return library
    }

    // 默认返回应用名称
    return this.appName
  }

  // 获取所属库（带缓存）
  getLibrary() {
    if (!this.library) this.library = this.computeLibrary()
    return this.library
  }

  // 获取库ID（小写格式）
  getId() {
    if (!this.id) this.id = this.getLibrary().toLowerCase()
    return this.id
  }

  // 遍历模块树（深度优先）
  visit(callback) {
    callback(this)
    this.children.forEach((child) => child.visit(callback))
  }

  // 将模块树转换为扁平数组
  toArray() {
    const modules = []
    this.visit((module) => modules.push(module))
    return modules
  }
}

module.exports = Module
