<template>
  <div class="users">
    <!-- 面包屑 -->
    <!-- 搜索框 -->
    <!-- 表格组件 -->
    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        prop="role_name"
        label="姓名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>

      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>

      <el-table-column label="用户状态">
        <template v-slot:default="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot:default="scope">
          <el-button size="small" plain type="primary" icon="el-icon-edit"></el-button>
          <el-button @click="delUser(scope.row.id)"  size="small" plain type="danger" icon="el-icon-delete"></el-button>
          <el-button size="small" plain type="success">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!--
      size-change 修改每页条数触发
      current-change 修改当前页触发
      current-page: 当前页
      page-size: 每页的条数
      total: 总条数
      page-sizes
     -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="pagesize"
      :total="total"
      :page-sizes="[2, 4, 6, 8]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 每页条数
      pagesize: 2,
      userList: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    getUserList () {
      // axios.post(url, data)
      // axios.get(url)
      this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        const { meta, data } = res
        if (meta.status === 200) {
          this.userList = data.users
          this.total = data.total
        }
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      // 更新当前页
      this.pagenum = val
      // 重新发送请求
      this.getUserList()
    },
    delUser (id) {
      this.$confirm('你确定要删除么', '温馨提示', {
        type: 'warning'
      }).then(() => {
        // 发送ajax请求
        this.$axios.delete(`users/${id}`).then(res => {
          const { meta } = res
          if (meta.status === 200) {
            console.log('删除成功')
            this.$message.success('删除成功')
            // 如果当前页只有一条, getUserList 就不能获取当前页了
            if (this.userList.length === 1 && this.pagenum > 1) {
              this.pagenum--
            }
            this.getUserList()
          } else {
            this.$message.error(meta.msg)
          }
        })
      }).catch(() => {
        this.$message('取消删除')
      })
    }
  }
}
</script>

<style>

</style>
