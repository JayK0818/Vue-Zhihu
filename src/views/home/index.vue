<template>
  <div class="page">
    <navigation-bar/>
    <loading v-if="spinning"/>
    <div class="column-wrapper-header">
      <div class="logo"></div>
      <div class="title">随心写作,自由表达</div>
      <div class="button-container">
        <v-button type="default" @click.stop='createColumn'>开始写文章</v-button>
      </div>
    </div>
    <div class="column-recommendation-wrapper">
      <div class="column-title">专栏 · 发现</div>
      <div class="column-container">
        <template v-if="columnList.length">
          <column-list :list='columnList'/>
        </template>
      </div>
      <div class="button-container">
        <v-button type="default" size="small" @click="changeColumn" :loading="loading">
          <template #prefix>
            <sync-outlined/>
          </template>
          换一换
        </v-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import NavigationBar from '@/components/navigation-bar/index.vue'
import VButton from '@/components/v-button/index.vue'
import ColumnList, { ColumnProps } from '@/components/column-list/index.vue'
import { SyncOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, onMounted } from 'vue'
import axios from '@/common/js/axios.js'
import Loading from '@/components/loading/index.vue'
import { useRouter } from 'vue-router'
import useColumnStore from '@/store/column'
import { storeToRefs } from 'pinia'

const ColumnListLength = 2

export default defineComponent({
  name: 'home',
  components: {
    [NavigationBar.name]: NavigationBar,
    [VButton.name]: VButton,
    [SyncOutlined.name]: SyncOutlined,
    [ColumnList.name]: ColumnList,
    [Loading.name]: Loading
  },
  setup () {
    const columnList = ref<ColumnProps []>([])
    const loading = ref<boolean>(false)
    const spinning = ref<boolean>(false)
    const page = ref<number>(0)
    const router = useRouter()
    const store = useColumnStore()
    const { cacheColumn } = store // 获取缓存数据的方法,没请求一次,就将数据缓存起来
    const { result } = storeToRefs(store)
    function getColumnList (page): Promise<ColumnProps[]> {
      return new Promise(resolve => {
        axios({
          url: '/api/get_columns',
          method: 'get',
          params: {
            id: page
          }
        }).then(res => {
          resolve(res)
        }).catch(() => {
          resolve([])
        })
      })
    }
    onMounted(() => {
      if (result.value.length) {
        const lastColumn = result.value[result.value.length - 1]
        columnList.value = lastColumn.data
        page.value = lastColumn.page
      } else {
        spinning.value = true
        getColumnList(page.value).then(list => {
          columnList.value = list
          cacheColumn(page.value, list) // 如果没有缓存数据,将第一次请求的数据添加进缓存
        }).finally(() => {
          spinning.value = false
        })
      }
    })
    function changeColumn ():void {
      if (page.value >= ColumnListLength) {
        page.value = 0
      } else {
        page.value += 1
      }
      const findColumn = result.value.find(c => c.page === page.value)
      if (result.value.length && findColumn) {
        columnList.value = findColumn.data
        cacheColumn(page.value, findColumn.data)
      } else {
        loading.value = true
        spinning.value = true
        getColumnList(page.value).then(list => {
          columnList.value = list
          cacheColumn(page.value, list)
        }).finally(() => {
          loading.value = false
          spinning.value = false
        })
      }
    }
    function createColumn ():void {
      router.push('/create')
    }
    return {
      columnList,
      changeColumn,
      loading,
      spinning,
      createColumn
    }
  }
})
</script>

<style scoped lang='scss'>
.page{
  padding-bottom:20px;
  background-color:#fbfcfc;
}
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
.column-recommendation-wrapper{
  padding-top:10px;
  padding-bottom:10px;
  .button-container{
    min-width:666px;
    margin-top:20px;
    text-align:center;
  }
}
.column-container{
  margin:30px auto 0;
  width:888px;
  display:flex;
  flex-wrap:wrap;
}
@media screen and (max-width:1020px) {
  .column-container{
    width:666px;
  }
}
.column-title{
  font-weight:bold;
  color:#121212;
  text-align:center;
}
</style>
