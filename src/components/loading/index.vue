<template>
  <teleport to="body">
    <div class="loading-wrapper">
      <div class="loading-container">
        <div class="icon"><loading-outlined/></div>
        <div class="text">拼命加载数据...</div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { defineComponent } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'loading',
  components: {
    [LoadingOutlined.name]: LoadingOutlined
  }
})
</script>

<style scoped lang="scss">
.loading-wrapper{
  display:flex;
  flex-direction:column;
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background-color:rgba(255,255,255,.5);
  z-index:100;
  .loading-container{
    position:relative;
    top:50%;
    text-align:center;
  }
  .icon{
    padding:6px 0;
    font-size:36px;
  }
  .text{
    padding:10px 0;
    font-size:13px;
    color:#11a668;
  }
}
</style>
