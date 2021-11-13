
<template lang="html">
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li><a href="./home">首页</a></li>
          <li class="active">购物车</li>
        </ul>
        <div class="container" >
          <div class="row clearfix" style="width:100%;">
            <div class="col-md" style="background-color:#DFF7FF " >
              <table class="table table-hover " >
                <thead>
                <tr style="background-color: #C3F0FF">
                  <th style="width: 250px;">书名</th>
                  <th style="width: 520px;">介绍</th>
                  <th style="width:  50px;">库存</th>
                  <th style="width:  50px;">价格</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody v-for="(item,index) in cartList" :key="index">
                <tr >
                  <td >{{item.name}}</td>
                  <td >{{item.intro}}</td>
                  <td >{{item.stock}}</td>
                  <td >{{item.price}}</td>
                  <td @click="delGoods(index)" class="del-goods">删除</td>
                </tr>
                </tbody>
              </table>
              <table align=right style="margin-right: 30px;">
                <tfoot >
                <div v-if="cartList.length">
                <tr>
                  <td colspan="2" >总价</td><td>{{totalPrice}} (共{{counts}}件商品)</td>
                  <button @click="addOrder" >提交订单</button>
                </tr>
                </div>
                <table v-else align=right style="margin-right: 40px;">
                <td  colspan="2"  >购物车为空 </td>
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
  name:"cart",
  data(){
    return{
      userId:null,
      userName:null,
      cartList: this.$store.state.cart,
    }
  },
  components: {
    Navbar
  },
  computed:{
    totalPrice(){
      var num = 0;
      for (var i = 0; i < this.cartList.length; i++) {
        num += this.cartList[i].price;
      }
      return num;
    },
    counts(){
      return this.cartList.length;
    }
  },
  methods: {
    delGoods(index) {
      this.cartList.splice(index, 1);
    },
    async addOrder() {
      let BookOrder = this.cartList
          .map((item) => {
            return {
              bookname: item.name,
              bookid: item.id,
              price: item.price,
              time: '',
              orderid: "",
            };
          });
      console.log(BookOrder)
      let res = await this.$axios.post('addOrder',{
        orderDetail:JSON.stringify(BookOrder),
        Order:{
          userid:this.userId,
          username:this.userName,
          totalprice:this.totalPrice,
          time:''
        }
      })
      console.log(res)
      if(res.data =="success"){
        for(var i = 0;this.cartList.length; i++)
          this.cartList.splice(0, 1);
        alert("下单成功");
      }
      else{
        alert(res.data)
      }


    },
  },
  created() {
    this.userName = localStorage.getItem("userName")
    this.userId = localStorage.getItem("userId")
  }
}

</script>

<style lang="css">
.del-goods,a{
  cursor: pointer;
}
ul{
  list-style-type: none;
}
@import "../../assets/css/bootstrap.css";
@import "../../assets/css/StoreStyle.css";
#content_bottom{
  height: 600px;
}
</style>