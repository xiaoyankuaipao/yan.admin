<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="userName" v-model="loginForm.userName" placeholder="请输入用户名" name="useName" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
          name="password" placeholder="请输入密码" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-password" @click="showPassword">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye':'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ required: true, triggr: 'blur', message: '请输入用户名' }],
        password: [{ required: true, triggr: 'blur', message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  watch: {

  },
  methods: {
    showPassword () {

    },
    handleLogin () {
      this.loading = true
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  .login-form {
    //相对定位，脱离文档流，“这个元素会偏移某个距离。但是该元素仍保持其未定位前的形状，它原本所占的空间仍保留。”
    //它是相对于自己来定位的，例如：#main{position:relative;top:-50px;},会在相对于它原来的位置上移50px
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container{
    position: relative;
    .title{
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
