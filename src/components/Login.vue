<template>
  <div class="login">
    <!--
      el-form: 表单组件
        :model="form"  model 传入了一个对象, 作用: 给表单元素提供双向数据绑定
        label-width="80px"

      el-form-item: 表单项, 一个表单可以有多个表单项
        label 表单项的标签

      el-input: 文本框
        v-model="form.name" 和传入的form对象的某个属性双向绑定
     -->
    <el-form ref="form" status-icon :model="form" :rules="rules" label-width="80px">
      <img src="../assets/avatar.jpg" alt="">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 12, message: '用户名长度在 3 到 12 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 3, max: 10, message: '密码长度在 3 到 10 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(valid => {
        // 如果校验不通过, 直接返回
        if (!valid) return
        // 校验成功, 发送ajax
        axios.post('http://localhost:8888/api/private/v1/login', this.form).then(res => {
          const { meta: { status, msg }, data } = res.data
          if (status === 200) {
            this.$message({
              type: 'success',
              message: '登录成功',
              duration: 1000
            })
            // 把token存储起来
            localStorage.setItem('token', data.token)
            // 编程式导航
            this.$router.push({ name: 'index' })
          } else {
            this.$message({
              type: 'error',
              message: msg,
              duration: 1500
            })
          }
        })
      })
    },
    resetForm () {
      // 通过 ref 拿到 el-form 组件, 调用重置方法
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss">
$bgColor: #2d434c;

.login {
  width: 100%;
  height: 100%;
  list-style: none;
  background: $bgColor;
  overflow: hidden;

  .el-form {
    width: 400px;
    background-color: #fff;
    margin: 200px auto;
    padding: 75px 20px 20px;
    border-radius: 20px;
    position: relative;
    img {
      width: 120px;
      height: 120px;
      position: absolute;
      left: 50%;
      top: -70px;
      transform: translateX(-50%);
      border-radius: 50%;
      background-color: #fff;
      border: 5px solid #fff;
    }

    .el-button:last-child {
      margin-left: 80px;
    }
  }
}
</style>
