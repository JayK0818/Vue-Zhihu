<template>
  <div class='page'>
    <validate-form @submit="login">
      <div class="item">
        <div class="subtitle">邮箱</div>
        <validate-input
          :rules='emailRule'
          placeholder='请输入邮箱'
          v-model='email'
          type="text"
        >
          <template #prefix><mail-outlined/></template>
        </validate-input>
      </div>
      <div class="item">
        <div class="subtitle">密码</div>
        <validate-input
          :rules='passwordRule'
          placeholder='请输入密码'
          v-model='password'
          type="text"
        >
          <template #prefix><key-outlined/></template>
        </validate-input>
      </div>
      <template v-slot:submit>
        <button class="primary block">注册</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { MailOutlined, KeyOutlined } from '@ant-design/icons-vue'
import ValidateInput, { RulesProp } from '@/components/validate-input/index.vue'
import ValidateForm from '@/components/validate-form/index.vue'

const emailRule: RulesProp = [
  {
    type: 'required',
    message: '邮箱不得为空'
  },
  {
    type: 'email',
    message: '请输入合法的邮箱地址'
  }
]

const passwordRule: RulesProp = [
  {
    type: 'required',
    message: '密码不得为空'
  }
]

export default defineComponent({
  name: 'login',
  components: {
    [ValidateInput.name]: ValidateInput,
    [MailOutlined.name]: MailOutlined,
    [ValidateForm.name]: ValidateForm,
    [KeyOutlined.name]: KeyOutlined
  },
  setup () {
    const email = ref<string>('')
    const password = ref<string>('')
    const login = (value:boolean) => {
      console.log(value)
    }
    return {
      emailRule,
      email,
      password,
      passwordRule,
      login
    }
  }
})
</script>
<style lang="scss" scoped>
.item{
  padding:12px 0;
  .subtitle{
    font-size:16px;
    padding:4px 0 8px 0;
    color:rgba(0,0,0,.65);
  }
}
</style>
