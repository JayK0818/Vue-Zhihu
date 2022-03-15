import { createVNode, render, ref } from 'vue'
import Message from './index.vue'
let nextId = 0
export type MessageType = 'loading' | 'success' | 'warning' | 'error'
let MessageContainer: null | HTMLElement = null
if (!MessageContainer) {
  const element = document.createElement('div')
  element.classList.add('ant_message')
  document.body.appendChild(element)
  MessageContainer = element
}

function createInstance (type: MessageType, text: string, duration = 3000): HTMLElement {
  const vnode = createVNode(Message, {
    type,
    text,
    id: nextId++
  })
  const element = document.createElement('div')
  render(vnode, element)
  if (MessageContainer) {
    MessageContainer.appendChild(element)
  }
  const timer = ref<null | number>(null)
  if (duration !== 0) {
    timer.value = setTimeout(() => {
      if (MessageContainer) {
        MessageContainer.removeChild(element)
      }
      if (timer.value) {
        clearTimeout(timer.value)
      }
    }, duration)
  }
  return element
}
const message = {
  success: function (text: string): void {
    createInstance('success', text)
  },
  loading: function (text: string, duration:number) {
    const element = createInstance('loading', text, duration)
    return function () {
      if (MessageContainer) {
        MessageContainer.removeChild(element)
      }
    }
  },
  error: function (text: string): void {
    createInstance('error', text)
  },
  warning: function (text: string): void {
    createInstance('warning', text)
  }
}

export default message
