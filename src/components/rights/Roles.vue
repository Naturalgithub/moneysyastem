<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加按钮 -->
    <el-button type="success" plain @click="showAddDialog">添加角色</el-button>
    <!-- 使用表格显示 -->
    <!-- 通过 data 属性注入数组, prop 定义键名 label定义列名 -->
    <el-table :data="roleList">
      <el-table-column type="expand">
        <template v-slot:default="{ row }">
          <!-- row当前角色 -->
          <p v-if="row.children.length === 0">暂无权限</p>

          <!-- 一个一级权限, 应该独占一行 -->
          <el-row class="l1" v-for="l1 in row.children" :key="l1.id">
            <el-col :span="4">
              <el-tag @close="delRight(row, l1.id)" closable type="primary">{{ l1.authName }}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <!-- 右侧权限 -->
            <el-col :span="20">
              <!-- 渲染二级权限, 一个二级权限, 独占一行 -->
              <el-row class="l2" v-for="l2 in l1.children" :key="l2.id">
                <el-col :span="4">
                  <el-tag @close="delRight(row, l2.id)" closable type="success">{{ l2.authName }}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="20">
                  <!-- 显示三级权限 -->
                  <el-tag
                    @close="delRight(row, l3.id)"
                    class="l3"
                    closable
                    type="warning"
                    v-for="l3 in l2.children"
                    :key="l3.id"
                  >{{ l3.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="{ row }">
          <!-- el-button type、plain、round和circle-->
          <el-button type="primary" @click="showEditDialog(row)" size="small" plain icon="el-icon-edit"></el-button>
          <el-button type="danger" @click="delRole(row.id, $event)" size="small" plain icon="el-icon-delete"></el-button>
          <el-button type="success" @click="showAssignDialog(row)" size="small" plain icon="el-icon-check">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="分配权限" :visible.sync="assignVisable" width="40%">
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignVisable = false">取 消</el-button>
        <el-button type="primary" @click='assignRight'>分 配</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="addDialogTitle" :visible.sync="addVisable" width="40%" @closed="closeAddDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="form.roleDesc" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisable = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roleList: [],
      assignVisable: false,
      addVisable: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rowId: '',
      form: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: ['change', 'blur'] }
        ],
        roleDesc: [
          { required: true, message: '角色名称不能为空', trigger: ['change', 'blur'] }
        ]
      },
      addDialogTitle: ''
    }
  },
  // created 钩子函数, 获取角色数据
  created () {
    this.getRoleList()
  },
  methods: {
    // 获取全部权限
    async getRoleList () {
      const { meta, data } = await this.$axios.get('roles')
      if (meta.status === 200) {
        this.roleList = data
      }
    },
    // 点击删除权限功能
    async delRight (row, rightId) {
      const res = await this.$axios.delete(`roles/${row.id}/rights/${rightId}`)
      const { status, msg } = res.meta
      if (status === 200) {
        this.$message.success(msg)
        console.log(res.data)
        // 重新渲染
        row.children = res.data
      } else {
        this.$message.error(msg)
      }
    },
    // 点击显示分配模态框
    async showAssignDialog (row) {
      this.roleId = row.id
      this.assignVisable = true

      // 发送ajax请求， 获取全部的权限数据
      const { meta, data } = await this.$axios.get('rights/tree')
      if (meta.status === 200) {
        // 请求成功
        this.data = data

        // 设置选中的, 三级权限
        const arr = []
        row.children.forEach(l1 => {
          l1.children.forEach(l2 => {
            l2.children.forEach(l3 => {
              arr.push(l3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(arr)
      }
    },
    // 分配权限
    async assignRight () {
      // 获取选中的权限id (全选中的 和 半选中的)
      const ids = this.$refs.tree.getCheckedKeys()
      const halfs = this.$refs.tree.getHalfCheckedKeys()
      const rids = [...ids, ...halfs].join(',')

      const res = await this.$axios.post(`roles/${this.roleId}/rights`, { rids })
      const { status, msg } = res.meta
      if (status === 200) {
        this.$message.success(msg)
        this.assignVisable = false
        this.getRoleList()
      } else {
        this.$message.error(msg)
      }
    },
    // 删除角色
    async delRole (id, e) {
      try {
        await this.$confirm('你确定要删除该角色么', '温馨提示', {
          type: 'warning'
        })
        // 发送删除的ajax请求
        const res = await this.$axios.delete(`roles/${id}`)
        const { status, msg } = res.meta
        if (status === 200) {
          this.$message.success(msg)
          this.getRoleList()
        }
      } catch (e) {
        this.$message('取消删除')
      }

      // 如果点击的是 i 标签, 或者 button 标签, 失去焦点
      if (e.target.nodeName === 'I') {
        e.target.parentNode.blur()
      } else {
        e.target.blur()
      }
    },
    // 展示添加模态框
    showAddDialog () {
      this.addDialogTitle = '添加角色'
      this.addVisable = true
    },
    // 显示编辑模态框
    showEditDialog (row) {
      this.addDialogTitle = '修改角色'
      this.addVisable = true

      // 让模态框先显示, 再改值, 保证初始值为 ''
      this.$nextTick(() => {
        this.form.id = row.id
        this.form.roleName = row.roleName
        this.form.roleDesc = row.roleDesc
      })
    },
    // 只要隐藏模态框, 就重置表单内容
    closeAddDialog () {
      // resetFields 是将表单重置为第一次显示渲染时的初始值
      this.$refs.form.resetFields()
    },
    async saveUser () {
      try {
        await this.$refs.form.validate()
        // 看修改还是添加, 有 id, 就是修改, 没有 id 就是添加
        const { id } = this.form
        let res
        if (id) {
          res = await this.$axios.put(`roles/${id}`, this.form)
        } else {
          res = await this.$axios.post(`roles`, this.form)
        }
        const { msg, status } = res.meta
        if (status === 200 || status === 201) {
          this.$message.success('操作成功')
          this.addVisable = false
          this.getRoleList()
        } else {
          this.$message.error(msg)
        }
      } catch (e) { }
    }
  }
}
</script>

<style lang="scss" scoped>
.roles {
  .l1 {
    border-bottom: 1px dotted #ccc;
    padding: 10px 0;
  }
  .l2 {
    margin-bottom: 10px;
  }
  .l3 {
    margin-right: 5px;
  }
}
.el-table {
  margin-top: 10px;
}
</style>
