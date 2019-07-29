<template>
  <div class="goods">
    <el-button type='success' plain @click="goAdd">添加商品</el-button>

    <!-- 表格组件 -->
    <el-table :data="goodList">
      <el-table-column type='index' :index="indexMethod"></el-table-column>
      <el-table-column label="商品名称" prop="goods_name"></el-table-column>
      <el-table-column label="商品价格" prop="goods_price"></el-table-column>
      <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
      <el-table-column label="创建时间">
        <template v-slot:default="{ row }">
          {{ row.add_time | dateFilter }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="{ row }">
          <el-button type="primary" plain size="small" icon="el-icon-edit"></el-button>
          <el-button type="danger" plain size="small" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0
    }
  },
  created () {
    this.getGoodList()
  },
  methods: {
    async getGoodList () {
      const res = await this.$axios.get('goods', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      const { meta, data } = res
      if (meta.status === 200) {
        this.goodList = data.goods
        this.total = data.total
      }
    },
    // 分页页码变化
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getGoodList()
    },
    // 分页当前页变化
    handleCurrentChange (val) {
      this.pagenum = val
      this.getGoodList()
    },
    // 配置分页序号
    indexMethod (index) {
      return (this.pagenum - 1) * this.pagesize + index + 1
    },
    goAdd () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table {
    margin: 10px 0;
  }
</style>
