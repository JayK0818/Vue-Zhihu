<template>
  <navigation-bar>
    <template v-slot:title>
      <span class='title'>写文章</span>
    </template>
  </navigation-bar>
  <div class="page">
    <div class="content">
      <div class="item">
        <input type="text" class='column-input' placeholder='请输入文章标题 (最多100个字)'>
      </div>
      <div class='item'>
        <textarea class='textarea' placeholder='请输入正文' v-model='content'></textarea>
      </div>
    </div>
    <div class='info-container'>
    </div>
  </div>
  <back-top/>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import NavigationBar from '@/components/navigation-bar/index.vue'
import BackTop from '@/components/back-top/index.vue'
// @ts-ignore
import { marked } from 'marked'
export default defineComponent({
  components: {
    [NavigationBar.name]: NavigationBar,
    [BackTop.name]: BackTop
  },
  setup () {
    const content = ref<string>('')
    watch(content, (newValue) => {
      const string = marked(newValue)
      console.log(string)
    })
    return {
      content
    }
  }
})
</script>
<style lang="scss" scoped>
.title{
  margin-left:30px;
  padding-left:16px;
  font-weight:bold;
  font-size:16px;
  vertical-align:6px;
  border-left:1px solid #e8e8e8;
}
.page{
  margin:0 auto;
  max-width:1200px;
  min-width:900px;
}
.content{
  padding:10px;
  .textarea,.column-input{
    width:100%;
    min-width:0;
    outline:none;
    border:1px solid #d9d9d9;
    &:-webkit-input-placeholder{
      color:rgba(0,0,0,.25);
    }
  }
  .column-input{
    padding:0;
    text-indent:6px;
    height:36px;
    font-size:16px;
    font-weight:bold;
  }
  .item{
    padding:3px;
  }
  .textarea{
    box-sizing:border-box;
    padding:8px;
    font-size:14px;
    resize:none;
    min-height:480px;
  }
}
</style>
