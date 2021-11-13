<template lang="html">
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom" style="height: auto">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li><a href="./home">首页</a></li>
          <li class="active">热销榜单</li>
        </ul>

        <div class="container" >
          <div class="row clearfix" style="width:100%;">
            <div class="col-md" style="background-color:#DFF7FF " >
              <div class="bar">

                <el-date-picker v-model="timepick" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期" style="width: 804px">
                </el-date-picker>
                <el-button  icon="el-icon-search" @click="getOrder">搜索订单</el-button>
              </div>

              <table class="table table-hover " >
                <thead>
                <tr style="background-color: #C3F0FF">
                  <th style="width: 30px;"></th>
                  <!--                  <th style="width: 200px;" v-if="isAdmin" >下单用户</th>-->

                  <th style="width: 550px;">书名</th>
                  <!--                  <th style="width: 520px;">介绍</th>-->
                  <th style="width: 55px;">销量</th>
                  <th style="width: 55px;">价格</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in list" :key="index" style="vertical-align:middle">
                  <th style="width: 30px;"></th>
                  <td style="vertical-align:middle;">{{item.bookname}}</td>
                  <!--                  <td style="vertical-align:middle" >{{item[0].intro}}</td>-->
                  <!--                  <td style="vertical-align:middle" v-if="isAdmin" >{{item[0].intro}}</td>-->
                  <td style="vertical-align:middle" > {{item.len}}</td>
                  <td style="vertical-align:middle">{{item.price}}</td>
                </tr>
                </tbody>
              </table>
              <table align=right style="margin-right: 30px;">
<!--                <tfoot >-->
<!--                <div v-if="order.length">-->
<!--                  <tr>-->
<!--                    <td colspan="2" >总共{{totalbook}}本书，共</td><td>{{totalprice}}元</td>-->
<!--                  </tr>-->
<!--                </div>-->
<!--                <table v-else align=right style="margin-right: 40px;">-->
<!--                  <td  colspan="2"  >无记录</td>-->
<!--                </table>-->
<!--                </tfoot>-->
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
  methods: {
    async getOrder(){
      let t1 = "";
      let t2 = "";
      let id = this.userId;
      if (this.timepick) {
        t1 = this.timepick[0] ? this.$fmt("yyyy-MM-dd hh:mm:ss", this.timepick[0]) : '';
        t2 = this.timepick[1] ? this.$fmt("yyyy-MM-dd hh:mm:ss", this.timepick[1]) : '';
      }
      await this.$axios.post("getOrders",this.$qs.stringify({id,t1,t2})).then((res)=>{

        this.totalprice = 0;
        this.totalbook = 0;
        let tmp = [];
        res.data.forEach((item)=> {
          let bid = item.bookid;
          let flag = 0
          for (var i = 0; i < tmp.length; i++) {
            if (tmp[i].bookid == bid) {
              tmp[i].len++
              flag = 1
            }
          }
          if (!flag) {
            tmp.push(item)
            tmp[tmp.length - 1].len = 1
          }
        })

        this.order = res.data;
        tmp.sort(function(a,b){
          return b.len - a.len
        })
        this.list = tmp;
        console.log(tmp)
      });
    }
  },
  data(){
    return {
      isAdmin:false,
      userId:null,
      userName:null,
      searchString: "",
      order: [],
      totalprice : 0,
      totalbook:0,
      timepick: ["", ""],
      list:[],
    }
  },
  components: {
    Navbar
  },
  computed:{
    filteredArticles: function () {
      return this.list;
    }
  },
  created() {
    this.userName = localStorage.getItem("userName")
    this.userId = localStorage.getItem("userId")
    this.getOrder()
    if(localStorage.getItem("userName") == "admin")
      this.isAdmin = true;
  },

}

</script>

<style  >


</style>
