<template>
  <div class="home">
    <navigation-bar :user='user'/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar, { UserProps } from '@/components/navigation-bar/index.vue'

const user: UserProps = {
  name: 'kyrie',
  id: 1,
  isLogin: false
}

export default defineComponent({
  name: 'Home',
  components: {
    [NavigationBar.name]: NavigationBar
  },
  setup () {
    return {
      user
    }
  }
})
</script>

<style lang='scss'>
</style>
