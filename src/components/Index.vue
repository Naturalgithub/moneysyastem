<template>
  <el-container class="index">
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        欢迎, xxx
        <a href="#">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
/* 当我们给 style 标签添加 scoped 属性, 表示样式只在当前组件生效
   原理:
    1. 给当前组件上所有的元素, 都生成了一个随机的自定义属性
    2. 给当前组件上 style 中所有样式的选择器也添加了一个 属性选择器
*/
.index {
  height: 100%;
  .el-header {
    background-color: #ddd;
    display: flex;
    padding: 0;

    .logo {
      width: 200px;
      padding: 10px;
      img {
        height: 40px;
        display: block;
        margin: 0 auto;
      }
    }
    .title {
      flex: 1;
      text-align: center;

      h1 {
        font-size: 24px;
        height: 60px;
        line-height: 60px;
      }
    }
    .logout {
      width: 200px;
      font-weight: 700;
      text-align: right;
      padding: 10px;
      line-height: 40px;
      a {
        color: orange;
      }
    }
  }

  .el-aside {
    background-color: #545c64;
  }

  .el-main {
    background-color: #eaeef1;
  }
}
</style>
