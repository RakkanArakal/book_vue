<template >
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom" style="height: auto">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li><a href="./home">首页</a></li>
          <li class="active">全文搜索</li>
        </ul>
        <div class="container" >
          <div class="row clearfix" style="width:100%;">
            <div class="col-md" style="background-color:#DFF7FF " >
              <div class="bar">
                <input type="text" @keyup.enter="searchBooks" v-model="searchKey" placeholder="输入搜索内容" style="width: 91%" />
                <el-button round @click="searchBooks" >搜索</el-button>
              </div>
              <table class="table table-hover " >
                <thead>
                <tr style="background-color: #C3F0FF">
                  <th style="width: 220px;">书名</th>
                  <th style="width: 420px;" >简介</th>
                  <th style="width: 50px;">库存</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in filteredArticles" :key="index">
                  <td >{{item.name}}</td>
                  <td >{{item.intro}}</td>
                  <td >{{item.stock}}</td>
                </tr>
                </tbody>
              </table>
              <table align=right style="margin-right: 30px;">
                <tfoot >
                <div v-if="books.length">
                  <tr>
                    <td colspan="2" ></td>共找到<td>({{counts}}本书)</td>
                  </tr>
                </div>
                <table v-else align=right style="margin-right: 40px;">
                  <td  colspan="2"  >共找到0本书 </td>
                </table>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import Navbar from "@/components/Navbar";
export default {
  data(){
    return{
      isAdmin:false,
      searchKey: "",
      dialogFormVisible: false,
      entity: {},
      books: [],
    }
  },
  ///
  components: {
    Navbar
  },
  computed:{
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
    searchBooks(){
      if(this.searchKey == "")
        this.$axios.get("book").then(res=>{
          console.log(res)
          this.books = res.data
        })
      else
      this.$axios.post('searchBooks', this.searchKey).then(res=>{
        console.log(res)
        this.books = res.data
      })
    }
  },
  created() {
    this.$axios.get("book").then(res=>{
      console.log(res)
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
@import "../../assets/css/bootstrap.css";
@import "../../assets/css/StoreStyle.css";

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
