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
      <el-button @click="output" style="margin-bottom: 10px;" size="medium" type="success">导出</el-button>
      <!-- <el-button style="margin-bottom: 10px;" size="medium" type="primary">导入</el-button>  -->
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
    <!-- accountCount -->
    <el-table
      id="table"
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 20px;"
      size="mini"
      row-key="accountTitleId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren',label: 'accountTitleName'}"
    >
      <el-table-column prop="accountTitleName" sortable label="费用明细/部门" fixed width="153"></el-table-column>
      <!-- accountCount -->
      <el-table-column label="合计" prop="accountCount">
        <template v-slot:default="{ row }">{{row.expenseAmountCount==0?'':row.expenseAmountCount}}</template>
      </el-table-column>
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
          <template v-slot:default="{ row }">{{rowa(row,item1.departmentId)}}</template>
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
          label: '5月'
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
  },
  methods: {
    output (tableID) {
      /* generate workbook object from table */
      let table = document.querySelector('#' + 'table').cloneNode(true)
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      table.removeChild(table.querySelector('.el-table__fixed'))
      let wb = XLSX.utils.table_to_book(table, { raw: true }) // mytable为表格的id名
      /* get binary string as output */
      let excName = this.companyReport
      if (this.dataEndDate) {
        excName += '(' + this.dataEndDate + ')'
      }
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          '各部门收支汇总表' + '.xlsx'
        )
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
      console.log(data.data)
      this.tableData = data.data
    },
    async getInOutList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      // console.log(data)
      this.dapartmentList = data.data
    },
    rowa (row, id) {
      for (var i = 0; i < row.incomeExpenseInfos.length; i++) {
        // console.log(i)
        if (row.incomeExpenseInfos[i].department.departmentId === id) {
          // console.log(row, id)
          return row.incomeExpenseInfos[i].expenseAmount
          // row.incomeExpenseInfos[i].expenseAmount
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
