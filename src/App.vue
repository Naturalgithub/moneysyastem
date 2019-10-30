<template>
  <div id="app">
    <router-view />
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
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  .el-breadcrumb {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #c5c5c5;
    margin-bottom: 10px;
  }
}
</style>
