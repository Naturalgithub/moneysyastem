<template>
  <div class="CustomerManagement">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮添加 -->
    <el-button
      class="addBtn"
      type="success"
      plain
      style="margin-bottom:10px"
      @click="dialogVisible = true"
    >客户添加</el-button>
    <!-- 列表 -->
    <el-table :data="CustomerManagement" border style="width: 100%" size="mini">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="customerName" label="客户名称"></el-table-column>

      <el-table-column prop="customerPhone" label="客户联系电话"></el-table-column>

      <el-table-column label="操作">
        <!-- row这个参数, 是element ui内部, 定义slot时, 传递过来的 -->
        <template v-slot:default="obj">
          <el-button
            @click="showEditDialog(obj.row)"
            plain
            size="small"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            @click="delUser(obj.row.customerInfoId)"
            plain
            size="small"
            type="danger"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      style="margin-top:10px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[30, 50, 80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
      <span>
        <!-- 表单 -->
        <el-form :model="assignForm" ref="assignForm" :rules="rules" label-width="80px">
          <el-form-item label="客户名称" prop="name">
            <el-input placeholder="请输入客户名称" v-model="assignForm.customerName"></el-input>
            <!-- <el-tag type="info">{{ assignForm.username }}</el-tag> -->
          </el-form-item>
          <el-form-item label="联系方式" prop="duilv">
            <el-input placeholder="请输入联系方式" v-model="assignForm.customerPhone"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改" :visible.sync="editVisible" width="40%">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-form-item label="货币名称">
          <el-input placeholder="请输入货币名称" v-model="editForm.customerName"></el-input>
        </el-form-item>
        <el-form-item label="货币兑率" prop="email">
          <el-input placeholder="请输入手" v-model="editForm.customerPhone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button @click="editMoney" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,
      CustomerManagement: [],
      dialogVisible: false,
      editVisible: false,
      // 添加表格
      assignForm: {
        customerName: '',
        customerPhone: ''
      },
      // 编辑表格
      editForm: {
        customerInfoId: '',
        customerName: '',
        customerPhone: ''
      },
      rules: {
        name: [
          {
            message: '请输入客户名',
            trigger: ['blur', 'change']
          },
          {
            min: 2,
            max: 12,
            message: '用户名长度在 2 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ],
        duilv: [
          {
            message: '请输入联系方式',
            trigger: ['blur', 'change']
          },
          {
            min: 2,
            max: 12,
            message: '用户名长度在 2 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created () {
    this.getCMList()
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getCMList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getCMList()
    },
    async getCMList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/customer/customerInfoList',
        { params: { page: this.page, pageSize: this.pageSize } }
      )
      console.log(data)
      this.CustomerManagement = data.data
      this.total = data.count
    },
    // 添加模态确定
    async addUser () {
      console.log(this.assignForm)

      try {
        console.log(this.assignForm)

        await this.$refs.assignForm.validate()
        const { data } = this.$axios.post(
          'hbte-financial/hbte/customer/saveCustomerInfo',
          this.assignForm
        )
        this.getCMList()
        // this.assignForm.customerName = ''
        // this.assignForm.customerPhone = ''
        console.log(data)
        this.$message.success('添加成功')
        this.dialogVisible = false
      } catch (e) {
        console.log(e)
      }
      this.getCMList()
    },
    showEditDialog (row) {
      this.editVisible = true
      //  console.log(row)
      // 回显基本的数据
      this.editForm.customerName = row.customerName
      this.editForm.customerPhone = row.customerPhone

      this.editForm.customerInfoId = row.customerInfoId
    },
    async delUser (id) {
      console.log(id)

      // console.log(id)
      // console.log(data)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/customer/delCustomerInfo',
          {
            customerInfoId: id
          }
        )
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      } catch (e) {
        console.log(e)
      }

      this.getCMList()
    },
    // 编辑模态框
    async editMoney () {
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/customer/updateCustomerInfo',
        this.editForm
      )
      if (data.code === 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
      this.editVisible = false
      console.log(data)
      this.getCMList()
    }
  }
}
</script>

<style>
</style>
