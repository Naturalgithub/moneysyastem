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
$bgColor: #fff;
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
body {
  background: $bgColor;
}
</style>
