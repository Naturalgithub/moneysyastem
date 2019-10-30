<template>
  <div class="ApplicationList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审批管理</el-breadcrumb-item>
      <el-breadcrumb-item>申请列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 申请表 -->
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      border
      style="width: 100%"
      size="mini"
    >
      <el-table-column prop="userInfo.userName" sortable label="申请人" width="180"></el-table-column>
      <el-table-column prop="incomeExpenseInfo.oddNumber" sortable label="收支单据">
        <!-- {{<a href="###">incomeExpenseInfo.oddNumber</a>}} -->
        <template v-slot:default="{ row }">
          <a
            href="###"
            @click="queryInout(row.incomeExpenseInfo.incomeExpenseInfoId)"
          >{{row.incomeExpenseInfo.oddNumber}}</a>
        </template>
      </el-table-column>

      <el-table-column prop label="状态" sortable>
        <template v-slot:default="{ row }">
          <el-button v-if="row.eventStatus === 0" type="info" size="small" disabled>进行中</el-button>
          <el-button v-if="row.eventStatus === 1" type="success" size="small" disabled>已完成</el-button>
          <el-button v-if="row.eventStatus === 2" type="danger" size="small" disabled>已拒绝</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="eventComment" label="备注"></el-table-column>
      <el-table-column prop label="操作">
        <template v-slot:default="{ row }">
          <!-- <el-button type="danger" size="small" @click="deldata(row.eventInfoId)">删除</el-button> -->
          <el-button type="primary" size="small" @click="checkdata(row.eventInfoId)">查看进度</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看模态框 -->
    <el-dialog title="当前进度" :visible.sync="dialogVisible" width="40%">
      <el-table border style="width: 100%" :data="checkdataa">
        <el-table-column prop="userInfo.userName" label="名字"></el-table-column>
        <el-table-column prop="actExecutionTime" label="时间"></el-table-column>
        <el-table-column prop="actExecutionComment" label="备注"></el-table-column>
        <el-table-column label="状态" sortable>
          <template v-slot:default="{ row }">
            <el-button v-if="row.actExecutionStatus === 0" type="info" disabled size="small">未处理</el-button>
            <el-button v-if="row.actExecutionStatus === 1" type="success" disabled size="small">同意</el-button>
            <el-button v-if="row.actExecutionStatus === 2" type="danger" disabled size="small">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 单据模态框 -->
    <el-dialog title="单据" :visible.sync="querydialogVisible" width="40%">
      <el-form ref="form" :model="form1" label-width="80px">
        <el-form-item label="单据 :">{{form1.oddNumber}}</el-form-item>
        <el-form-item label="制单日期 :">{{form1.createDate}}</el-form-item>
        <el-form-item label="制单人 :">{{form1.userInfo.userName}}</el-form-item>
        <el-form-item label="收款方式 :">{{form1.paymentTerm.paymentTermName}}</el-form-item>
        <el-form-item label="货币信息 :">{{form1.currencyInfo.currencyName}}</el-form-item>
        <el-form-item label="收入金额 :">{{form1.incomeAmount}}</el-form-item>
        <el-form-item label="支出金额 :">{{form1.expenseAmount}}</el-form-item>
        <el-form-item label="摘要 :">{{form1.comment}}</el-form-item>
        <el-form-item label="客户信息 :">{{form1.customerInfo.customerInfoId}}</el-form-item>
        <el-form-item label="银行信息 :">{{form1.bankInfo.bankInfoId}}</el-form-item>
        <el-form-item label="账   号 :">{{form1.account}}</el-form-item>
        <el-form-item label="会计科目 :">{{form1.accountTitle.accountTitleName}}</el-form-item>
        <el-form-item label="公司信息 :">{{form1.companyInfo.companyName}}</el-form-item>
        <el-form-item label="部门 :">{{form1.department.departmentName}}</el-form-item>
        <el-form-item label="项目信息 :">{{form1.projectInfo.projectName}}</el-form-item>
        <el-form-item label="金额比例 :">{{form1.sumRatio}}</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="querydialogVisible = false">取 消</el-button>
        <el-button @click="querydialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkdataa: [],
      form1: {
        incomeExpenseInfoId: '',
        comment: '',
        account: '',
        aa: '',
        oddNumber: '',
        createDate: '',
        createTime: '',
        userInfo: {
          userInfoId: '',
          userName: ''
        },
        paymentTerm: {
          paymentTermId: ''
        },
        currencyInfo: {
          currencyInfoId: ''
        },
        incomeAmount: '',
        expenseAmount: '',

        customerInfo: {
          customerInfoId: ''
        },
        bankInfo: {
          bankInfoId: ''
        },
        actInfoId: '',
        accountTitle: {
          accountTitleId: ''
        },
        companyInfo: {
          companyInfoId: '',
          companyName: ''
        },
        department: {
          departmentId: ''
        },
        productLine: {
          productLineId: ''
        },
        projectInfo: {
          projectInfoId: ''
        },
        sumRatio: '',
        actExecutions: []
      },

      search: '',
      page: 1,
      pageSize: 6,
      userInfoId: '',
      tableData: [],
      form: {
        test: 1,
        text:
          'dhaskjdhasjkdhasf打首付款几哈是否会暗示法哈克斯房间号按时发哈市副科级暗示法好假刷卡几号放假'
      },
      dialogVisible: false,
      querydialogVisible: false
    }
  },
  created () {
    this.geteventInfoList()
  },
  methods: {
    async deldata (id) {
      // const {data} = await this.$axios.post('',{})
    },
    async checkdata (id) {
      // console.log(id)
      this.dialogVisible = true
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/actExecution/getActExecution',
        { params: { eventInfoId: id } }
      )
      console.log(data.data)
      this.checkdataa = data.data
    },
    async geteventInfoList () {
      const aa = JSON.parse(localStorage.getItem('data'))
      // console.log(aa.userInfoId)
      this.userInfoId = aa.userInfoId
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/event/eventInfoList',
        {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            userInfoId: aa.userInfoId
          }
        }
      )
      // console.log(data.data)
      this.tableData = data.data
    },
    async queryInout (id) {
      // console.log(id)
      this.querydialogVisible = true
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/incomeExpense/getIncomeExpenseInfo',
        {
          params: { incomeExpenseInfoId: id }
        }
      )
      console.log(data.data)
      this.form1 = data.data
      // this.querydialogVisible
    }
  }
}
</script>

<style>
</style>
