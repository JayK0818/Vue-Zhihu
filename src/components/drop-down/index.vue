<template>
  <div class='dropdown-container' ref='dropdownRef'>
    <button class='button primary' @click.stop='toggle'>hello {{title}} <caret-down-outlined /></button>
    <ul class='dropdown-menu shadow' v-show='visible'>
      <dropdown-item>
        <div class="item">
          <span class="icon"><form-outlined/></span>
          <span class="text" @click.stop='createColumn'>写文章</span>
        </div>
      </dropdown-item>
      <dropdown-item>
        <div class="item">
          <span class="icon"><edit-outlined/></span>
          <span class="text" @click.stop='goColumn'>专栏 · 发现</span>
        </div>
      </dropdown-item>
      <dropdown-item>
        <div class='item'>
          <span class='icon'><menu-outlined/></span>
          <span class='text'>我的专栏</span>
        </div>
      </dropdown-item>
      <dropdown-item>
        <div class="item" @click.stop="logout">
          <span class="icon"><logout-outlined/></span>
          <span class="text">退出登录</span>
        </div>
      </dropdown-item>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { CaretDownOutlined, LogoutOutlined, FormOutlined, EditOutlined, MenuOutlined } from '@ant-design/icons-vue'
import DropdownItem from './components/dropdown-item.vue'
import { userKey } from '@/common/js/util'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'drop-down',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    [CaretDownOutlined.name]: CaretDownOutlined,
    [DropdownItem.name]: DropdownItem,
    [LogoutOutlined.name]: LogoutOutlined,
    [FormOutlined.name]: FormOutlined,
    [EditOutlined.name]: EditOutlined,
    [MenuOutlined.name]: MenuOutlined
  },
  setup () {
    const dropdownRef = ref<null | HTMLElement>(null)
    const visible = ref<boolean>(false)
    const router = useRouter()
    function toggle ():void {
      visible.value = !visible.value
    }
    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        if (!dropdownRef.value.contains(e.target as HTMLElement) && visible.value) {
          visible.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handler, false)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler, false)
    })
    function logout (): void {
      window.localStorage.removeItem(userKey)
      router.replace('/login')
    }
    function goColumn (): void {
      router.push('/')
      hide()
    }
    function createColumn (): void {
      router.push('/create')
      hide()
    }
    function hide (): void {
      visible.value = false
    }
    return {
      visible,
      toggle,
      dropdownRef,
      logout,
      goColumn,
      createColumn
    }
  }
})
</script>
<style lang="scss" scoped>
.dropdown-container {
  display:inline-block;
  position: relative;
  border-radius:2px;
  .dropdown-menu{
    position:absolute;
    right:0;
    top:100%;
    margin-top:6px;
    min-width:140px;
    padding:6px 0;
    font-size:14px;
    text-align:left;
    z-index:1000;
    background-color:#fff;
  }
  .button{
    height:28px;
  }
  .item{
    padding:3px 0;
    color:rgb(133,144,166);
  }
  .text{
    padding-left:8px;
  }
}
</style>
