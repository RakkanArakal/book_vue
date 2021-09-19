<template>
  <div id="page">
    <Navbar></Navbar>
    <div id="content">

      <div id="content_bottom" style="height: 500px">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li><a href="./home">首页</a></li>
          <li class="active">《{{bookItem.name}}》</li>
        </ul>

        <div class="book_detail">
          <div class="book_detail_img">
           <img :src= "require('@/assets/img/'+bookItem.img)">
          </div>
        </div>
        <div class="book_detail">
          <div id="book_text">
            <span>《{{bookItem.name}}》</span><br/>
            <h1>{{bookItem.intro}}</h1><br/><hr/>
            <h2>作者:{{bookItem.author}}&nbsp;&nbsp;国际标准书号 ISBN： {{bookItem.isbn}} </h2>
          </div>
        </div>
        <div id="botton_img">
          <input type="image" img :src="Buy" alt="Submit" style="margin:300px 220px 38px -20px;"/>
          <input type="image" @click="addCart" img :src="Cartt" alt="Submit" style="margin:-80px 0px 58px 90px;"/>
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
      Cartt:require("../assets/img/cartt.png"),
      Buy:require("../assets/img/carte.png"),

      type: sessionStorage.getItem('type'),
      bookItem: this.$store.state.detail
    }
  },
  name: "home",
  components: {
    Navbar
  },

  methods:{
    addCart () {
      this.$store.commit('addCart', this.bookItem)
      // console.log(this.bookItem)
      alert("已添加至购物车")
    },
  }

}
</script>

<style>
@import "../assets/css/bootstrap.css";
@import "../assets/css/StoreStyle.css";

#botton_img input[type='image']{
  height: 100%;
  margin-left:20px;
  margin-top:50px;
  border-radius:5px;
}
</style>
