import { defineStore } from 'pinia'
import { ColumnProps } from '@/components/column-list/index.vue'
export interface CacheColumnProps {
  page: number
  data: ColumnProps []
}
// 对请求过对数据进行缓存, 防止重复请求, page 作为键, 数据作为值
const useColumnStore = defineStore('column', {
  state () {
    return {
      result: [] as CacheColumnProps []
    }
  },
  actions: {
    cacheColumn (page: number, list: ColumnProps []) {
      const columnIndex = this.result.findIndex(c => c.page === page)
      this.result.push({
        page,
        data: list
      })
      if (columnIndex >= 0) {
        this.result.splice(columnIndex, 1)
      }
      console.log(this.result)
    }
  }
})
export default useColumnStore
