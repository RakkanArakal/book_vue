<template >
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom" style="height: auto">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li><a href="./home">首页</a></li>
          <li class="active">书籍索引</li>
        </ul>
        <div class="container" >
          <div class="row clearfix" style="width:100%;">
            <div class="col-md" style="background-color:#DFF7FF " >
              <div class="bar">
                <input type="text" v-model="searchString" placeholder="输入搜索内容" />
              </div>
              <table class="table table-hover " >
                <thead>
                <tr style="background-color: #C3F0FF">
                  <th style="width: 220px;">书名</th>
                  <th style="width: 220px;">作者</th>
                  <th style="width: 135px;">isbn编号</th>
                  <th style="width: 50px;">库存</th>
                  <th style="width: 50px;" v-if="isAdmin" > </th>
                  <th style="width: 50px;" v-if="isAdmin" > </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in filteredArticles" :key="index">
                  <td >{{item.name}}</td>
                  <td >{{item.author}}</td>
                  <td >{{item.isbn}}</td>
                  <td >{{item.stock}}</td>
                  <td @click="editBooks(item)" class="del-goods" v-if="isAdmin" >修改</td>
                  <td @click="open(item)" class="del-goods" v-if="isAdmin" >删除</td>
                </tr>
                </tbody>
              </table>
              <table align=right style="margin-right: 30px;">
                <tfoot >
                <div v-if="books.length">
                  <tr>
                    <td colspan="2" >书库里</td><td>(共{{counts}}款书)</td>
<!--                    <button @click="greet" v-if="isAdmin">保存数据</button>-->
                  </tr>
                </div>
                <table v-else align=right style="margin-right: 40px;">
                  <td  colspan="2"  >书库为空 </td>
                </table>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      <el-dialog model="entity" :rules="rules" ref="entity"
                 title="书籍信息" :visible.sync="dialogFormVisible" width="50%" :close-on-click-modal="false"
                 :close-on-press-escape="false" :show-close="false">
        <el-form :model="entity">
          <el-form-item label="书名" prop="name">
            <el-input v-model="entity.name"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="entity.author"></el-input>
          </el-form-item>
          <el-form-item label="isbn" prop="isbn">
            <el-input v-model.number="entity.isbn"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model.number="entity.price"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="img">
            <el-input v-model="entity.img"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
            <el-input v-model="entity.intro"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input v-model.number="entity.stock"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveBook">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>

import Navbar from "@/components/Navbar";
export default {
  data(){
    return{
      isAdmin:false,
      searchString: "",
      dialogFormVisible: false,
      entity: {},
      books: [],
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
    }
  },
  ///
  components: {
    Navbar
  },
  computed:{
    //
    counts() {
      return this.books.length;
    },
      // 计算数学，匹配搜索
      filteredArticles: function () {
        var list_array = this.books,
        searchString = this.searchString;
        if(!searchString){
          return list_array;
        }
        searchString = searchString.trim().toLowerCase();
        list_array = list_array.filter(function(item){
          if(item.name.toLowerCase().indexOf(searchString) !== -1){
            return item;
          }
        })
        return list_array;
    }
  },
  methods: {
    editBooks(item) {
      this.entity = item;
      this.dialogFormVisible = true;
    },
    saveBook(){
      const _this = this;
      this.dialogFormVisible = false;

      this.$axios.post('editBook', this.entity).then(function (){
        alert('《'+_this.entity.name+'》修改成功!');
        window.location.reload();

      })
    },
    open(item) {
      this.$confirm('此操作将永久删除此书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('deleteBook/' + item.id).then(function () {
          // _this.$message('《' + item.name + '》删除成功!跳转至书籍索引页');
          window.location.reload();
        })
        this.$message({
          type: 'success',
          message: '《' + item.name + '》删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {
    this.$axios.get("getbook").then(res=>{
      this.books = res.data
    });
        if(localStorage.getItem("userName") == "admin")
          this.isAdmin = true;

  },

}

</script>

<style >
ul{
  list-style-type: none;
}
@import "../assets/css/bootstrap.css";
@import "../assets/css/StoreStyle.css";

.bar input{
  background:#fff no-repeat 13px 13px;
  border: none;
  width: 100%;
  line-height: 19px;
  padding: 11px 0;

  border-radius: 2px;
  box-shadow: 0 2px 8px #c4c4c4 inset;
  text-align: left;
  font-size: 14px;
  font-family: inherit;
  color: #738289;
  font-weight: bold;
  outline: none;
  text-indent: 40px;
}
</style>
