<template>
  <navigation-bar>
    <template v-slot:column>
      <div v-if='title' class='column-slot-container'>
        <div style='font-size:12px;color:#8590a6;padding-bottom:4px;'>专栏</div>
        <div class='column-title'>{{title}}</div>
      </div>
    </template>
  </navigation-bar>
  <div class="page">
    <loading v-if="spinning"/>
    <div v-if="list.length" class="column-container">
      <div class="column-item" v-for="item in list" :key="item.id">
        <div class="title">{{item.title}}</div>
        <template v-if="!item.is_fold">
          <div class="author">
            <img :src="item.author.avatar_url" alt="" class="author-image">
            <span class="author-name">{{item.author.name}}</span>
            <span class="description">{{item.author.headline}}</span>
          </div>
          <div class="agree-text">{{item.voteup_count}} 人赞同了该文章</div>
          <div class="title-image">
            <img :src="item.title_image" alt="" style="max-width:100%">
          </div>
        </template>
        <div class="content">
          <div v-if="item.is_fold" class="excerpt-container">
            <div class='excerpt-image'><img v-lazy='item.title_image'></div>
            <div class="excerpt">
              <span>{{item.excerpt}}</span>
              <span class="read-more" @click.stop="handleToggleItemFold(item)">
                阅读全文<i class="icon"><down-outlined/></i>
              </span>
            </div>
          </div>
          <template v-else>
            <div v-html="item.content"></div>
            <span @click.stop="handleToggleItemFold(item)" class="read-more">收起<i class="icon"><up-outlined/></i></span>
          </template>
        </div>
      </div>
    </div>
  </div>
  <back-top/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import NavigationBar from '@/components/navigation-bar/index.vue'
import Loading from '@/components/loading/index.vue'
import { useRoute } from 'vue-router'
import axios from '@/common/js/axios.js'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import BackTop from '@/components/back-top/index.vue'

export default defineComponent({
  components: {
    [NavigationBar.name]: NavigationBar,
    [Loading.name]: Loading,
    [DownOutlined.name]: DownOutlined,
    [UpOutlined.name]: UpOutlined,
    [BackTop.name]: BackTop
  },
  name: 'column-page',
  setup () {
    const spinning = ref<boolean>(true)
    const list = ref([])
    const title = ref<string>('')
    const route = useRoute()
    function getColumnItem () {
      axios({
        url: '/api/get_column_item',
        method: 'get',
        params: {
          id: route.params.id
        }
      }).then(res => {
        const { title: _title, list: _list } = res
        title.value = _title
        list.value = _list.map(item => ({ ...item, is_fold: true }))
        setDocumentTitle(_title)
      }).finally(() => {
        spinning.value = false
      })
    }
    function handleToggleItemFold (item) {
      item.is_fold = !item.is_fold
    }
    onMounted(() => {
      getColumnItem()
    })
    function setDocumentTitle (title: string): void {
      document.title = `${title} - 知乎`
    }
    return {
      spinning,
      list,
      title,
      handleToggleItemFold
    }
  }
})
</script>

<style scoped lang="scss">
.column-slot-container{
  margin-left:30px;
  padding-left:8px;
  border-left:1px solid #e8e8e8;
  display:inline-block;
  .column-title{
    font-size:14px;
    font-weight:bold;
    color:#212121;
  }
}
.page{
  color:#121212;
  padding-top:16px;
  background-color:#f6f6f6;
  .column-container{
    margin:0 auto;
    width:740px;
    background-color:#fff;
    .column-item{
      cursor:pointer;
      padding:16px 20px;
      border-bottom:1px solid #e8e8e8;
    }
    .excerpt-container{
      display:flex;
      justify-content:space-between;
      .excerpt{
        padding-left:10px;
        flex:1;
        min-width:0;
      }
      .excerpt-image{
        width:180px;
        height:110px;
        text-align:center;
        background-color:rgba(18,18,18,.02);
        img{
          max-width:100%;
          max-height:100%;
          transition:all .3s;
        }
      }
    }
    .title-image{
      padding:10px 0;
      text-align:center;
    }
    .agree-text{
      padding:10px 0;
      font-size:14px;
      color:#8590a6;
    }
    .content{
      padding-top:10px;
      line-height:24px;
      font-size:15px;
      transition:all .3s;
      user-select:none;
      &:hover{
        color:rgba(0,0,0,.65);
      }
    }
    .read-more{
      font-size:14px;
      margin-left:4px;
      color:#175199;
      white-space:nowrap;
      .icon{
        font-size:14px;
      }
    }
  }
  .title{
    padding:6px 0;
    font-size:18px;
    font-weight:bold;
  }
  .author{
    padding:8px 0;
    display:flex;
    align-items:center;
    .author-image{
      width:30px;
      height:30px;
    }
    .author-name{
      padding-left:6px;
      padding-right:6px;
      color:#444;
      font-size:15px;
    }
    .description{
      color:#646464;
      font-size:14px;
    }
  }
}
</style>
