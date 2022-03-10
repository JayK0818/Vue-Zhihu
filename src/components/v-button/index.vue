/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <button class="button">
    <span v-if="hasIcon" class='icon'>
      <slot name="prefix"></slot>
    </span>
    <slot/>
  </button>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'v-button',
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
.button{
  outline:none;
  border:1px solid #ddd;
  background-color:#fff;
  width:120px;
  height:38px;
  color:#444;
  transition:all .4s;
  &:hover{
    background-color:#f4f4f6;
  }
}
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
