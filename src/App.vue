<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '哈哈'
    }
  }
}

</script>

<style lang="scss">
// scss 定义变量的方式
// $bgColor: #2d434c;
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
html, body, #app {
  width: 100%;
  height: 100%;
}
</style>
