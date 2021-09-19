<template>
  <form action="./login">
    <div class="sign-div">
        <h1 >Book Store</h1>
      <el-form  :model="user" :rules="rules" ref="user" class="demo-ruleForm" >
        <el-form-item prop="account" >
          <el-input type="text" v-model="user.account" autocomplete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input type="password" v-model="user.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass" >
          <el-input type="password" v-model="user.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
        </el-form-item>

        <el-form-item prop="email" >
          <el-input v-model="user.email" placeholder="绑定邮箱"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button  @click="submitForm('user')" class="sign-btn" style="width: 100px;">注册</el-button>
          <el-button  @click="resetForm('user')"  class="sign-btn" style="width: 100px;">重置</el-button>
          <a href="./login" style="height: auto">返回</a>
        </el-form-item>
      </el-form>

    </div>
  </form>

</template>

<script>
export default {
name: "signup",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.checkPass !== '') {
          this.$refs.user.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: {
        id: '',
        account: '',
        password: '',
        checkPass: '',
        email: '',
        ban: 0,
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]

      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('signup', this.user).then((resp) => {
                console.log(resp);
                if (resp.data === 'success') {
                  this.$message(
                      {
                        message: '注册成功',
                        type: 'success',
                      }
                  )
                  this.$router.push('/login');
                } else {
                  this.$message(
                      {
                        message: '该用户已注册！',
                        type: 'warning',
                      }
                  )
                }
              });
        } else {
          this.$message(
              {
                message: '注册失败！',
                type: 'warning',
              }
          )
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>


<style>
@import "../assets/css/LoginStyle.css";
</style>