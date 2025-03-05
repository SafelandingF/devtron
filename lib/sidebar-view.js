'use strict'

const View = require('./view')

/**
 * 侧边栏主视图，管理多个功能面板的切换和布局
 */
class SidebarView extends View {
  constructor() {
    super('sidebar-view')
    this.panes = [] // 存储所有功能面板
    this.links = [/*...*/] // 侧边栏导航链接
    this.panesElement = document.querySelector('#pane-group')
    this.panesElement.appendChild(this.element)
    this.handleEvents()
  }

  // 处理键盘导航和面板切换事件
  handleEvents() {
    document.body.addEventListener('keydown', (event) => {
      if (event.ctrlKey || event.metaKey) return
      if (!event.altKey) return

      switch (event.code) {
        case 'ArrowDown':
          this.selectNext()
          event.stopImmediatePropagation()
          event.preventDefault()
          break
        case 'ArrowUp':
          this.selectPrevious()
          event.stopImmediatePropagation()
          event.preventDefault()
          break
      }
    })

    document.body.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.code === 'KeyE') {
        this.activePane.reload()
        this.activePane.focus()
        event.stopImmediatePropagation()
        event.preventDefault()
      }
    })

    this.element.addEventListener('mousedown', (event) => {
      let paneLink = event.target.dataset.paneLink
      if (paneLink) this.selectPane(paneLink)
    })
  }

  activateLink (name) {
    this.links.forEach((link) => {
      if (link.dataset.paneLink === name) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  }

  addPane (view) {
    if (this.panes.length === 0) this.activePane = view
    this.panes.push(view)
    this.panesElement.appendChild(view.element)
  }

  findPane (name) {
    return this.panes.find((view) => view.element.dataset.pane === name)
  }

  // 切换功能面板
  selectPane(name) {
    const pane = this.findPane(name)
    if (!pane) return

    this.panes.forEach((view) => view.hide())

    pane.show()
    pane.focus()
    this.activePane = pane

    this.activateLink(name)
  }

  // 面板导航方法
  selectPrevious() {/*...*/}
  selectNext() {/*...*/}
}

module.exports = SidebarView
