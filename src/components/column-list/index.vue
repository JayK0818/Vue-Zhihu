<template>
  <div class='column-card' v-for='column in list' :key='column.id'>
    <div class="avatar">
      <img :src="column.image_url" alt="">
    </div>
    <div class="column-title">{{column.title}}</div>
    <div class="column-intro">{{column.intro}}</div>
    <div class="detail">
      <span class="followers">{{formatFlowers(column.followers)}} 人关注</span>
      <i style="padding:0 3px;">|</i>
      <span class="article">{{column.articles_count}} 篇文章</span>
    </div>
    <div class="button-container">
      <v-button type="primary" size="small">进入专栏</v-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { numberTransform } from '@/common/js/util'
import VButton from '@/components/v-button/index.vue'

export interface ColumnProps {
  id: number
  // eslint-disable-next-line camelcase
  image_url: string
  title: string
  intro: string
  followers: number
  // eslint-disable-next-line camelcase
  articles_count: number,
  url: string
}

export default defineComponent({
  name: 'column-list',
  props: {
    list: {
      type: Array as PropType<ColumnProps []>,
      required: true
    }
  },
  components: {
    [VButton.name]: VButton
  },
  setup () {
    function formatFlowers (flowers: number): number | string { // 格式化关注数为千分位
      return numberTransform(flowers)
    }
    return {
      formatFlowers
    }
  }
})
</script>
<style lang="scss" scoped>
.column-card{
  display:flex;
  flex-direction:column;
  margin:0 8px 16px;
  width:206px;
  padding:26px 0 23px;
  background-color:#fff;
  transition:all .3s;
  box-shadow:0 1px 10px 0 rgba(0,0,0,.1);
  .avatar{
    margin:0 auto;
    width:48px;
    height:48px;
    overflow:hidden;
    border-radius:50%;
    img{
      width:100%;
    }
  }
  .column-title{
    text-align:center;
    padding-top:16px;
    font-weight:600;
    color:#121212;
    font-size:14px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .column-intro{
    flex:1;
    font-size: 13px;
    line-height: 21px;
    padding-top: 10px;
    text-align: center;
    color:grey;
    word-break: break-all;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .detail{
    padding-top:20px;
    font-size:13px;
    text-align:center;
    color:grey;
  }
  .button-container{
    padding-top:20px;
    text-align:center;
  }
}
</style>
