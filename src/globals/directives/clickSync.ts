import type { App } from 'vue'

type StoreItem = { keyboardCb: (e: KeyboardEvent) => unknown; eventTrigger: (e: Event | KeyboardEvent) => unknown }
type Bind = { modifiers: { stop: boolean; prevent: boolean }; value: (e: Event) => unknown }
const mouseSync = {
  install(app: App) {
    const STORE = new Map<HTMLElement, StoreItem>()

    const makeEventTrigger = ({ modifiers, value }: Bind) => {
      return function (e: Event | KeyboardEvent) {
        if (modifiers.prevent) e.preventDefault()
        if (modifiers.stop) e.stopPropagation()

        value(e)
      }
    }

    app.directive('click-sync', {
      mounted(el: HTMLElement, bind) {
        const eventTrigger = makeEventTrigger(bind as unknown as Bind)
        const keyboardCb = (e: KeyboardEvent) => {
          if (e.key.toLowerCase() === 'enter') eventTrigger(e)
        }
        el.addEventListener('mousedown', eventTrigger)
        el.addEventListener('keydown', keyboardCb)

        STORE.set(el, { keyboardCb, eventTrigger })
      },
      beforeUnmount(el: HTMLElement) {
        const { keyboardCb, eventTrigger } = STORE.get(el) as StoreItem

        el.removeEventListener('mousedown', eventTrigger)
        el.removeEventListener('keydown', keyboardCb)

        STORE.delete(el)
      }
    })
  }
}

export default mouseSync