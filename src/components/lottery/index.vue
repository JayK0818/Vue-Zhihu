<template>
  <div>
    <input type="text" v-model.trim='red' placeholder='排除红球数字' class='input'>
    <input type="text" v-model.trim='green' placeholder='排除绿球数字' class='input'>
    <button class='button primary' @click.stop='click'>click</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import data from './data.js'
export default defineComponent({
  setup () {
    const red = ref<string>('')
    const green = ref<string>('')
    function click () {
      const result = createNumber()
      console.log(result)
    }
    function createNumber () {
      const array1: number[] = []
      const array2: number[] = []
      while (array1.length < 5) {
        const number = Math.floor(Math.random() * 35 + 1)
        if (red.value) {
          const string = red.value.replace('，', ',')
          if (!string.includes(number.toString()) && !array1.includes(number)) {
            array1.push(number)
          }
        } else {
          if (!array1.includes(number)) {
            array1.push(number)
          }
        }
      }
      while (array2.length < 2) {
        const number = Math.floor(Math.random() * 12 + 1)
        if (green.value) {
          const string = green.value.replace('，', ',')
          if (!string.includes(number.toString()) && !array2.includes(number)) {
            array2.push(number)
          }
        } else {
          if (!array2.includes(number)) {
            array2.push(number)
          }
        }
      }
      array1.sort((a, b) => a - b)
      array2.sort((a, b) => a - b)
      const string = [...array1, ...array2].join() // 所有字符串
      const findIndex = data.findIndex(item => {
        const sliceString = item.split(',').slice(0, 5).join()
        return array1.join() === sliceString
      })
      if (data.includes(string) || findIndex >= 0) {
        createNumber()
      } else {
        return string
      }
    }
    return {
      click,
      red,
      green
    }
  }
})
</script>
<style lang="scss" scoped>
.input{
  height:28px;
  width:240px;
  border:1px solid #e8e8e8;
  text-indent:4px;
}
.button{
  height:30px;
  width: 60px;
}
</style>
