<template>
  <div class="login-container">
    <transition name="form-fade" mode="in-out" >
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left" v-show="showLoginForm">
        <div class="title-container">
          <h3 class="title">Login Form</h3>
        </div>

        <el-form-item prop="userName">
          <el-input
            ref="userName"
            v-model="loginForm.userName"
            placeholder="| 请输入用户名"
            :prefix-icon="userNameIcon"
            name="useName"
            @focus="userFocusHandle(true)"
            @blur="userFocusHandle(false)"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            type="password"
            :prefix-icon="passwordIcon"
            @focus="passwordFocusHandle(true)"
            @blur="passwordFocusHandle(false)"
            name="password"
            placeholder="| 请输入密码"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin" />
        </el-form-item>

        <el-button :loading="loading" type="primary"  class="submit_btn" @click.native.prevent="handleLogin">登录</el-button>

      </el-form>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      showLoginForm: false,
      userNameFocus: false,
      passwordFocus: false,
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ required: true, triggr: 'blur', message: '请输入用户名' }],
        password: [{ required: true, triggr: 'blur', message: '请输入密码' }]
      },
      loading: false
    }
  },
  mounted () {
    this.showLoginForm = true
  },
  watch: {

  },
  methods: {
    userFocusHandle (isFocus) {
      this.userNameFocus = isFocus
    },
    passwordFocusHandle (idFocus) {
      this.passwordFocus = idFocus
    },
    handleLogin () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', {userName: this.loginForm.userName, password: this.loginForm.password, clientId: 'vue-manage'}).then(() => {
            this.$router.push('/')
            this.loading = false
          }).catch(error => {
            console.log(error)
            this.loading = false
            this.$message({
              type: 'error',
              title: '错误',
              message: error.toString()
            })
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100
          })
          return false
        }
      })
    }
  },
  computed: {
    userNameIcon () {
      return this.userNameFocus ? 'blank iconfont icon-account focus' : 'blank iconfont icon-account'
    },
    passwordIcon () {
      return this.passwordFocus ? 'blank iconfont icon-lock focus' : 'blank iconfont icon-lock'
    }
  }
}
</script>

<style lang="less">
.login-container{
  height: 100%;
  width: 100%;
  // background-color: #2d3a4b;
  background: url('../../assets/loginBg.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .login-form {
    //相对定位，脱离文档流，“这个元素会偏移某个距离。但是该元素仍保持其未定位前的形状，它原本所占的空间仍保留。”
    //它是相对于自己来定位的，例如：#main{position:relative;top:-50px;},会在相对于它原来的位置上移50px
    position: relative;
    width: 400px;
    max-width: 100%;
    top: 150px;
    padding: 20px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    opacity: 0.9;
    background-color:#324056;
    border-radius: 10px;

    .submit_btn{
      width: 100%;
      font-size: 16px;
      background-color: #1aa2ff;
      border: 1px solid #1aa2ff;
      color: #ffffff;
      margin-bottom:30px;
    }
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

  /* 修改element 样式 */
  input {
    background:#2d3a4b;
    border-color: #2d3a4b;
    color: #c3c3c3;
    height: 45px;
  }
  .el-form-item {
    margin-top: 30px;
  }
  .el-input__icon {
    left: 0;
  }
  .el-form-item__error {
    color: #e04f78;
    padding-top: 8px;
  }
  .el-input__icon + .el-input__inner{
    padding-left:40px;
  }
  .el-form-item.is-error .el-input__inner{
    border-color:#e04f78;
  }
 .focus {
    color: #1aa2ff;
  }
  /*动画效果*/
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 0.8s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
}
</style>
