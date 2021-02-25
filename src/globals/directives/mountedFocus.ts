import type { App } from 'vue'

const mouseSync = {
  install(app: App) {
    app.directive('mounted-focus', {
      mounted(el: HTMLElement) {
        setTimeout(() => {
          el.focus()
        }, 0)
      }
    })
  }
}

export default mouseSync