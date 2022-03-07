import { onMounted, onUnmounted, ref, Ref } from 'vue'

function useClick (elementRef: Ref<null | HTMLElement>): Ref<boolean> {
  const isInner = ref<boolean>(true)
  onMounted(() => {
    document.addEventListener('click', handler, false)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler, false)
  })
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isInner.value = true
      } else {
        isInner.value = false
      }
    }
  }
  return isInner
}

export default useClick
