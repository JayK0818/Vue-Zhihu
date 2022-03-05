<template>
  <div class='dropdown-container'>
    <button class='button primary' @click.stop='toggle'>Hello {{title}} <caret-down-outlined /></button>
    <ul class='dropdown-menu shadow' v-show='visible'>
      <dropdown-item>hello world</dropdown-item>
      <dropdown-item disabled>hello world</dropdown-item>
      <dropdown-item>hello world</dropdown-item>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import DropdownItem from './components/dropdown-item.vue'
export default defineComponent({
  name: 'drop-down',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    [CaretDownOutlined.name]: CaretDownOutlined,
    [DropdownItem.name]: DropdownItem
  },
  setup () {
    const visible = ref<boolean>(false)
    function toggle ():void {
      visible.value = !visible.value
    }
    return {
      visible,
      toggle
    }
  }
})
</script>
<style lang="scss" scoped>
.dropdown-container {
  display:inline-block;
  position: relative;
  border-radius:2px;
  .dropdown-menu{
    position:absolute;
    right:0;
    top:100%;
    margin-top:2px;
    min-width:140px;
    padding:5px 0;
    font-size:14px;
    text-align:left;
    z-index:1000;
    background-color:#fff;
  }
}
</style>
