'use strict'

const View = require('./view')

/**
 * 可选中视图基类，提供列表项选择功能
 */
class SelectableView extends View {
  // 选中状态管理
  select() {/*...*/}
  deselect() {/*...*/}

  // 相邻项选择功能
  selectNext() {
    // ... 查找下一个可见元素 ...
  }
  
  selectPrevious() {
    // ... 查找上一个可见元素 ...
  }

  // 绑定鼠标选择事件
  listenForSelection(emitter) {/*...*/}

  // 绑定键盘选择事件（上下箭头）
  listenForSelectionKeys(emitter) {/*...*/}
}

module.exports = SelectableView
