<template>
  <teleport to="body">
    <template v-if="visible">
      <div class="back-top-container" title="回到顶部">
        <span class="icon" @click.stop="handleTop"><vertical-align-top-outlined/></span>
      </div>
    </template>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { VerticalAlignTopOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'back-top',
  components: {
    [VerticalAlignTopOutlined.name]: VerticalAlignTopOutlined
  },
  setup () {
    const visible = ref<boolean>(false)
    function listenScroll () {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      if (top >= 400) {
        if (!visible.value) {
          visible.value = true
        }
      } else {
        if (visible.value) {
          visible.value = false
        }
      }
    }
    function handleTop () { // 滚动到顶部
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    onMounted(() => {
      window.addEventListener('scroll', listenScroll, false)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', listenScroll, false)
    })
    return {
      handleTop,
      visible
    }
  }
})
</script>

<style scoped lang="scss">
.back-top-container{
  position:fixed;
  bottom:20px;
  right:20px;
  width:40px;
  height:40px;
  line-height:40px;
  border-radius:50%;
  color:#fff;
  text-align:center;
  cursor:pointer;
  background-color:rgba(0,0,0,.45);
  transition:all .4s;
  &:hover{
    background-color:rgba(0,0,0,.65);
  }
  .icon{
    font-size:20px;
  }
}
</style>
