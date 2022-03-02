<template>
  <div></div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'

export interface ColumnList {
  id: number
  avatar: string
  description: string
  title: string
}

export default defineComponent({
  data () {
    return {
    }
  },
  props: {
    list: {
      type: Array as PropType<ColumnList []>,
      required: true
    }
  },
  setup () {
    console.log('hello')
  }
})
</script>
<style lang="scss" scoped>
</style>
