<template>
  <navigation-bar>
    <template v-slot:title>
      <span class='title'>写文章</span>
    </template>
  </navigation-bar>
  <div class="page">
    <div class="content">
      <div class="item">
        <input type="text" class='column-input' placeholder='请输入文章标题 (最多100个字)' v-model.trim='title'>
      </div>
      <div class='item'>
        <textarea class='textarea' placeholder='请输入正文 (支持markdown语法)' v-model='content'></textarea>
      </div>
    </div>
    <div class='info-container'>
      <span class='primary-link' @click.stop='preview'>预览</span>
      <v-button type='primary' size='small'>发布</v-button>
    </div>
  </div>
  <back-top/>
  <template v-if='visible'>
    <teleport to='body'>
      <preview :title='title' :content='htmlString' @close='visible = false'/>
    </teleport>
  </template>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue'
import NavigationBar from '@/components/navigation-bar/index.vue'
import BackTop from '@/components/back-top/index.vue'
import VButton from '@/components/v-button/index.vue'
import message from '@/components/message/index'
import Preview from './components/preview.vue'
/* @ts-ignore */
import { marked } from 'marked'
import hljs from 'highlight.js'

export default defineComponent({
  components: {
    [NavigationBar.name]: NavigationBar,
    [BackTop.name]: BackTop,
    [VButton.name]: VButton,
    [Preview.name]: Preview
  },
  setup () {
    const content = ref<string>('')
    const title = ref<string>('')
    const visible = ref<boolean>(false)
    const htmlString = ref<string>('')
    onMounted(() => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return hljs.highlight(code, { language: 'javascript' }).value
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      })
    })
    function preview () { // 开始预览
      if (!title.value) {
        message.warning('请先输入标题')
        return
      }
      if (!content.value) {
        message.warning('请先输入正文')
        return
      }
      visible.value = true
      htmlString.value = marked.parse(content.value)
    }
    return {
      content,
      preview,
      title,
      visible,
      htmlString
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
  padding:10px 0;
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
    min-height:500px;
  }
}
.primary-link{
  padding:0 10px;
  cursor:pointer;
  color:#11a668;
  &:hover{
    text-decoration:underline;
  }
}
</style>
