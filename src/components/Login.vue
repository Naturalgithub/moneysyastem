<template>
  <div class="login">
    <h1>HBTE财务管理系统欢迎您</h1>
    <!--
      el-form: 表单组件
        :model="form"  model 传入了一个对象, 作用: 给表单元素提供双向数据绑定
        label-width="80px"

      el-form-item: 表单项, 一个表单可以有多个表单项
        label 表单项的标签

      el-input: 文本框
        v-model="form.name" 和传入的form对象的某个属性双向绑定
    -->

    <!-- tab栏 -->
    <div class="login_warp">
      <div class="loginbox fl">
        <div class="login_header">
          <span @click="cur=0" :class="{active:cur==0}">账号登录</span>

          <span @click="cur=2" :class="{active:cur==2}">扫码登录</span>
        </div>
        <div class="login_content">
          <div v-show="cur==0" class="Cbody_item firstCbody_item">
            <el-form ref="form" status-icon :model="form" :rules="rules">
              <el-form-item label="用户名">
                <el-input @keyup.enter.native="login" v-model="form.jobNumber" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  @keyup.enter.native="login"
                  v-model="form.password"
                  type="password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item class="lastlogin">
                <!-- <a href="###" @click="login">登录</a> -->
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div v-show="cur==2" class="Cbody_item">
            <div class="login_container">
              <div class="login_title">
                <!-- <img src="img/caict.jpg" alt="钉钉登录系统" class="img-rounded img-responsive" /> -->
              </div>
              <div class="login_content" id="login_content"></div>
            </div>
            <!-- <div class="beizhu">打开钉钉手机客户端扫码登录</div> -->
          </div>
        </div>
      </div>
      <div class="loginrslider fl">
        <!-- <img src="../assets/vuetab/img/dbg.png.jpg" /> -->
        <img src="../assets/vuetab/img/公司大楼.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/vuetab/css/main.css'
// import 'jquery'
import '../assets/dingdingerweima'
export default {
  data () {
    return {
      cur: 0,
      form: {
        jobNumber: '',
        password: ''
      },
      personInfo: { jobNumber: '', userInfoId: '', userName: '' },
      rules: {
        jobNumber: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '用户名长度在 3 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '密码长度在 3 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    async login () {
      try {
        await this.$refs.form.validate()
        // 校验成功, 发送ajax
        const res = await this.$axios.post(
          'hbte-financial/hbte/login',
          this.form
        )
        // console.log(res.data)

        // const {
        //   meta: { status, msg },
        //   data
        // } = res
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: '登录成功',
            duration: 1000
          })
          console.log(res.data.data)
          this.personInfo.jobNumber = res.data.data.jobNumber
          this.personInfo.userInfoId = res.data.data.userInfoId
          this.personInfo.userName = res.data.data.userName
          localStorage.setItem('data', JSON.stringify(this.personInfo))
          // 编程式导航
          this.$router.push({ name: 'index' })
        } else {
          this.$message({
            type: 'error',
            message: res.data.errorMsg,
            duration: 1500
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 获取钉钉扫码相关参数
    resetForm () {
      // 通过 ref 拿到 el-form 组件, 调用重置方法
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
$bgColor: #2d434c;
@import '../assets/vuetab/css/main.css';
.login_header {
  margin-bottom: 15px;
}
.login_content {
  padding: 0;
  height: 290px;
  img {
    width: 30px;
    height: 100px;
  }
}

// .login_qrcode_content {
//   width: 100px;
//   height: 100px;
// }
// .login_content-body {
//   padding: 0 auto;
// }
.login {
  width: 100%;
  height: 100%;
  list-style: none;
  background: $bgColor;
  overflow: hidden;
  position: relative;
  a {
    padding-left: 90px;
  }
  h1 {
    // position: fixed;
    // transform: translateX(-50%);
    // left: -50%;
    margin-top: 40px;
    text-align: center;
    color: #409eff;
  }
  .el-form {
    width: 300px;
    height: 225px;
    background-color: #fff;
    // margin: 150px auto;
    // padding: 75px 20px 20px;
    border-radius: 20px;
    position: relative;
  }
}
.el-form-item {
  margin: 10px;
}
.lastlogin {
  margin-top: 10px;
}
</style>
