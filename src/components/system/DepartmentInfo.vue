<template>
  <div class="AccountingItem">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>部门信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮添加 -->
    <el-button
      class="addBtn"
      type="success"
      @click="dialogVisible = true"
      plain
      style="margin-bottom:10px"
    >部门添加</el-button>
    <!-- 树形图 -->
    <!-- default-expand-all -->
    <div class="block">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{data.departmentName}}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">修改</el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 添加对话框 -->
    <!-- 添加的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="部门选择">
          <!-- 级联选择器 -->
          <el-cascader
            :options="options"
            :props="cprops"
            clearable
            @change="handleChange"
            placeholder="请选择(默认为一级部门)"
          >
            <template v-slot:default="obj">
              <span>{{ obj.data.departmentName}}</span>
              <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
            </template>
          </el-cascader>
          <!-- <div class="block">
            <el-cascader :props="cprops" :options="options" @change="handleChange"></el-cascader>
          </div>-->
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input placeholder="请输入部门名称" v-model="form.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="email">
          <el-input placeholder="请输入部门编码" v-model="form.departmentCode"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="addUser" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改框对话框 -->
    <el-dialog title="修改部门" :visible.sync="changedialogVisible" width="40%">
      <el-form ref="form" :model="changeform" label-width="80px">
        <el-form-item label="部门名称">
          <el-input placeholder="请输入部门名称" v-model="changeform.departmentName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changedialogVisible = false">取 消</el-button>
        <el-button @click="changeaddUser" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 级联数据
      options: [],
      // 树形显示
      defaultProps: {
        children: 'children',
        label: 'departmentName'
      },
      // 级联选择器
      cprops: {
        checkStrictly: true,
        label: 'departmentName',
        value: 'departmentId',
        // value: '[departmentId,accountTitleName,accountTitleParentId]',
        children: 'children'
      },
      data: [],
      dialogVisible: false,
      changedialogVisible: false,
      form: {
        departmentId: '',
        departmentName: '',
        departmentCode: ''
      },
      changeform: {
        departmentId: '',
        departmentName: ''
      }
    }
  },
  created () {
    this.getAccountingItemList()
  },
  methods: {
    async addUser () {
      this.dialogVisible = false
      const aa = await this.$axios.post(
        'hbte-financial/hbte/department/saveDepartment',
        this.form
      )
      // console.log(aa)
      if (aa.status === 200) {
        this.$message.success('录入成功')
      } else {
        this.$message.error('aa.errMsg')
      }
      this.getAccountingItemList()
    },
    changeaddUser () {},
    // 会计科目级联选择器
    handleChange (value) {
      // console.log(value[value.length - 1])
      this.form.departmentId = value[value.length - 1] || -1
      console.log(this.form.departmentId)
    },
    // 树形图
    append (data) {
      console.log(data)
      this.changedialogVisible = true
      this.changeform.departmentId = data.departmentId
      this.changeform.departmentName = data.departmentName
    },
    async getAccountingItemList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      // console.log(data)
      this.data = data.data
      this.options = data.data
    },

    async remove (node, data) {
      // const { aa } = await this.$axios.post(
      //   'hbte-financial/hbte/accountTitle/delAccountTitle',
      //   data.departmentId
      // )
      // console.log(2323)
      try {
        await this.$confirm('亲, 你确认要删除么?', '温馨提示', {
          type: 'warning'
        })
        console.log(data.departmentId)

        // 能到这里, 说明确认了
        const { aa } = await this.$axios.post(
          'hbte-financial/hbte/department/delDepartment',
          { departmentId: data.departmentId }
        )
        console.log(aa)
        if (aa.code === 0) {
          this.$message.success('录入成功')
          // 重新渲染
        } else {
          this.$message.error('录入失败')
        }
      } catch (e) {
        console.log(e)
      }
      this.getAccountingItemList()
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      )
    }
  }
}
</script>

<style>
</style>
