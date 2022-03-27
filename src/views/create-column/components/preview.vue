<template>
  <div class='preview-wrapper'>
    <div class="preview-container" ref='container'>
      <div class="header">
        <span class='title'>{{title}}</span>
        <span class='icon' @click.stop='close'><CloseOutlined/></span>
      </div>
      <div class="body">
        <div v-html='content'></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'preview',
  components: {
    [CloseOutlined.name]: CloseOutlined
  },
  props: {
    content: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  setup (props, context) {
    const container = ref<null | HTMLElement>(null)
    onMounted(() => {
      if (container.value) {
        let height: number = window.innerHeight
        height = height % 2 === 0 ? height : height - 1
        container.value.style.height = height + 'px'
      }
    })
    function close () {
      context.emit('close')
    }
    return {
      container,
      close
    }
  }
})
</script>
<style lang="scss" scoped>
.preview-wrapper{
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background-color:rgba(0,0,0,.65);
  z-index:100;
  .preview-container{
    position:relative;
    display:flex;
    flex-direction: column;
    width: 900px;
    height:100%;
    background-color:#fff;
    left:50%;
    transform:translateX(-50%);
  }
  .body{
    padding: 0 10px;
    flex:1;
    min-height:0;
    overflow:auto;
    &::-webkit-scrollbar{
      display:none;
    }
  }
  .title{
    font-size:18px;
    color:#000;
    font-weight:bold;
    white-space:nowrap;
  }
  .header{
    height:40px;
    line-height:40px;
    padding-left:20px;
    overflow:hidden;
    text-overflow:ellipsis;
    border-bottom:1px solid #e8e8e8;
  }
  .icon{
    position:absolute;
    right:-30px;
    top:2px;
    color:#fff;
    font-size:18px;
    cursor:pointer;
    transition:all .4s;
    &:hover{
      color:red;
    }
  }
  h1,h2,h3,h4,h5,h6{
    font-weight:bold;
  }
}
</style>
