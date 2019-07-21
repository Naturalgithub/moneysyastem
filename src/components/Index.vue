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
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
          el-menu: 菜单组件
          el-submenu: 子菜单
          el-menu-item-group
          el-menu-item 菜单项
        -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened>

          <el-submenu index="1">
            <!-- 设置子菜单的显示内容, 具名插槽 -->
            <template v-slot:title>
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <!-- 设置子菜单的显示内容, 具名插槽 -->
            <template v-slot:title>
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$confirm('亲, 你确认要退出系统吗?', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除 token
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('退出成功')
      }).catch(() => {
        this.$message('退出已取消')
      })
    }
  }
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
        color: #545c64;
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
    .el-menu {
      border: none;
    }
  }

  .el-main {
    background-color: #eaeef1;
  }
}
</style>
