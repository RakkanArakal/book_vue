<template lang="html">
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom" style="height: auto">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li><a href="./home">首页</a></li>
          <li class="active" v-if="isAdmin">订单管理</li>
          <li class="active" v-else>我的订单</li>
        </ul>

        <div class="container" >
          <div class="row clearfix" style="width:100%;">
            <div class="col-md" style="background-color:#DFF7FF " >
              <div class="bar">
                <input type="text" v-model="searchString" placeholder="输入搜索内容" style="width: 304px"/>
                <el-date-picker v-model="timepick" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                                end-placeholder="结束日期" style="width: 500px">
                </el-date-picker>
                <el-button  icon="el-icon-search" @click="getOrder">搜索订单</el-button>
              </div>

              <table class="table table-hover "  >
                <thead >
                <tr style="background-color: #C3F0FF;" >
<!--                  <th style="width: 30px;"></th>-->
                  <th style="width: 55px;vertical-align:middle;text-align:center">订单号</th>
                  <th style="width: 100px;" v-if="isAdmin" >下单用户</th>
                  <th style="width: 220px;">下单时间</th>
                  <th style="width: 220px;">书名</th>
                  <th style="width: 55px;">价格</th>
                  <th style="width: 55px;" >总价</th>
                </tr>
                </thead>
                <tbody style="vertical-align:middle">

                <tr v-for="(item,index) in filteredArticles" :key="index" style="vertical-align:middle">
<!--                  <td style="text-align:right">{{index+1}}</td>-->
                  <td style="vertical-align:middle;text-align:center">{{item[0].orderid}}</td>
                  <td style="vertical-align:middle" v-if="isAdmin" >{{item[0].username}}</td>
                  <td style="vertical-align:middle" > {{item[0].time}}</td>
                  <td >
                    <div v-for="(order,i) in item" :key="i"> {{order.bookname}}</div>
                  </td>
                  <td >
                    <div v-for="(order,i) in item" :key="i"> {{order.price}}</div>
                  </td>
                  <td style="vertical-align:middle">{{item[0].totalprice}}</td>
                </tr>
                </tbody>
              </table>
<!--              <table align=right style="margin-right: 30px;">-->
<!--                <tfoot >-->
<!--                <div v-if="order.length">-->
<!--                  <tr>-->
<!--                    <td colspan="2" >总共</td><td>{{order.length}}个订单</td>-->
<!--                  </tr>-->
<!--                </div>-->
<!--                <table v-else align=right style="margin-right: 40px;">-->
<!--                  <td  colspan="2"  >无订单</td>-->
<!--                </table>-->
<!--                </tfoot>-->
<!--              </table>-->
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
        // console.log(res)
        let tmp = {};
        res.data.forEach((item)=>{
          item.time = this.$fmt("yyyy-MM-dd hh:mm:ss",new Date(item.time));
          let id = item.orderid
          if(Object.prototype.hasOwnProperty.call(tmp,id)){
            tmp[id].push(item);
          }else
            tmp[id] = [item]
        })
        this.order = res.data;
        this.list = tmp;
        });
        // console.log(this.list);
    }
  },
  data(){
    return {
      isAdmin:false,
      userId:null,
      userName:null,
      searchString: "",
      order: [],
      list:{},
      timepick: ["", ""],
    }
  },
  components: {
    Navbar
  },
  computed:{
    filteredArticles: function () {
      var list_array = this.list;
      var searchString = this.searchString;

      if(!searchString){

        return this.list;
      }
      let tmp = {};

      searchString = searchString.trim().toLowerCase();
      for(var i in list_array){
        // console.log(list_array[i])
        list_array[i].filter(function(item){
          if(item.bookname.toLowerCase().indexOf(searchString) !== -1){
            let id = item.orderid
            if(Object.prototype.hasOwnProperty.call(tmp,id)){
              tmp[id].push(item);
            }else
              tmp[id] = [item]
          }
        })
      }
      return tmp;
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
