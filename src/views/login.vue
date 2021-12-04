<template>
    <div class="sign-div">
      <h1>Book Store</h1>
      <input class="sign-text" type="text"  placeholder="用户名"  v-model="user.account">
      <input class="sign-text" type="password" placeholder="密码" v-model="user.password" @keyup.enter="logintoHome()">
      <input class="sign-btn" type="button" value="登录" @click="logintoHome" >
      <a href="./signup">注册用户</a>
<!--      <a href="./admin">Admin</a>-->
    </div>
</template>

<script>
export default {
  name: "login",
  data () {
    return {
      user: {
        id: '',
        account: '',
        password: '',
        checkPass: '',
        email: '',
        ban: 0,
      },
    }
  },

  methods: {
    logintoHome() {
      console.log(this.user.account)
      console.log(this.user.password)
      const _this = this
      if (!this.user.account || !this.user.password)
        return alert("账号或密码为空")
      this.$axios
          .post('Login' , _this.user).then(res => {
            console.log(res);
            if (!res || !res.data) {
              return alert("账号或密码错误")
            }
            else if(res.data.ban){
              alert("您的账号已经被禁用！")
              return;
            }
            else {
              localStorage.setItem('userName', res.data.account)
              localStorage.setItem('userId', res.data.id)
              localStorage.setItem('count', res.data.count)
              this.$router.push('/home')
              // console.log(this.$store.state.cart);
              this.$store.state.cart.splice(this.$store.state.cart.length)
              for(var i = 0;this.$store.state.cart.length; i++)
                this.$store.state.cart.splice(0, 1);
              return alert("登陆成功")
            }
          })
    },
  },
  created(){
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
  },

}
</script>

<style scoped>
@import "../assets/css/LoginStyle.css";
</style>