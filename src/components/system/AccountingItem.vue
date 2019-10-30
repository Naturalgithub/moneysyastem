<template>
  <div class="AccountingItem">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>会计科目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮添加 -->
    <el-button
      class="addBtn"
      type="success"
      @click="dialogVisible = true"
      plain
      style="margin-bottom:10px"
    >会计科目添加</el-button>
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
          <span>{{data.accountTitleCode}}-{{ node.label }}</span>
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
        <el-form-item label="会计科目">
          <!-- 级联选择器 -->
          <el-cascader
            :options="options"
            :props="cprops"
            clearable
            @change="handleChange"
            placeholder="请选择(默认为一级分类)"
          >
            <template v-slot:default="obj">
              <span>{{ obj.data.accountTitleCode}}-{{obj.data.accountTitleName}}</span>
              <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
            </template>
          </el-cascader>
          <!-- <div class="block">
            <el-cascader :props="cprops" :options="options" @change="handleChange"></el-cascader>
          </div>-->
        </el-form-item>
        <el-form-item label="科目名称" prop="name">
          <el-input placeholder="请输入会计科目名称" v-model="form.accountTitleName"></el-input>
        </el-form-item>
        <el-form-item label="科目编码" prop="email">
          <el-input placeholder="请输入会计科目编码" v-model="form.accountTitleCode"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="addUser" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改框对话框 -->
    <el-dialog title="修改" :visible.sync="changedialogVisible" width="40%">
      <el-form ref="form" :model="changeform" label-width="80px">
        <el-form-item label="科目名称">
          <el-input placeholder="请输入会计科目名称" v-model="changeform.accountTitleName"></el-input>
        </el-form-item>
        <el-form-item label="科目编码">
          <el-input placeholder="请输入会计科目编码" v-model="changeform.accountTitleCode"></el-input>
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
        label: 'accountTitleName'
      },
      // 级联选择器
      cprops: {
        checkStrictly: true,
        label: 'accountTitleName',
        value: 'accountTitleId',
        // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
        children: 'children'
      },
      data: [],
      dialogVisible: false,
      changedialogVisible: false,
      form: {
        accountTitleId: '',
        accountTitleName: '',
        accountTitleCode: ''
      },
      changeform: {
        accountTitleId: '',
        accountTitleName: '',
        accountTitleCode: ''
      }
    }
  },
  created () {
    this.getAccountingItemList()
  },
  methods: {
    async addUser () {
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/accountTitle/saveAccountTitle',
        this.form
      )
      console.log(data)
      this.dialogVisible = false
      this.$message.success('添加成功')
      this.getAccountingItemList()
    },
    async changeaddUser () {
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/accountTitle/updateAccountTitle',
        this.changeform
      )
      console.log(data)
      this.$message.success('修改成功')
      this.changedialogVisible = false
      this.getAccountingItemList()
    },
    // 会计科目级联选择器
    handleChange (value) {
      console.log(value[value.length - 1])
      this.form.accountTitleId = value[value.length - 1] || -1
    },
    // 树形图
    append (data) {
      console.log(data)
      this.changedialogVisible = true
      this.changeform.accountTitleId = data.accountTitleId
      this.changeform.accountTitleName = data.accountTitleName
      this.changeform.accountTitleCode = data.accountTitleCode
    },
    async getAccountingItemList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/accountTitleList'
      )
      // console.log(data)
      this.data = data.data
      this.options = data.data
    },

    async remove (node, data) {
      // const { aa } = await this.$axios.post(
      //   'hbte-financial/hbte/accountTitle/delAccountTitle',
      //   data.accountTitleId
      // )
      try {
        await this.$confirm(
          '确认要删除么?(若删除父级目录则子目录内容全部删除)',
          '温馨提示',
          {
            type: 'warning'
          }
        )
        // console.log(data.accountTitleId)

        // 能到这里, 说明确认了
        const { aa } = await this.$axios.post(
          'hbte-financial/hbte/accountTitle/delAccountTitle',
          { accountTitleId: data.accountTitleId }
        )
        console.log(aa)
        if (aa.code === 0) {
          this.$message.success(aa.msg)
          // 重新渲染
        } else {
          this.$message.error(aa.msg)
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
