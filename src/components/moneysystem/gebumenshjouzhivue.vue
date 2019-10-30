<template>
  <div class="InOutQuery">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收支系统</el-breadcrumb-item>
      <el-breadcrumb-item>各部门收支</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 部门收支信息表格 -->

    <el-table
      size="mini"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      border
      default-expand-all
      row-key="accountTitleId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren',label: 'accountTitleName'}"
    >
      <el-table-column prop="accountTitleName" sortable label="费用明细/部门" fixed width="153"></el-table-column>

      <el-table-column
        :label="item.departmentName"
        v-for="item in dapartmentList"
        :key="item.departmentId"
      >
        <template v-slot:default="{ row }">{{rowa(row,item.departmentId)}}</template>

        <!-- {{item.departmentId}} -->
        <el-table-column
          prop
          :label="item1.departmentName"
          v-for="item1 in item.children"
          :key="item1.departmentId"
        >
          <template v-slot:default="{ row }">{{rowa(row,item.departmentId)}}</template>
          <el-table-column
            prop
            :label="item2.departmentName"
            v-for="item2 in item1.children"
            :key="item2.departmentId"
          >
            <template v-slot:default="{ row }">{{rowa(row,item.departmentId)}}</template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      aa: 11,
      dapartmentList: [
        // {
        //   name: '研发部',
        //   id: 1,
        //   children: [
        //     {
        //       name: '前端',
        //       id: 2,
        //       children: [{ name: 'html', id: 9 }, { name: 'css', id: 10 }]
        //     },
        //     { name: '后端', id: 3 }
        //   ]
        // },
        // { name: '生产部', id: 4, children: [] },
        // { name: '人事部', id: 5, children: [] }
      ],
      tableData: [
        // {
        //   id: 1,
        //   date: '2016-05-02',
        //   name: '生产部',
        //   address: '22'
        // },
        // {
        //   id: 2,
        //   date: '2016-05-04',
        //   name: '人事部',
        //   address: '33'
        // },
        // {
        //   id: 3,
        //   date: '2016-05-01',
        //   name: '研发部',
        //   address: '121',
        //   children: [
        //     {
        //       id: 31,
        //       date: '2016-05-01',
        //       name: '前端',
        //       address: '55'
        //     },
        //     {
        //       id: 32,
        //       date: '2016-05-01',
        //       name: '后端',
        //       address: '66'
        //     }
        //   ]
        // },
        // {
        //   id: 4,
        //   date: '2016-05-03',
        //   name: '工厂',
        //   address: '77'
        // }
      ]
    }
  },
  created () {
    this.getkuaijiList()
    this.getInOutList()
  },
  methods: {
    async getkuaijiList () {
      // console.log(this.tableData)
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/accountTitleIncomeExpenseInfoList'
      )
      // console.log(data.data)
      this.tableData = data.data
    },
    async getInOutList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      console.log(data)
      this.dapartmentList = data.data
    },
    rowa (row, id) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        // console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentId === id) {
          console.log(row, id)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
