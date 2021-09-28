<template>
    <div class="sign-div">
      <h1>Book Store</h1>
      <input class="sign-text" type="text" placeholder="用户名"  v-model="username">
      <input class="sign-text" type="password" placeholder="密码" v-model="password" @keyup.enter="submit()">
      <input class="sign-btn" type="button" value="登录" @click="logintoHome" @keyup.enter="submit()" >
      <a href="./signup">注册用户</a>
<!--      <a href="./admin">Admin</a>-->
    </div>
</template>

<script>
export default {
  name: "login",
  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    logintoHome() {
      console.log(this.username)
      console.log(this.password)
      if (!this.username || !this.password)
        return alert("账号或密码为空")
      this.$axios
          .get("Login?userName=" + this.username + "&password=" + this.password)
          .then(res => {
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
              this.$router.push('/home')
              console.log(this.$store.state.cart);
              this.$store.state.cart.splice(this.$store.state.cart.length)
              for(var i = 0;this.$store.state.cart.length; i++)
                this.$store.state.cart.splice(0, 1);
              return alert("登陆成功")
            }
          })
    },
    submit() {
      this.$axios({
      }).then((res) => {
        if (res.code === 1) {
          //登录成功后禁止按enter键再次重新登录
          document.onkeydown = undefined;
        }
      })
    },
  },
  created(){
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    var key;
    document.onkeydown = function(e){
      if(window.event == undefined){
        key = e.keyCode;
      }else{
        key = window.event.keyCode;
      }
      if(key == 13){
        this.logintoHome();
      }
    }
  },

}
</script>

<style scoped>
@import "../assets/css/LoginStyle.css";
</style>