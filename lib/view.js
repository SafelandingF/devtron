'use strict'

/**
 * 基础视图类，提供通用的DOM操作和事件管理功能
 */
class View {
  /**
   * 静态方法：在指定元素内批量执行查询和操作
   * @param {Element} element - 根元素
   * @param {string} selector - CSS选择器
   * @param {Function} callback - 回调函数
   */
  static queryForEach(element, selector, callback) {
    const elements = element.querySelectorAll(selector)
    Array.prototype.forEach.call(elements, callback)
  }

  /**
   * 构造函数
   * @param {string} viewId - 视图模板的ID
   */
  constructor(viewId) {
    this.id = viewId
    this.listeners = []
    this.element = this.createElement()
    this.element.view = this
    this.bindFields()
  }

  // 销毁视图及所有监听器
  destroy() {
    this.listeners.forEach((destroy) => destroy())
    this.listeners = []
    this.destroyChildren()
  }

  // 销毁子视图
  destroyChildren() {
    if (this.children) {
      this.children.forEach((child) => child.destroy())
      this.children = []
    }
  }

  // 绑定数据字段到DOM元素
  bindFields() {
    View.queryForEach(this.element, '[data-field]', (propertyElement) => {
      this[propertyElement.dataset.field] = propertyElement
    })
  }

  /**
   * 绑定事件监听器并记录清理方法
   * @param {EventTarget} emitter - 事件发射器
   * @param {string} event - 事件名称
   * @param {Function} callback - 回调函数
   */
  bindListener(emitter, event, callback) {
    emitter.addEventListener(event, callback)
    this.listeners.push(function () {
      emitter.removeEventListener(event, callback)
    })
  }

  // 创建视图元素（使用模板克隆）
  createElement() {
    const template = document.querySelector(`#${this.id}`).content
    return document.importNode(template, true).firstElementChild
  }

  // 视图显隐控制方法
  isHidden() {/*...*/}
  hide() {/*...*/} 
  show() {/*...*/}
}

module.exports = View
