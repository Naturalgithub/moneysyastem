<template>
  <div class="rights">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格渲染权限列表 -->
     <template>
    <el-table
      :data="rightList"
      style="width: 100%">
      <el-table-column type="index" :index="indexMethod"  width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="层级">
        <!-- 自定义这列的内容 -->
        <template v-slot:default="{ row: { level }}">
          <span v-if="level === '0'">一级</span>
          <span v-else-if="level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>

    </el-table>
  </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightList: []
    }
  },
  created () {
    // 发送 ajax 请求, 获取权限的数据
    this.getRightList()
  },
  methods: {
    async getRightList () {
      const { meta, data } = await this.$axios.get('rights/list')
      if (meta.status === 200) {
        this.rightList = data
        console.log(data)
      }
    },
    indexMethod (index) {
      return index + 1
    }
  }
}
</script>

<style style="lang" scoped>

</style>
