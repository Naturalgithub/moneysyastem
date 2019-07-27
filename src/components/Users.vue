<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入搜索关键字" v-model="query" class="input-with-select search">
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>
    <el-button @click="showAddDialog" class="addBtn" type="success" plain>添加用户</el-button>

    <!-- 表格组件 -->
    <el-table
      :data="userList"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
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
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot:default="scope">
          <el-button @click="showEditDialog(scope.row)" size="small" plain type="primary" icon="el-icon-edit"></el-button>
          <el-button @click="delUser(scope.row.id)"  size="small" plain type="danger" icon="el-icon-delete"></el-button>
          <el-button size="small" plain type="success" icon="el-icon-check">分配角色</el-button>
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

    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="40%">

      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile">
          <el-input placeholder="请输入手机" v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      title="修改用户"
      :visible.sync="editVisible"
      width="40%">

      <el-form ref="editForm" :model="editForm" :rules="rules" status-icon label-width="100px">
        <el-form-item label="用户名">
          <el-tag type="info">{{ editForm.username }}</el-tag>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="editForm.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile">
          <el-input placeholder="请输入手机" v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
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
      userList: [],
      dialogVisible: false,
      // 表单的数据
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '用户名长度在 3 到 12 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '密码长度在 3 到 12 个字符', trigger: ['blur', 'change'] }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ]
      },
      editVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    async getUserList () {
      const { meta, data } = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        this.userList = data.users
        this.total = data.total
      }
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
    async delUser (id) {
      try {
        await this.$confirm('你确定要删除么', '温馨提示', {
          type: 'warning'
        })
        // 发送 ajax
        const { meta } = await this.$axios.delete(`users/${id}`)
        if (meta.status === 200) {
          this.$message.success('删除成功')
          // 如果当前页只有一条, getUserList 就不能获取当前页了
          if (this.userList.length === 1 && this.pagenum > 1) {
            this.pagenum--
          }
          this.getUserList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        this.$message('取消删除')
      }
    },
    // 搜索功能
    // 搜索功能重置为第一页显示
    searchUser () {
      this.pagenum = 1
      this.getUserList()
    },
    async changeState (row) {
      // 进行改变状态的 ajax请求操作
      const res = await this.$axios.put(`users/${row.id}/state/${row.mg_state}`)
      const { msg, status } = res.meta
      if (status === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(msg)
      }
    },
    // 展示添加模态框
    showAddDialog () {
      this.dialogVisible = true
    },
    // 添加用户
    // 1. 表单校验
    // 2. 发送ajax请求
    // 3. 获取结果, 判断
    async addUser () {
      try {
        await this.$refs.form.validate()
        // 校验成功, 发送ajax请求
        const res = await this.$axios.post('users', this.form)
        const { msg, status } = res.meta
        if (status === 201) {
          this.$message.success('添加成功')
          // 重置表单
          this.$refs.form.resetFields()
          // 隐藏对话框
          this.dialogVisible = false
          // 重新渲染最后一页
          this.total++
          this.pagenum = Math.ceil(this.total / this.pagesize)
          this.getUserList()
        } else {
          this.$message.error(msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 展示修改模态框
    showEditDialog ({ id, username, mobile, email }) {
      this.editVisible = true
      this.editForm.id = id
      this.editForm.username = username
      this.editForm.mobile = mobile
      this.editForm.email = email
    },
    // 修改用户
    async editUser () {
      try {
        await this.$refs.editForm.validate()
        // 校验成功, 发送请求
        const { id, email, mobile } = this.editForm
        const res = await this.$axios.put(`users/${id}`, { id, email, mobile })
        const { msg, status } = res.meta
        if (status === 200) {
          this.$message.success('更新成功')
          this.editVisible = false
          this.$refs.editForm.resetFields()
          this.getUserList()
        } else {
          this.$message.error(msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    width: 300px;
    margin-bottom: 10px;
  }
  .addBtn {
    margin: 0 20px;
  }
  .el-pagination {
    margin-top: 10px;
  }
</style>
