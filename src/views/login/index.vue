<template>
  <div class='page'>
    <div class="login-logo"></div>
    <div class="login-form">
      <span class="title">密码登录</span>
      <validate-form @submit="login">
        <div class="item">
          <div class="subtitle">用户名</div>
          <validate-input
            :rules='userRule'
            placeholder='请输入用户名 (admin)'
            v-model='username'
            type="text"
          >
            <template #prefix><user-outlined/></template>
          </validate-input>
        </div>
        <div class="item">
          <div class="subtitle">密码</div>
          <validate-input
            :rules='passwordRule'
            placeholder='请输入密码 (123456)'
            v-model='password'
            type="password"
          >
            <template #prefix><key-outlined/></template>
          </validate-input>
        </div>
        <template v-slot:submit>
          <button class="primary-button block">登录</button>
        </template>
      </validate-form>
      <div class="info">未注册手机验证后自动登录，注册即代表同意《知乎协议》《隐私保护指引》</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { UserOutlined, KeyOutlined } from '@ant-design/icons-vue'
import ValidateInput, { RulesProp } from '@/components/validate-input/index.vue'
import ValidateForm from '@/components/validate-form/index.vue'
import axios from '@/common/js/axios.js'
import sha1 from 'sha1'
/* const emailRule: RulesProp = [
  {
    type: 'required',
    message: '邮箱不得为空'
  },
  {
    type: 'email',
    message: '请输入合法的邮箱地址'
  }
] */
const passwordRule: RulesProp = [
  {
    type: 'required',
    message: '密码不得为空'
  }
]
const userRule: RulesProp = [
  {
    type: 'required',
    message: '用户名不得为空'
  }
]

export default defineComponent({
  name: 'login',
  components: {
    [ValidateInput.name]: ValidateInput,
    [UserOutlined.name]: UserOutlined,
    [ValidateForm.name]: ValidateForm,
    [KeyOutlined.name]: KeyOutlined
  },
  setup () {
    const username = ref<string>('')
    const password = ref<string>('')
    const login = (value:boolean) => {
      if (value) {
        axios({
          url: '/api/login',
          method: 'post',
          data: {
            username: username.value,
            password: sha1(password.value)
          }
        })
      }
    }
    return {
      username,
      password,
      passwordRule,
      login,
      userRule
    }
  }
})
</script>
<style lang="scss" scoped>
.page{
  display:flex;
  flex-direction:column;
  justify-content:center;
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index:-1;
  min-height:600px;
  background-color:#b8e5f8;
  background-image:url('./images/sign_bg.png');
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
}
.login-logo{
  margin:0 auto 16px;
  width:128px;
  height:81px;
  background-size:128px 81px;
  background-image:url('./images/logo.png')
}
.title{
  line-height:50px;
  padding-bottom:2px;
  color:#121212;
  font-weight:bold;
  font-size:18px;
  border-bottom:2px solid #1890ff;
}
.login-form{
  margin:0 auto;
  width:368px;
  padding:12px 24px 30px;
  background-color:#fff;
  transition:all .3s;
  border-radius:4px;
  &:hover{
    box-shadow:0 2px 10px 0 rgba(0,0,0,.1);
  }
}
.item{
  padding:8px 0;
  background-color:#fff;
  .subtitle{
    font-size:16px;
    padding:4px 0 8px 0;
    color:rgba(0,0,0,.85);
  }
}
.primary-button{
  margin-top:20px;
  margin-bottom:20px;
  height:36px;
  background-color:#1890ff;
  color:#fff;
  font-size:16px;
  transition:all .45s;
  &:hover{
    background-color:#40a9ff;
  }
  &:active{
    background-color:#096dd9;
  }
}
.info{
  font-size:13px;
  line-height:18px;
  color:grey;
}
</style>
