<template>
  <div class="InOutQuery">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收支系统</el-breadcrumb-item>
      <el-breadcrumb-item>产品线收支汇总表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 部门收支信息表格 -->
    <div class="export">
      <el-button @click="exportExcel" style="margin-bottom: 10px;" size="medium" type="success">导出</el-button>
      <el-button style="margin-bottom: 10px;" size="medium" type="primary">导入</el-button>
      <el-date-picker
        @change="queryList"
        style="margin-left:10px"
        v-model="value"
        type="month"
        placeholder="选择月"
        value-format="yyyy-MM"
      ></el-date-picker>
    </div>
    <!-- default-expand-all -->
    <el-table
      id="table"
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 20px;"
      size="mini"
      row-key="accountTitleId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren',label: 'productLineName'}"
    >
      <el-table-column prop="accountTitleName" sortable label="费用明细/部门" fixed width="153"></el-table-column>
      <el-table-column prop="createDate" label="合计">
        <template v-slot:default="{ row }">{{row.practicalSumCount==0?'':row.practicalSumCount}}</template>
      </el-table-column>
      <el-table-column
        :label="item.productLineName"
        v-for="item in dapartmentList"
        :key="item.productLineId"
      >
        <template v-slot:default="{ row }">{{rowa(row,item.productLineId)}}</template>

        <!-- {{item.productLineId}} -->
        <el-table-column
          prop
          :label="item1.productLineName"
          v-for="item1 in item.children"
          :key="item1.productLineId"
        >
          <template v-slot:default="{ row }">{{rowa(row,item1.productLineId)}}</template>
          <el-table-column
            prop
            :label="item2.productLineName"
            v-for="item2 in item1.children"
            :key="item2.productLineId"
          >
            <template v-slot:default="{ row }">{{rowa(row,item2.productLineId)}}</template>
            <el-table-column
              prop
              :label="item3.productLineName"
              v-for="item3 in item2.children"
              :key="item3.productLineId"
            >
              <template v-slot:default="{ row }">{{rowa(row,item3.productLineId)}}</template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      options: [
        {
          value: '1',
          label: '1月'
        },
        {
          value: '2',
          label: '2月'
        },
        {
          value: '3',
          label: '3月'
        },
        {
          value: '4',
          label: '4月'
        },
        {
          value: '5',
          label: '5月'
        },
        {
          value: '6',
          label: '6月'
        },
        {
          value: '7',
          label: '7月'
        },
        {
          value: '8',
          label: '8月'
        },
        {
          value: '9',
          label: '9月'
        },
        {
          value: '10',
          label: '10月'
        },
        {
          value: '11',
          label: '11月'
        },
        {
          value: '12',
          label: '12月'
        }
      ],
      value: '',
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
    // this.rowa()
  },
  methods: {
    exportExcel () {
      let wb = XLSX.utils.table_to_book(document.querySelector('#table')) // 这里就是表格
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          '产品线收支汇总表.xlsx'
        ) // table是自己导出文件时的命名，随意
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    async getkuaijiList () {
      // console.log(this.tableData)
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/accountTitleIncomeExpenseInfoList',
        { params: { createDate: this.value } }
      )
      // console.log(data.data)
      this.tableData = data.data
    },
    async getInOutList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/productLine/productLineList'
      )
      console.log(data.data)
      this.dapartmentList = data.data
    },
    rowa (row, id) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        // console.log(row.incomeExpenseInfos[i])
        for (
          var j = 0;
          j < row.incomeExpenseInfos[i].ieProductLines.length;
          j++
        ) {
          if (
            row.incomeExpenseInfos[i].ieProductLines[j].productLine
              .productLineId === id
          ) {
            // console.log(row, id)
            return row.incomeExpenseInfos[i].ieProductLines[j].practicalSum
            // row.incomeExpenseInfos[i].productLine
          }
        }
      }
    },
    queryList (value) {
      console.log(value)

      this.getkuaijiList()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
