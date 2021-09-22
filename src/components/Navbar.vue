<template >
  <div class="nav-title">
    <div id="page">
     <div id="top">
      <div id="top_left">
        <img :src="logoimg">
      </div>

      <div id="top_right" v-if="isAdmin">
        <img :src="adminimg">
        <a v-for="(item,index) in adminBar"
           :key="index"
           @click="menuBarClick(item)"> {{item.name}}  </a>
      </div>

       <div id="top_right" v-else>
         <img :src="cartimg">
         <a v-for="(item,index) in menuBar"
            :key="index"
            @click="menuBarClick(item)"> {{item.name}}  </a>
       </div>

    </div>
      <div id="username">
        <span >你好，{{username}}！ </span>
      </div>
    <div class="clear"></div>
    <div id="menu" >
      <a v-for="(item,index) in bookBar"
         :key="index"
         @click="bookBarClick(item)" class="all" >{{item.name}}</a>

    </div>

      <div id="search">
              <span>搜索</span>
              <input type="text" />
              <input img :src="searchimg" type="image"/>
      </div>

  </div>
</div>
</template>

<script>


export default {
  name: "navbar",
  data(){
    return{
      username:"",
      isAdmin:false,
      logoimg:require("../assets/img/LOGO.png"),
      adminimg:require("../assets/img/admin.png"),
      cartimg:require("../assets/img/cart1.png"),
      searchimg:require("../assets/img/search1.png"),
      menuBar:[
        { name: '购物车',  link: '/cart' },
        { name: '书籍索引', link: '/Books' },
        { name: '我的订单', link: '/myOrder' },
        { name: '消费统计', link: '/statistic' },
        { name: '退出登录', link: '/login'},
      ],
      adminBar:[
        { name: '用户管理',  link: '/account' },
        { name: '书籍索引', link: '/Books' },
        { name: '书籍添加', link: '/addBook' },
        { name: '订单管理', link: '/myOrder' },
        { name: '热销榜单', link: '/hotsell' },
        { name: '畅销榜单', link: '/customersell' },
        { name: '退出登录', link: '/login'},
      ],
      bookBar:[
        { name: '首页',    link: '/home' },
        { name: '亲子教育', link: '/home' },
        { name: '历史地理', link: '/home' },
        { name: '舞蹈戏剧', link: '/home' },
        { name: '农业科学', link: '/home' },
        { name: '大专文教', link: '/home' },
        { name: '大型多人在线交流中心', link: '/chatRoom' },
      ],
    }
  },
  methods: {
    bookBarClick(item) {
      if(item.link == "/login"){
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
      }
      this.$router.push(item.link)
    },
    menuBarClick(item) {
      console.log(item)
      if(item.link == "/login"){
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
      }
      this.$router.push(item.link)
    }
  },
  created() {
    this.username = localStorage.getItem("userName");
    if(this.username == "admin")
      this.isAdmin = true;
  },
}
</script>
<style scoped>
</style>