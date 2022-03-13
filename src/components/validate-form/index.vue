<template>
  <div class='form-container'>
    <form>
      <slot/>
      <div class='submit-wrapper' @click.prevent='submit'>
        <slot name='submit'>
          <button class='btn primary'>Submit</button>
        </slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import mitt from 'mitt'
import { defineComponent, onUnmounted } from 'vue'
type ValidateFunction = () => boolean
type Events = {
  'validate-form': ValidateFunction
}
export const emitter = mitt<Events>() // 事件监听

export default defineComponent({
  name: 'validate-form',
  emits: ['submit'],
  setup (props, context) {
    let validateFunctionArray:ValidateFunction [] = []
    const submit = () => {
      const check = validateFunctionArray.map(fn => fn()).every(result => result)
      context.emit('submit', check)
    }
    emitter.on('validate-form', (func: ValidateFunction) => {
      validateFunctionArray.push(func)
    })

    onUnmounted(() => {
      emitter.off('validate-form')
      validateFunctionArray = []
    })
    return {
      submit
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
