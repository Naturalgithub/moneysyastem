<template>
  <el-container class="index">
    <el-header>
      <div class="logo">
        <img src="./../assets/231231.png" alt />
      </div>
      <div class="title">
        <h1>
          HBTE财务管理系统
          <span style="font-size:16px">(v1.0.0)</span>
        </h1>
      </div>
      <div class="logout">
        {{userName}}&nbsp;&nbsp;&nbsp;
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px">
        <!--
          el-menu: 菜单组件
          el-submenu: 子菜单
          el-menu-item-group
          el-menu-item 菜单项
        -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/MoneyManagement">货币管理</el-menu-item>
              <el-menu-item index="/CustomerManagement">客户管理</el-menu-item>
              <el-menu-item index="/AccountingItem">会计科目管理</el-menu-item>
              <el-menu-item index="/BankManagement">银行管理</el-menu-item>
              <el-menu-item index="/CompanyInfo">公司信息管理</el-menu-item>
              <el-menu-item index="/ItemInfo">项目信息管理</el-menu-item>
              <el-menu-item index="/ItemLine ">产品线管理</el-menu-item>
              <el-menu-item index="/PayPal">收款信息管理</el-menu-item>
              <el-menu-item index="/DepartmentInfo">部门信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-suitcase-1"></i>
              <span>收支系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="InOutWrite">收款录入</el-menu-item>
              <el-menu-item index="InOutAddWrite">付款录入</el-menu-item>
              <el-menu-item index="InOutQuery">收支单据查询</el-menu-item>
              <el-menu-item index="InOutManagement">部门收支汇总表</el-menu-item>
              <el-menu-item index="/PLine">产品线收支表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-lock"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="Useradd">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>审批管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="ApplicationList">申请列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="ToDoList">待办事项</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      menuList: []
    }
  },
  computed: {
    defaultIndex () {
      return this.$route.path.slice(1).split('-')[0]
    }
  },
  created () {
    this.xuanname()
  },
  methods: {
    logout () {
      this.$confirm('亲, 你确认要退出系统吗?', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除 token
          localStorage.removeItem('data')
          this.$axios.get('hbte-financial/hbte/outLogin')
          this.$router.push('/login')
          this.$message.success('退出成功')
        })
        .catch(() => {
          this.$message('退出已取消')
        })
    },
    xuanname () {
      let aa = JSON.parse(localStorage.getItem('data'))
      console.log(aa)
      this.userName = aa.userName
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: red;
  // height: 1500px;
  max-height: 2000px;
}
/* 当我们给 style 标签添加 scoped 属性, 表示样式只在当前组件生效
   原理:
    1. 给当前组件上所有的元素, 都生成了一个随机的自定义属性
    2. 给当前组件上 style 中所有样式的选择器也添加了一个 属性选择器
*/
.index {
  height: 100%;
  // img {
  //   padding: 0;
  //   margin: 0;
  // }
  .el-header {
    background-color: #d8d8d8;
    display: flex;
    padding: 0;

    .logo {
      width: 200px;
      padding: 2px;
      padding-left: 0;
      img {
        // padding-left: 0;
        // width: 100px;
        height: 55px;
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
    background-color: #ecf0f1;
  }
}
</style>
