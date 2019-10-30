<template>
  <div class="InOutWrite">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收支系统</el-breadcrumb-item>
      <el-breadcrumb-item>收支录入</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮添加 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark szlr" style="textalign:center; margin-bottom:10px;">
          <b>收支录入</b>
        </div>
      </el-col>
    </el-row>
    <!-- 收支录入表单 -->
    <el-form :model="InoutwriteForm" ref="InoutwriteForm" label-width="80px">
      <el-form-item label="单    号">
        <el-input placeholder="示例:HBTE-20190923" v-model="InoutwriteForm.oddNumber" disabled></el-input>
        <!-- <el-tag type="info">{{ assignForm.username }}</el-tag> -->
      </el-form-item>
      <el-form-item label="制单日期">
        <!-- <el-input placeholder="请输入制单日期" v-model="InoutwriteForm.createDate"></el-input> -->
        <div class="block">
          <el-date-picker
            v-model="InoutwriteForm.createDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="制单时间">
        <!-- <el-input placeholder="请输入制单时间" v-model="InoutwriteForm.createTime"></el-input> -->
        <el-time-select
          v-model="InoutwriteForm.createTime"
          :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
          }"
          placeholder="选择制单时间(示例:23:20)"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="制单人">
        <el-input :disabled="true" placeholder="请输入制单人" v-model="InoutwriteForm.userInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="收款方式">
        <!-- <el-input placeholder="请输入收款方式ID" v-model="InoutwriteForm.paymentTermId"></el-input> -->
        <el-select v-model="InoutwriteForm.paymentTerm.paymentTermId" placeholder="请选择">
          <el-option
            v-for="item in skfsoptions"
            :key="item.paymentTermId"
            :label="item.paymentTermName"
            :value="item.paymentTermId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货币信息">
        <!-- <el-input placeholder="请输入货币信息ID" v-model="InoutwriteForm.currencyInfoId"></el-input> -->
        <el-select v-model="InoutwriteForm.currencyInfo.currencyInfoId" placeholder="请选择">
          <el-option
            v-for="item in hbxxoptions"
            :key="item.currencyInfoId"
            :label="item.currencyName"
            :value="item.currencyInfoId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收入金额">
        <el-input placeholder="请输入收入金额" v-model="InoutwriteForm.incomeAmount"></el-input>
      </el-form-item>
      <el-form-item label="支出金额">
        <el-input placeholder="请输入支出金额" v-model="InoutwriteForm.expenseAmount"></el-input>
      </el-form-item>

      <el-form-item label="客户信息">
        <!-- 级联选择器 -->
        <!-- <div class="block"> -->
        <!-- <el-cascader v-model="InoutwriteForm.createDate"></el-cascader> -->
        <!-- </div> -->
        <!-- <el-input placeholder="请输入制单日期" v-model="InoutwriteForm.createDate"></el-input> -->
        <!-- </el-form-item> -->
        <el-select v-model="InoutwriteForm.customerInfo.customerInfoId" placeholder="请选择">
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
          <el-cascader v-model="InoutwriteForm.createDate"></el-cascader>
        </div>-->
        <el-select v-model="InoutwriteForm.bankInfo.bankInfoId" placeholder="请选择">
          <el-option
            v-for="item in yhxxoptions"
            :key="item.bankInfoId"
            :label="item.bankName"
            :value="item.bankInfoId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账   号">
        <el-input placeholder="请输入账号" v-model="InoutwriteForm.account"></el-input>
      </el-form-item>
      <!-- <el-form-item label="审批流程ID">
        <el-input placeholder="请输入审批流程ID" v-model="InoutwriteForm.actInfoId"></el-input>
      </el-form-item>-->
      <el-form-item label="会计科目">
        <!-- 级联选择器 -->
        <div class="block">
          <!-- <el-cascader v-model="InoutwriteForm.accountTitleId"></el-cascader> -->
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
          <!-- <el-cascader v-model="InoutwriteForm.companyInfoId"></el-cascader> -->
          <el-select v-model="InoutwriteForm.companyInfo.companyInfoId" placeholder="请选择">
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
          <el-cascader v-model="InoutwriteForm.departmentId"></el-cascader>
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
          <!-- <el-cascader v-model="InoutwriteForm.productLineId"></el-cascader> -->
          <el-select v-model="InoutwriteForm.productLine.productLineId" placeholder="请选择">
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
          <!-- <el-cascader v-model="InoutwriteForm.projectInfoId"></el-cascader> -->
          <el-select v-model="InoutwriteForm.projectInfo.projectInfoId" placeholder="请选择">
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
        <el-input placeholder="示例:15" v-model="InoutwriteForm.sumRatio"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <!-- 可以搜索 -->
        <el-select
          v-model="valuepeople"
          @change="shenpivaluepeople(valuepeople)"
          multiple
          filterable
          placeholder="请选择(可以搜索)"
        >
          <el-option
            v-for="item in syroptions"
            :key="item.userInfoId "
            :label="item.userName"
            :value="item.userInfoId "
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input placeholder="请输入摘要" v-model="InoutwriteForm.comment"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input placeholder="请输入备注" v-model="InoutwriteForm.eventInfo.eventComment"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addList">立即录入</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 部门级联
      value: '',
      InoutwriteForm: {
        eventInfo: {
          eventComment: ''
        },
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
        comment: '',
        customerInfo: {
          customerInfoId: ''
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
        sumRatio: '',
        actExecutions: []
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
      valuepeople: [],
      syroptions: []
    }
  },
  created () {
    this.getpaymentTermId()
    this.getcurrencyInfoId()
    this.getcustomerInfoId()
    this.getbankInfoId()
    this.getaccountTitleId()
    this.getcompanyInfoId()
    this.getdepartmentId()
    this.getproductLineId()
    this.getprojectInfoId()
    this.getuserInfoList()
  },
  methods: {
    async getpaymentTermId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/paymentTerm/paymentTermList'
      )
      let aa = JSON.parse(localStorage.getItem('data'))
      this.InoutwriteForm.userInfo.userName = aa.userName
      this.InoutwriteForm.userInfo.userInfoId = aa.userInfoId
      // console.log(data)
      this.skfsoptions = data.data
      var cca = +new Date()
      this.InoutwriteForm.oddNumber = `HBTE-${cca}`
    },
    // 获取货币信息id
    async getcurrencyInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/currency/currencyInfoList'
      )
      // console.log(data)
      this.hbxxoptions = data.data
    },
    // 获取客户信息id
    async getcustomerInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/customer/customerInfoList'
      )
      // console.log(data)
      this.khxxoptions = data.data
    },
    // 获取客户信息id
    async getbankInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/bank/bankInfoList'
      )
      // console.log(data)
      this.yhxxoptions = data.data
      // console.log(this.yhxxoptions)
    },
    // 获取公司信息id
    async getcompanyInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/company/companyInfoList'
      )
      // console.log(data.data)
      this.gsxxoptions = data.data
      // console.log(this.yhxxoptions)
    },
    async getaccountTitleId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/accountTitle/accountTitleList'
      )
      // console.log(data)
      this.kjoptions = data.data
    },
    kjhandleChange (value) {
      // console.log(value)
      this.InoutwriteForm.accountTitle.accountTitleId =
        value[value.length - 1] || -1
    },
    async getdepartmentId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/department/departmentList'
      )
      // console.log(data.data)
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
      // console.log(data.data)
      this.cpxxxoptions = data.data
      // console.log(this.yhxxoptions)
    },
    // 获取项目信息id
    async getprojectInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/project/projectInfoList'
      )
      // console.log(data.data)
      this.xmxxoptions = data.data
      // console.log(this.xmxxoptions)
    },
    // 立即录入
    async addListmoban () {
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/incomeExpense/saveIncomeExpenseInfo',
        this.InoutwriteForm
      )
      console.log(22)

      console.log(data)
      if (data.code === 0) {
        this.$message.success('数据录入成功')
      } else {
        this.$message.error('数据录入失败')
      }
    },
    async addList () {
      try {
        const { data } = await this.$axios.post(
          'hbte-financial/hbte/incomeExpense/saveIncomeExpenseInfo',
          this.InoutwriteForm
        )
        console.log(data)
        if (data.code === 0) {
          this.$message.success('数据录入成功')
          // window.location.reload()
          this.$router.go('InOutWrite')
        } else {
          this.$message.error('数据录入失败')
          window.location.reload()
        }
      } catch (e) {
        console.log(e)
        this.$message.error('录入失败,请检查数据格式是否正确')
      }
    },
    resetForm () {
      // 通过 ref 拿到 el-form 组件, 调用重置方法
      // this.$refs.InoutwriteForm.resetFields()
      // this.$router.go('InOutWrite')
      // this.getpaymentTermId()
      // this.getcurrencyInfoId()
      // this.getcustomerInfoId()
      // this.getbankInfoId()
      // this.getaccountTitleId()
      // this.getcompanyInfoId()
      // this.getdepartmentId()
      // this.getproductLineId()
      // this.getprojectInfoId()
      // this.getuserInfoList()
      console.log(222)
    },
    async getuserInfoList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/userInfo/userInfoList'
      )
      console.log(data.data)

      this.syroptions = data.data
    },
    // ??
    shenpivaluepeople (v) {
      // console.log(v)
      const arr1 = []
      for (var i = 0; i < v.length; i++) {
        var aa = { userInfo: { userInfoId: v[i] }, actExecutionPriority: i }
        arr1.push(aa)
      }
      // console.log(arr1)
      this.InoutwriteForm.actExecutions = arr1
    }
  }
}
</script>

<style lang="scss" scoped>
.szlr {
  text-align: center;
  font-size: 20px;
}
</style>
