<template>
  <div class="InOutWrite">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收支系统</el-breadcrumb-item>
      <el-breadcrumb-item>收支录入</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分栏 -->

    <el-form :inline="true" :model="InoutwriteForm" class="demo-form-inline">
      <!-- <el-row :gutter="10"> -->
      <el-form-item label="单　　号">
        <el-input v-model="InoutwriteForm.oddNumber" placeholder="审批人" :lg="12"></el-input>
      </el-form-item>
      <el-form-item label="制单日期">
        <div class="block">
          <el-date-picker
            v-model="InoutwriteForm.createDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
      </el-form-item>
      <!-- </el-row> -->
      <el-form-item label="制单人员">
        <el-input :disabled="true" placeholder="请输入制单人" v-model="InoutwriteForm.userInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="收款方式">
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
        <el-select v-model="InoutwriteForm.customerInfo.customerInfoId" placeholder="请选择">
          <el-option
            v-for="item in khxxoptions"
            :key="item.customerInfoId"
            :label="item.customerName"
            :value="item.customerInfoId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账   号">
        <el-input placeholder="请输入账号" v-model="InoutwriteForm.account"></el-input>
      </el-form-item>
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
      <el-form-item label="摘　　要">
        <el-input v-model="InoutwriteForm.comment" placeholder="审批人"></el-input>
      </el-form-item>
      <div>
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
        <el-form-item label="备　　注">
          <el-input autosize v-model="InoutwriteForm.eventInfo.eventComment" placeholder="审批人"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label>
          <el-button type="success" @click="startIn" style="margin-left:0;">点击添加产品线</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="productLine.productLineName" label="产品线"></el-table-column>
      <el-table-column prop="sumRatio" label="比　例"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" @click="addListmoban" style="margin:10px;float:left">立即录入</el-button>
    <!-- 立即录入的模态框 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
      <el-form ref="formtest" :model="formtest" label-width="80px">
        <el-form-item label="产品线">
          <el-select v-model="formtest.productLineId" @change="chanpinxian" placeholder="请选择">
            <el-option
              v-for="item in cpxxxoptions"
              :key="item.productLineId"
              :label="item.productLineName"
              :value="item.productLineId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="比　例">
          <el-input v-model="formtest.sumRatio"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addList(formtest)">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      aa: '',
      formtest: {
        productLineId: '',
        productLineName: '',
        sumRatio: ''
      },
      dialogVisible: false,
      InoutwriteForm: {
        ieProductLines: '',
        eventInfo: {
          eventComment: ''
        },
        oddNumber: '',
        createDate: '',
        // createTime: '',
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
        projectInfo: {
          projectInfoId: ''
        },
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
    this.getproductLineId()
    this.getpaymentTermId()
    this.getcurrencyInfoId()
    this.getcustomerInfoId()
    this.getcompanyInfoId()
    this.getdepartmentId()
    this.getaccountTitleId()
    // this.chanpinxian()
    this.getprojectInfoId()
    this.getuserInfoList()
    this.getbankInfoId()
  },
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    startIn () {
      this.dialogVisible = true
    },
    addList (formtest) {
      // console.log(11)
      let productLineId = this.formtest.productLineId
      let sumRatio = this.formtest.sumRatio
      // console.log(this.aa)
      this.tableData.push({
        productLine: {
          productLineId: productLineId,
          productLineName: this.aa
        },
        sumRatio: sumRatio
      })
      this.InoutwriteForm.ieProductLines = this.tableData
      console.log(this.tableData)
      this.dialogVisible = false
      // this.$refs.formtest.resetFields()
      this.formtest.productLineId = ''
      this.formtest.productLineName = ''
      this.formtest.sumRatio = ''
    },
    chanpinxian (value) {
      var obj = {}
      obj = this.cpxxxoptions.find(function (item) {
        return item.productLineId === value
      })
      console.log(obj)
      this.aa = obj.productLineName
      // obj 就是被选中的那个对象，
    },
    async getpaymentTermId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/paymentTerm/paymentTermList'
      )
      let aa = JSON.parse(localStorage.getItem('data'))
      this.InoutwriteForm.userInfo.userName = aa.userName
      this.InoutwriteForm.userInfo.userInfoId = aa.userInfoId
      console.log(data)
      this.skfsoptions = data.data
      var cca = parseInt(Math.random() * 10000000)
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1 // 月份从0开始
      var day = date.getDate() // 日期
      // let asc = cca.slice(3)
      // console.log(asc)

      this.InoutwriteForm.oddNumber = `HBTE-${year}${month}${day}${cca}`
    },
    // 获取货币信息id
    async getcurrencyInfoId () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/currency/currencyInfoList'
      )
      // console.log(data)
      this.hbxxoptions = data.data
    },
    // // 获取客户信息id
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
    // // 获取公司信息id
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
    // // 立即录入
    async addListmoban () {
      this.$message.success('请确认数据是否填充完整')
      const { data } = await this.$axios.post(
        'hbte-financial/hbte/incomeExpense/saveIncomeExpenseInfo',
        this.InoutwriteForm
      )
      console.log(22)

      console.log(data)
      if (data.code === 0) {
        this.$message.success('数据录入成功')
        window.location.reload()
      } else {
        this.$message.error('数据录入失败,请确认数据是否填充完整')
      }
    },
    // async addList () {
    //   try {
    //     const { data } = await this.$axios.post(
    //       'hbte-financial/hbte/incomeExpense/saveIncomeExpenseInfo',
    //       this.InoutwriteForm
    //     )
    //     console.log(data)
    //     if (data.code === 0) {
    //       this.$message.success('数据录入成功')
    //       // window.location.reload()
    //       this.$router.go('InOutWrite')
    //     } else {
    //       this.$message.error('数据录入失败')
    //       window.location.reload()
    //     }
    //   } catch (e) {
    //     console.log(e)
    //     this.$message.error('录入失败,请检查数据格式是否正确')
    //   }
    // },
    // resetForm () {
    //   // 通过 ref 拿到 el-form 组件, 调用重置方法
    //   // this.$refs.InoutwriteForm.resetFields()
    //   // this.$router.go('InOutWrite')
    //   // this.getpaymentTermId()
    //   // this.getcurrencyInfoId()
    //   // this.getcustomerInfoId()
    //   // this.getbankInfoId()
    //   // this.getaccountTitleId()
    //   // this.getcompanyInfoId()
    //   // this.getdepartmentId()
    //   // this.getproductLineId()
    //   // this.getprojectInfoId()
    //   // this.getuserInfoList()
    //   console.log(222)
    // },
    async getuserInfoList () {
      const { data } = await this.$axios.get(
        'hbte-financial/hbte/userInfo/userInfoList'
      )
      console.log(data.data)

      this.syroptions = data.data
    },
    // // ??
    shenpivaluepeople (v) {
      // console.log(v)
      const arr1 = []
      for (var i = 0; i < v.length; i++) {
        var aa = { userInfo: { userInfoId: v[i] }, actExecutionPriority: i }
        arr1.push(aa)
      }
      console.log(arr1)
      this.InoutwriteForm.actExecutions = arr1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
