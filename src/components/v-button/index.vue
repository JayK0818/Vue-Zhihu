<template>
  <button class="button" :class="[type,size]">
    <span v-if="hasIcon" class='icon'>
      <slot name="prefix"></slot>
    </span>
    <slot/>
  </button>
</template>

<script lang="ts">
import { ref, PropType } from 'vue'

type buttonType = 'primary' | 'default' | 'danger'
type buttonSize = 'small' | 'medium' | 'large'

export default {
  name: 'v-button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  // eslint-disable-next-line
  setup (props, context) {
    const hasIcon = ref<boolean>(false)
    if (context.slots.prefix) {
      hasIcon.value = true
    }
    return {
      hasIcon
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes iconMove{
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(360deg)
  }
}
.icon.active{
  animation:iconMove 3s linear 0s infinite;
}
</style>
