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
        <textarea class='textarea' placeholder='请输入正文'></textarea>
      </div>
    </div>
    <div class='preview-container'></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NavigationBar from '@/components/navigation-bar/index.vue'
export default defineComponent({
  components: {
    [NavigationBar.name]: NavigationBar
  },
  setup () {
    console.log('hello world')
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
  display:flex;
  justify-content:space-between;
  min-width:1000px;
}
.preview-container{
  padding:10px;
  flex:1;
}
.content{
  padding:10px;
  flex:1;
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
    height:480px;
  }
}
</style>
