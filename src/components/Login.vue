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
    <el-form ref="form" :model="form" label-width="80px">
      <img src="../assets/avatar.jpg" alt="">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
