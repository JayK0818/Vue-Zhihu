<template>
  <div class="page">
    <navigation-bar/>
    <div class="column-wrapper-header">
      <div class="logo"></div>
      <div class="title">随心写作,自由表达</div>
      <div class="button-container">
        <v-button>开始写文章</v-button>
      </div>
    </div>
    <div class="column-title">专栏 · 发现</div>
  </div>
</template>

<script lang='ts'>
import NavigationBar from '@/components/navigation-bar/index.vue'
import VButton from '@/components/v-button/index.vue'
import { RedoOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import axios from '@/common/js/axios.js'
export default defineComponent({
  name: 'home',
  components: {
    [NavigationBar.name]: NavigationBar,
    [VButton.name]: VButton,
    [RedoOutlined.name]: RedoOutlined
  },
  setup () {
    axios.get('/api/players').then(res => {
      console.log(res)
    })
  }
})
</script>

<style scoped lang='scss'>
.column-wrapper-header{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  height:470px;
  background-image:url('./images/patterns.png');
  background-repeat:no-repeat;
  background-position:center;
  .logo{
    margin-top:136px;
    background-image:url('./images/logo.png');
    background-size: 129px 179px;
    width: 129px;
    height:179px;
    background-position:center;
    overflow:hidden;
  }
  .title{
    padding-top:20px;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: .5em;
    line-height: 24px;
    text-align: center;
    width: 100%;
  }
  .button-container{
    margin-top:30px;
  }
}
.column-title{
  font-weight:bold;
  color:#000;
}
</style>
