<template>
  <div class='input-wrapper' :class="{'is-validate': inputRef.error}">
    <slot name='prefix'/>
    <input
      class='input'
      @blur='inputBlur'
      :value='inputRef.value'
      @input='onValueChanged'
      v-bind='$attrs'
    >
  </div>
  <div v-if='inputRef.error' class='error-message'>{{inputRef.message}}</div>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive, onMounted } from 'vue'
import { emitter } from '../validate-form/index.vue'
interface RuleProp {
  type: 'required' | 'email' | 'password';
  message: string
}
export type RulesProp = RuleProp[]
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export default defineComponent({
  name: 'validate-input',
  inheritAttrs: false, // 不希望组件的根元素继承attribute
  props: {
    rules: {
      type: Array as PropType<RuleProp []>
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const inputRef = reactive({
      value: props.modelValue,
      error: false,
      message: ''
    })
    function onValueChanged (e: KeyboardEvent):void {
      const value = (e.target as HTMLInputElement).value
      inputRef.value = value
      context.emit('update:modelValue', value)
    }
    function inputBlur (): boolean {
      if (props.rules) {
        const flag = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.value.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.value)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !flag
        return flag
      }
      return true
    }
    onMounted(() => {
      emitter.emit('validate-form', inputBlur)
    })
    return {
      inputRef, inputBlur, onValueChanged
    }
  }
})
</script>
<style lang="scss" scoped>
.input-wrapper{
  padding:0 6px;
  display:flex;
  align-items:center;
  border:1px solid #d9d9d9;
  height:36px;
  transition:all .3s;
  .input {
    padding:0;
    outline:none;
    font-size:14px;
    color:rgba(0,0,0,.65);
    flex:1;
    min-width:0;
    text-indent:6px;
    height:100%;
    &::-webkit-input-placeholder{
      color:rgba(0,0,0,.35);
    }
  }
  .icon{
    padding:0 5px;
    color: rgba(0,0,0,.5);
  }
  &.is-validate{
    border-color:red;
  }
}
  .error-message{
    font-size:14px;
    color:red;
    padding:6px 0;
  }
</style>
