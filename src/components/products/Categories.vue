<template>
  <div class="categories">
    <el-button type="success" @click="showAddDialog" plain>添加分类</el-button>
    <!-- 表格 -->
    <el-table
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      v-loading="loading"
      :data="categoryList"
      row-key="cat_id">
      <el-table-column label="分类名称" prop="cat_name"></el-table-column>
      <el-table-column label="是否有效">
        <template v-slot="row">
          {{ row.cat_deleted ? '否' : '是' }}
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="cat_level"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      background
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      @closed="closeDialog"
      width="40%">

      <el-form ref="form" status-icon :rules="rules" :model="form" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" prop="cat_pid">
          <el-cascader
            clearable
            v-model="form.cat_pid"
            :options="options"
            :props="props"></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoryList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      loading: true,
      dialogVisible: false,
      form: {
        cat_pid: [],
        cat_name: '',
        cat_level: ''
      },
      rules: {
        cat_name: [
          { required: true, message: '分类不能为空', trigger: ['blur', 'change'] }
        ]
      },
      // 级联菜单的数据
      options: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        checkStrictly: true
      }
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      this.loading = true
      // 发送ajax请求
      const { meta, data } = await this.$axios.get('categories', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          type: 3
        }
      })
      if (meta.status === 200) {
        this.categoryList = data.result
        this.total = data.total
        console.log(this.categoryList)
      }
      this.loading = false
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getCategoryList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getCategoryList()
    },
    async showAddDialog () {
      this.dialogVisible = true
      // 发送请求, 获取 2级分类的数据
      const res = await this.$axios.get('categories?type=2')
      if (res.meta.status === 200) {
        this.options = res.data
        console.log(res)
      }
    },
    async addCategory () {
      try {
        await this.$refs.form.validate()
        const catName = this.form.cat_name
        const catPid = this.form.cat_pid
        // 发送ajax请求
        const res = await this.$axios.post('categories', {
          cat_name: catName,
          cat_level: catPid.length,
          cat_pid: catPid[catPid.length - 1] || 0
        })
        const { msg, status } = res.meta
        if (status === 201) {
          // 请求成功
          this.$message.success(msg)
          this.dialogVisible = false
          this.getCategoryList()
        } else {
          this.$message.error(msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    closeDialog () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table {
    margin: 10px 0;
  }
</style>
