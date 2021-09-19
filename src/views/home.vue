<template>
  <div id="page">
    <Navbar></Navbar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <div id="content" >
      <div id="myCarousel" class="carousel slide">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" >
          <div class="item active">
            <img :src="default_img3" alt="First slide" style="width: 100%">
          </div>
          <div class="item">
            <img :src="default_img2" alt="Second slide" style="width: 100%">
          </div>
          <div class="item">
            <img :src="default_img4" alt="Third slide" style="width: 100%">
          </div>
        </div>
        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div id="content_bottom" style="height: 650px">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li>
            <a href="#">首页</a>
          </li>
          <li class="active">
            共2000+种商品
          </li>
        </ul>
        <hr/>
        <div id="booklist">
          <div class="book" v-for="(item,index)  in books"
               @click="jumpDetail(item)"
               :key="index">
            <div class="bookimg">
              <img :src="require('@/assets/img/'+item.img)" alt="">
            </div>
            <div class="bookIntr" >
              <span>书名：《{{item.name}}》</span><br/>
              <span>售价：{{item.price}}</span>
            </div>
          </div>
        </div>

      </div>
      <div id="pagination">
        <el-pagination
            :page-size="8"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change = "page">
        </el-pagination>
      </div>

    </div >
  </div>
</template>


<script>
import Navbar from "@/components/Navbar";
export default {
  name: "home",
  components: {
    Navbar,
  },

  data(){
    return{
      default_img1:require("../assets/img/default1.png"),
      default_img2:require("../assets/img/default2.png"),
      default_img3:require("../assets/img/default3.png"),
      default_img4:require("../assets/img/default4.png"),
      total: null,
      books: []
    }
  },
  methods:{
    jumpDetail (info) {
      this.$axios("getBookById?id="+info.id).then(res=>{
        this.$store.commit('toDetail', res.data)
        this.$router.push('/detail')
      })
    },
    page(currentPage){
      this.$axios.get("getbook/"+currentPage+"/8").then(res=>{
        this.books = res.data.content
        this.total = res.data.totalElements
      })
    }
  },
  created() {
    // this.$axios.get("getbook").then(res=>{
    //   this.books = res.data
    this.$axios.get("getbook/1/8").then(res=>{
      this.books = res.data.content
      this.total = res.data.totalElements
    })
  }
}
</script>

<style>
@import "../assets/css/bootstrap.css";
@import "../assets/css/StoreStyle.css";
#pagination {
  text-align: center;
}
</style>
