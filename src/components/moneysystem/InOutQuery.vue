<template>
  <div class="InOutQuery">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收支系统</el-breadcrumb-item>
      <el-breadcrumb-item>收支查询</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 收支信息表格 -->
    <template>
      <el-table :data="tableData" style="width: 100%" border size="mini">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="oddNumber" label="单号"></el-table-column>
        <el-table-column prop="createDate" label="制单日期"></el-table-column>
        <el-table-column prop="createTime" label="制单时间"></el-table-column>
        <!-- <el-table-column prop="userInfo.userInfoId" label="userInfoId"></el-table-column> -->
        <el-table-column prop="paymentTerm.paymentTermName" label="收款方式"></el-table-column>
        <el-table-column prop="currencyInfo.currencyName" label="货币信息"></el-table-column>
        <el-table-column prop="incomeAmount" label="收入金额"></el-table-column>
        <el-table-column prop="expenseAmount" label="支出金额"></el-table-column>
        <el-table-column prop="customerInfo.customerName" label="客户信息"></el-table-column>
        <el-table-column prop="bankInfo.bankName" label="银行"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="accountTitle.accountTitleName" label="会计科目"></el-table-column>
        <el-table-column prop="companyInfo.companyName" label="公司信息"></el-table-column>
        <el-table-column prop="department.departmentName" label="部门"></el-table-column>
        <el-table-column prop="projectInfo.projectName" label="项目信息"></el-table-column>
        <!-- <el-table-column label="编辑" width="120">
          <template v-slot:default="obj">
            <el-button
              @click="showEditDialog(obj.row)"
              plain
              size="small"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="delUser(obj.row.projectInfoId)"
              plain
              size="small"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:10px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[30,50,80]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 编辑的对话框 -->
    <el-dialog title="修改" :visible.sync="editVisible" width="40%">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="单    号">
          <el-input placeholder="示例:HBTE-20190923" v-model="editForm.oddNumber"></el-input>
          <!-- <el-tag type="info">{{ assignForm.username }}</el-tag> -->
        </el-form-item>
        <el-form-item label="制单日期">
          <!-- <el-input placeholder="请输入制单日期" v-model="editForm.createDate"></el-input> -->
          <div class="block">
            <el-date-picker
              v-model="editForm.createDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="制单时间">
          <!-- <el-input placeholder="请输入制单时间" v-model="editForm.createTime"></el-input> -->
          <el-time-select
            v-model="editForm.createTime"
            :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
          }"
            placeholder="选择时间"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="制单人">
          <el-input placeholder="请输入制单人" v-model="editForm.userInfo.userInfoId"></el-input>
        </el-form-item>
        <el-form-item label="收款方式">
          <!-- <el-input placeholder="请输入收款方式ID" v-model="editForm.paymentTermId"></el-input> -->
          <el-select v-model="editForm.paymentTerm.paymentTermId" placeholder="请选择">
            <el-option
              v-for="item in skfsoptions"
              :key="item.paymentTermId"
              :label="item.paymentTermName"
              :value="item.paymentTermId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货币信息">
          <!-- <el-input placeholder="请输入货币信息ID" v-model="editForm.currencyInfoId"></el-input> -->
          <el-select v-model="editForm.currencyInfo.currencyInfoId" placeholder="请选择">
            <el-option
              v-for="item in hbxxoptions"
              :key="item.currencyInfoId"
              :label="item.currencyName"
              :value="item.currencyInfoId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入金额">
          <el-input placeholder="请输入收入金额" v-model="editForm.incomeAmount"></el-input>
        </el-form-item>
        <el-form-item label="支出金额">
          <el-input placeholder="请输入支出金额" v-model="editForm.expenseAmount"></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input placeholder="请输入摘要" v-model="editForm.comment"></el-input>
        </el-form-item>
        <el-form-item label="客户信息">
          <!-- 级联选择器 -->
          <!-- <div class="block"> -->
          <!-- <el-cascader v-model="editForm.createDate"></el-cascader> -->
          <!-- </div> -->
          <!-- <el-input placeholder="请输入制单日期" v-model="editForm.createDate"></el-input> -->
          <!-- </el-form-item> -->
          <el-select v-model="editForm.customerInfo.customerInfoId" placeholder="请选择">
            <el-option
              v-for="item in khxxoptions"
              :key="item.customerInfoId"
              :label="item.customerName"
              :value="item.customerInfoId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行信息">
          <!-- 级联选择器 -->
          <!-- <div class="block">
          <el-cascader v-model="editForm.createDate"></el-cascader>
          </div>-->
          <el-select v-model="editForm.bankInfo.bankInfoId" placeholder="请选择">
            <el-option
              v-for="item in yhxxoptions"
              :key="item.bankInfoId"
              :label="item.bankName"
              :value="item.bankInfoId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账   号">
          <el-input placeholder="请输入账号" v-model="editForm.account"></el-input>
        </el-form-item>
        <!-- <el-form-item label="审批流程ID">
        <el-input placeholder="请输入审批流程ID" v-model="editForm.actInfoId"></el-input>
        </el-form-item>-->
        <el-form-item label="会计科目">
          <!-- 级联选择器 -->
          <div class="block">
            <!-- <el-cascader v-model="editForm.accountTitleId"></el-cascader> -->
            <!-- 级联选择器 -->
            <el-cascader
              :options="kjoptions"
              :props="{
        checkStrictly: true,
        label: 'accountTitleName',
        value: 'accountTitleId',
        // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
        children: 'children'
      }"
              clearable
              @change="kjhandleChange"
              placeholder="请选择(默认为一级分类)"
            >
              <template v-slot:default="obj">
                <span>{{ obj.data.accountTitleCode}}-{{obj.data.accountTitleName}}</span>
                <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
              </template>
            </el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="公司信息">
          <div class="block">
            <!-- <el-cascader v-model="editForm.companyInfoId"></el-cascader> -->
            <el-select v-model="editForm.companyInfo.companyInfoId" placeholder="请选择">
              <el-option
                v-for="item in gsxxoptions"
                :key="item.companyInfoId"
                :label="item.companyName"
                :value="item.companyInfoId"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="部门">
          <!-- 级联选择器 -->
          <!-- <div class="block">
          <el-cascader v-model="editForm.departmentId"></el-cascader>
          </div>-->
          <!-- 级联选择器 -->
          <el-cascader
            :options="bmxxoptions"
            :props="{
        checkStrictly: true,
        label: 'departmentName',
        value: 'departmentId',
        // value: '[accountTitleId,accountTitleName,accountTitleParentId]',
        children: 'children'
      }"
            clearable
            @change="bmhandleChange"
            placeholder="请选择(默认为一级分类)"
          >
            <template v-slot:default="obj">
              <span>{{ obj.data.departmentName}}</span>
              <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item label="产品线">
          <!-- 级联选择器 -->
          <div class="block">
            <!-- <el-cascader v-model="editForm.productLineId"></el-cascader> -->
            <el-select v-model="editForm.productLine.productLineId" placeholder="请选择">
              <el-option
                v-for="item in cpxxxoptions"
                :key="item.productLineId"
                :label="item.productLineName"
                :value="item.productLineId"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="项目信息">
          <!-- 级联选择器 -->
          <div class="block">
            <!-- <el-cascader v-model="editForm.projectInfoId"></el-cascader> -->
            <el-select v-model="editForm.projectInfo.projectInfoId" placeholder="请选择">
              <el-option
                v-for="item in xmxxoptions"
                :key="item.projectInfoId"
                :label="item.projectName"
                :value="item.projectInfoId"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="金额比例">
          <el-input placeholder="请输入金额比例" v-model="editForm.sumRatio"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button @click="editMoney" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 0,
      // 当前页
      page: 1,
      // 每页条数
      pageSize: 50,

      tableData: [],
      editForm: {
        incomeExpenseInfoId: '',
        oddNumber: '',
        createDate: '',
        createTime: '',
        userInfo: {
          userInfoId: 1
        },
        paymentTerm: {
          paymentTermId: ''
        },
        currencyInfo: {
          currencyInfoId: ''
        },
        incomeAmount: '',
        expenseAmount: '',
        comment: '',
        customerInfo: {
          customerInfoId: '',
          customerInfoName: ''
        },
        bankInfo: {
          bankInfoId: ''
        },
        account: '',
        actInfoId: '',
        accountTitle: {
          accountTitleId: ''
        },
        companyInfo: {
          companyInfoId: ''
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
        sumRatio: ''
      },
      // 收款方式级联选择器
      skfsoptions: [],
      // 货币信息选择器
      hbxxoptions: [],
      // 客户信息选择器
      khxxoptions: [],
      // 银行信息选择器
      yhxxoptions: [],
      // 会计级联选择器
      kjoptions: [],
      // 公司信息选择器
      gsxxoptions: [],
      // 部门信息选择器
      bmxxoptions: [],
      // 产品线信息选择器
      cpxxxoptions: [],
      // 项目信息选择器
      xmxxoptions: [],
      editVisible: false
    }
  },
  created () {
    this.getInOutList()
    this.getpaymentTermId()
    this.getcurrencyInfoId()
    this.getcustomerInfoId()
    this.getbankInfoId()
    this.getaccountTitleId()
    this.getcompanyInfoId()
    this.getdepartmentId()
    this.getproductLineId()
    this.getprojectInfoId()
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pageSize = val
      // 只要修改了每页条数, 数据所在的页码发生了变化了, 回到第一页
      this.page = 1
      // 重新渲染
      this.getInOutList()
    },
    // 只要当前页变化时, 触发函数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 重新渲染
      this.getInOutList()
    },
    async getInOutList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/incomeExpense/incomeExpenseInfoList',
        { params: { page: this.page, pageSize: this.pageSize } }
      )
      console.log(data.data)
      this.tableData = data.data
      this.total = data.count
    },
    // 展示修改框
    showEditDialog (row) {
      this.editVisible = true
      // console.log(row)
      this.editForm.oddNumber = row.oddNumber
      this.editForm.createDate = row.createDate
      this.editForm.createTime = row.createTime
      this.editForm.userInfo.userName = row.userInfo.userName
      this.editForm.paymentTerm.paymentTermName =
        row.paymentTerm.paymentTermName
      this.editForm.currencyInfo.currencyInfo = row.currencyInfo.currencyInfo
      this.editForm.incomeAmount = row.incomeAmount
      this.editForm.comment = row.comment
      this.editForm.customerInfo.customerName = row.customerInfo.customerName
      this.editForm.bankInfo.bankName = row.bankInfo.bankName
      this.editForm.account = row.account
      this.editForm.actInfo = row.actInfo
      this.editForm.accountTitle.accountTitleName =
        row.accountTitle.accountTitleName
      this.editForm.companyInfo.companyname = row.companyInfo.companyname
      this.editForm.department.departmentName = row.department.departmentName
      this.editForm.productLine.productLineName =
        row.productLine.productLineName
      this.editForm.projectInfo.projectName = row.projectInfo.projectName
      this.editForm.sumRatio = row.sumRatio
      this.editForm.practicalSum = row.practicalSum
      this.editForm.incomeExpenseInfoId = row.incomeExpenseInfoId
      this.editForm.incomeAmount = row.incomeAmount
      this.editForm.expenseAmount = row.expenseAmount
    },
    // 编辑框提交
    async editMoney () {
      this.editVisible = false
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/incomeExpense/updateIncomeExpenseInfo',
        this.editForm
      )
      console.log(data)
      if (data.code === 0) {
        this.$message.success('数据录入成功')
      } else {
        this.$message.error('数据录入失败')
      }
    },
    // 删除
    delUser () {},
    async getpaymentTermId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/paymentTerm/paymentTermList'
      )
      console.log(data)
      this.skfsoptions = data.data
    },
    // 获取货币信息id
    async getcurrencyInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/currency/currencyInfoList'
      )
      console.log(data)
      this.hbxxoptions = data.data
    },
    // 获取客户信息id
    async getcustomerInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/customer/customerInfoList'
      )
      // console.log(data)
      this.khxxoptions = data
    },
    // 获取客户信息id
    async getbankInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/bank/bankInfoList'
      )
      console.log(data)
      this.yhxxoptions = data.data
      // console.log(this.yhxxoptions)
    },
    // 获取公司信息id
    async getcompanyInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/company/companyInfoList'
      )
      console.log(data.data)
      this.gsxxoptions = data
      console.log(data.data)
    },
    async getaccountTitleId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/accountTitleList'
      )
      // console.log(data)
      this.kjoptions = data.data
    },
    kjhandleChange (value) {
      // console.log(value.length - 1)
      this.InoutwriteForm.accountTitle.accountTitleId =
        value[value.length - 1] || -1
    },
    async getdepartmentId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      console.log(data.data)
      this.bmxxoptions = data.data
    },
    bmhandleChange (value) {
      // console.log(value.length - 1)
      this.InoutwriteForm.department.departmentId =
        value[value.length - 1] || -1
    },
    // 获取产品线信息id
    async getproductLineId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/productLine/productLineList'
      )
      console.log(data.data)
      this.cpxxxoptions = data.data
      // console.log(this.yhxxoptions)
    },
    // 获取项目信息id
    async getprojectInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/project/projectInfoList'
      )
      console.log(data)
      this.xmxxoptions = data
      // console.log(this.yhxxoptions)
    }
  }
}
</script>

<style>
</style>
