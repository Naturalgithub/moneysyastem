<template>
  <div class="goods-add">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" description="基本信息"></el-step>
      <el-step title="步骤 2" description="商品图片"></el-step>
      <el-step title="步骤 3" description="商品内容"></el-step>
    </el-steps>

    <el-tabs v-model="activeTab" tab-position="left" @tab-click="handleClick">
      <el-tab-pane name="0" label="基本信息">
        <el-form :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price" placeholder="请输入商品价格"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight" placeholder="请输入商品重量"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number" placeholder="请输入商品数量"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
              <el-cascader
                v-model="form.goods_cat"
                :options="options"
                :props="props"></el-cascader>
          </el-form-item>

          <el-button type="primary" @click="next">下一步</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="1" label="商品图片">
        <!-- action 图片上传的地址 -->
        <el-upload
          multiple
          :headers="headers"
          name="file"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture-card"
          :on-success="handleSuccess">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>

        <el-button type="primary" @click="next">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane name="2" label="商品内容">
        <quill-editor v-model="form.goods_introduce"></quill-editor>
        <el-button type="primary" @click="addGood">添加</el-button>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 预览的图片的列表
      fileList: '',
      active: 0,
      activeTab: '',
      form: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        gooos_introduce: '',
        pics: []
      },
      options: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      headers: {
        Authorization: localStorage.getItem('token')
      },
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  async created () {
    const res = await this.$axios.get('categories?type=3')
    if (res.meta.status === 200) {
      this.options = res.data
    }
  },
  methods: {
    handleClick (tab, event) {
      this.active = +tab.index
    },
    next () {
      this.active++
      this.activeTab = this.active.toString()
    },
    // 文件上传成功
    handleSuccess (res, file, fileList) {
      this.form.pics.push({
        pic: res.data.tmp_path
      })
      this.fileList = fileList
    },
    // 图片删除
    handleRemove (file) {
      const filePath = file.response.data.tmp_path
      this.form.pics = this.form.pics.filter(item => item.pic !== filePath)
      // 将fileList中的文件也删除, 通过下标存储
      const index = this.fileList.findIndex(item => item.uid === file.uid)
      this.fileList.splice(index, 1)
    },
    // 图片预览
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async addGood () {
      // 发送请求
      const res = await this.$axios.post('goods', {
        ...this.form,
        goods_cat: this.form.goods_cat.join()
      })
      const { msg, status } = res.meta
      if (status === 201) {
        this.$message.success(msg)
        this.$router.push('/goods')
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/*
  1. 给当前组件中所有的元素 添加了一个自定义属性  data-v123  仅限于模板中的
  2. 给当期那组件中写的所有样式也添加 一个自定义属性选择器 .ql-editor[data-v123]

  >>> css 本身支持的
  /deep/   less 支持的
  ::v-deep  sass
*/
.quill-editor {
  background-color: #fff;
  ::v-deep .ql-editor {
    min-height: 300px;
  }
}
</style>
