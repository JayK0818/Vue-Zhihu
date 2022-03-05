<template>
  <li class='dropdown-item' :class='{disabled}'>
    <slot></slot>
  </li>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'dropdown-item',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style lang="scss" scoped>
.dropdown-item{
  padding:6px 8px;
  cursor:pointer;
  &:not(.disabled):hover{
    background-color:#f5f5f5;
  }
  &.disabled{
    color:#878787;
    cursor:not-allowed;
  }
}
</style>
