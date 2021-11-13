<template>
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom" style="height: auto">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li><a href="./home">首页</a></li>
          <li class="active">书籍添加</li>
        </ul>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px"
                 style="width: 920px;margin-top: 30px;" class="demo-ruleForm">
          <el-form-item label="书名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <el-form-item label="isbn" prop="isbn">
            <el-input v-model.number="ruleForm.isbn"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model.number="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="img">
            <el-input v-model="ruleForm.img"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input v-model="ruleForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input v-model.number="ruleForm.stock"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 50px;">
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        author: '',
        isbn: '',
        price: '',
        img: '',
        intro: ''
      },
      rules: {
        name: [
          { required: true, message: '书名不能为空', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' },
        ],
        isbn: [
          { required: true, message: 'isbn编码不能为空', trigger: 'blur' },
          { type: 'number', message: 'isbn编码必须为数字'}
        ],
        price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字'}
        ],
        img: [
          { required: true, message: '图片地址不能为空', trigger: 'blur' },
        ],
        intro: [
          { required: true, message: '简介不能为空', trigger: 'blur' },
        ],
        stock: [
          { required: true, message: '库存不能为空', trigger: 'blur' },
          { type: 'number', message: '库存必须为数字'}
        ],

      },

    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.$axios.post('Book',this.ruleForm).then(function (resp){
            if(resp.data == 'success'){
              _this.$message('《'+_this.ruleForm.name+'》添加成功!跳转至书籍索引页');
              _this.$router.push('/admin');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    Navbar
  },
}

</script>

<style >

</style>
