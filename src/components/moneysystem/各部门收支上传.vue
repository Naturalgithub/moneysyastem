<template>
  <div class="InOutQuery">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收支系统</el-breadcrumb-item>
      <el-breadcrumb-item>各部门收支</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 部门收支信息表格 -->
    <div class="export">
      <el-button
        @click="exportExcel"
        style="margin-top: 2px;"
        size="medium"
        type="success"
        class="m5"
      >导出</el-button>
    </div>
    <!-- default-expand-all 默认展开 -->
    <el-table
      size="mini"
      :data="tableData"
      default-expand-all
      style="width: 100%;margin-bottom: 20px;"
      border
      row-key="accountTitleId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren',label: 'accountTitleName'}"
    >
      <el-table-column prop="accountTitleName" label="费用明细/部门" fixed width="153"></el-table-column>
      <!-- <el-table-column label="财务部" prop="accountTitleName">
        <template v-slot:default="{ row }">{{rowa(row)}}</template>
      </el-table-column>-->
      <el-table-column label="总裁办" prop="accountTitleName">
        <template v-slot:default="{ row }">{{rowb(row)}}</template>
      </el-table-column>
      <el-table-column label="销售商务部门">
        <template v-slot:default="{ row }">{{rowc(row)}}</template>
      </el-table-column>
      <el-table-column label="采购部">
        <template v-slot:default="{ row }">{{rowd(row)}}</template>
      </el-table-column>
      <el-table-column label="品管部">
        <template v-slot:default="{ row }">{{rowe(row)}}</template>
      </el-table-column>
      <el-table-column label="财务部">
        <template v-slot:default="{ row }">{{rowf(row)}}</template>
      </el-table-column>
      <el-table-column label="行政人事部">
        <template v-slot:default="{ row }">{{rowg(row)}}</template>
      </el-table-column>
      <el-table-column label="IOT部">
        <template v-slot:default="{ row }">{{rowh(row)}}</template>
      </el-table-column>
      <el-table-column label="外包服务部">
        <template v-slot:default="{ row }">{{rowi(row)}}</template>
      </el-table-column>
      <el-table-column label="技术服务部">
        <template v-slot:default="{ row }">{{rowj(row)}}</template>
      </el-table-column>
      <el-table-column label="研发部">
        <el-table-column label="射频系统集成组">
          <template v-slot:default="{ row }">{{rowk(row)}}</template>
        </el-table-column>
        <el-table-column label="屏蔽空间组">
          <template v-slot:default="{ row }">{{rowl(row)}}</template>
        </el-table-column>
        <el-table-column label="无源器件和线缆组">
          <template v-slot:default="{ row }">{{rowm(row)}}</template>
        </el-table-column>
        <el-table-column label="自动化组">
          <template v-slot:default="{ row }">{{rown(row)}}</template>
        </el-table-column>
        <el-table-column label="软件组">
          <template v-slot:default="{ row }">{{rowo(row)}}</template>
        </el-table-column>
        <el-table-column label="测试组">
          <template v-slot:default="{ row }">{{rowp(row)}}</template>
        </el-table-column>
        <el-table-column label="天线组">
          <template v-slot:default="{ row }">{{rowq(row)}}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="生产部" center>
        <el-table-column label="射频系统集成组">
          <template v-slot:default="{ row }">{{rowr(row)}}</template>
        </el-table-column>
        <el-table-column label="屏蔽空间组">
          <template v-slot:default="{ row }">{{rows(row)}}</template>
        </el-table-column>
        <el-table-column label="无源器件和线缆组">
          <template v-slot:default="{ row }">{{rowt(row)}}</template>
        </el-table-column>
        <el-table-column label="自动化组">
          <template v-slot:default="{ row }">{{rowu(row)}}</template>
        </el-table-column>
        <el-table-column label="钣金组">
          <template v-slot:default="{ row }">{{rowv(row)}}</template>
        </el-table-column>
        <el-table-column label="工程组">
          <template v-slot:default="{ row }">{{roww(row)}}</template>
        </el-table-column>
      </el-table-column>

      <!-- <el-table-column prop="bumen2" label="外包服务部" width="153">
        <template
          v-slot:default="{ row }"
        >{{ row.incomeExpenseInfos[1] == undefined ? '' : row.incomeExpenseInfos[1].expenseAmount}}</template>
      </el-table-column>-->
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
      aaaa: [
        {
          accountTitleCode: '300102',
          accountTitleId: 39,
          accountTitleName: '办公费用',
          accountTitleParentId: 37,
          children: [],
          incomeExpenseInfos: [
            {
              accountTitle: { accountTitleId: 39 },
              department: { departmentId: 24, departmentName: '财务部' },
              expenseAmount: '2000'
            },
            {
              accountTitle: { accountTitleId: 39 },
              department: { departmentId: 29, departmentName: '屏蔽空间组' },
              expenseAmount: '6000'
            }
          ]
        }
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
      // console.log(data)
      this.dapartmentList = data.data
    },
    rowa (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '财务部') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowb (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '总裁办') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowc (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName === '销售商务部门'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowd (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '采购部') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowe (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '品管部') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowf (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '财务部') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowg (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName === '行政人事部'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowh (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === 'IOT部') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowi (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName === '外包服务部'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowj (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName === '技术服务部'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowk (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName ===
          '射频系统集成组'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowl (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName === '屏蔽空间组'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowm (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName ===
          '无源器件和线缆组'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rown (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName === '自动化组'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowo (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '软件组') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowp (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '测试组') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowq (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '天线组') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowr (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName ===
          '射频系统集成组'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rows (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentId === '37') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowt (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName ===
          '无源器件和线缆组'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowu (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (
          row.incomeExpenseInfos[i].department.departmentName === '自动化组'
        ) {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    rowv (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '钣金组') {
          // console.log(i)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
        }
      }
    },
    roww (row) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentName === '工程组') {
          // console.log(i)
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
