<template>
  <div class="message-content" ref="messageWrapper">
    <span class="icon" :class="{[iconMap[type]]: true}">
      <template v-if="type === 'success'">
        <check-circle-outlined/>
      </template>
      <template v-else-if="type === 'error'">
        <close-circle-outlined/>
      </template>
      <template v-else-if="type === 'warning'">
        <exclamation-circle-outlined/>
      </template>
      <template v-else>
        <loading-outlined/>
      </template>
    </span>
    <span class="text">{{text}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MessageType } from './index'
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons-vue'
const iconMap = {
  error: 'error',
  warning: 'warning',
  loading: 'loading',
  success: 'success'
}
export default defineComponent({
  name: 'message',
  components: {
    [CheckCircleOutlined.name]: CheckCircleOutlined,
    [ExclamationCircleOutlined.name]: ExclamationCircleOutlined,
    [CloseCircleOutlined.name]: CloseCircleOutlined,
    [LoadingOutlined.name]: LoadingOutlined
  },
  props: {
    type: {
      type: String as PropType<MessageType>,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup () {
    return {
      iconMap
    }
  }
})
</script>

<style scoped lang="scss">
.message-content{
  margin-top:10px;
  display:inline-block;
  padding:8px 12px;
  font-size:14px;
  background-color:#fff;
  border-radius:2px;
  box-shadow:0 2px 10px 0 rgba(0,0,0,.1);
}
.icon{
  padding-right:8px;
  &.success{
    color:#52c41a;
  }
  &.error{
    color:red;
  }
  &.warning{
    color:#52c41a;
  }
  &.loading{
    color:#1890ff;
  }
}
.text{
  color:rgba(0,0,0,.85);
}
</style>
