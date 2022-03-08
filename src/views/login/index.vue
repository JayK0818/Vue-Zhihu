<template>
  <div class='page'>
    <validate-input
      :rules='emailRule'
      placeholder='请输入邮箱'
      v-model='email'
    ><mail-outlined/></validate-input>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { MailOutlined } from '@ant-design/icons-vue'
import ValidateInput, { RulesProp } from '@/components/validate-input/index.vue'

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

export default defineComponent({
  name: 'login',
  components: {
    [ValidateInput.name]: ValidateInput,
    [MailOutlined.name]: MailOutlined
  },
  setup () {
    const email = ref<string>('')
    return {
      emailRule, email
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
