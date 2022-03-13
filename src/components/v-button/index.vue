<template>
  <button class="button" :class="[type,size]" @click.stop="handleClick">
    <span v-if="hasIcon" class='icon' :class="{active:loading}">
      <slot name="prefix"></slot>
    </span>
    <slot/>
  </button>
</template>

<script lang="ts">
import { ref } from 'vue'
// type buttonType = 'primary' | 'default' | 'danger'
// type buttonSize = 'small' | 'medium' | 'large'

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
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  // eslint-disable-next-line
  setup (props, context) {
    const hasIcon = ref<boolean>(false)
    if (context.slots.prefix) {
      hasIcon.value = true
    }
    function handleClick () {
      if (props.loading) return
      context.emit('click')
    }
    return {
      hasIcon,
      handleClick
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
.icon{
  display:inline-block;
  &.active{
    animation: iconMove 1s linear 0s infinite;
  }
}
</style>
