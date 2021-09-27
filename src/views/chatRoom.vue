
<template lang="html">
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64);margin-bottom: 10px">
          <li><a href="./home">首页</a></li>
          <li class="active">在线聊天室</li>
        </ul>
        <div class="container" style="width:100%;margin-right: -15px"  >
          <div class="row clearfix" style="width:100%;">
            <div class="col-md" style="background-color:#DFF7FF " >
              <div class="container" style="height: 530px">
                <div class="row clearfix">
                  <div class="col-md-12 column" style="margin-bottom: -10px">
                    <div class="jumbotron well" style="height: 430px; padding: 10px; margin-top: 12px ">
                      <h1>
                        Hello, world!
                      </h1>
                    </div>
                      <div class="row clearfix">
                        <div class="col-md-12 column">
                          <div class="row clearfix">
                            <div class="col-md-11 column">
                              <label >{{userName+":"}} </label>
                              <input type="input" class="form-control"  />
                            </div>
                            <div class="col-md-1 column">
                              <button type="submit" class="btn btn-default" style="margin-top: 25px;margin-left: -10px">发送</button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
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
  name:"chatRoom",
  data(){
    return{
      userId:null,
      userName:null,
      userList: null,
      webScoket : null,
    }
  },
  components: {
    Navbar
  },
  computed:{

  },
  methods: {
    connect(){
      console.log(12312312123)
    }
  },
  created() {
    this.userName = localStorage.getItem("userName")
    this.userId = localStorage.getItem("userId")
    var url = "ws://localhost:8888/chatRoom/" + this.userName ;
    this.webScoket = new WebSocket(url);
    console.log(this.webScoket)
    this.connect()
  },
  destroyed: function () {
    var Msg = {};
    Msg.type = "leave";
    Msg.msg = this.userName;
    var json = JSON.stringify(Msg);
    this.webScoket.send(json)
  },
}

</script>

<style lang="css">
@import "../assets/css/bootstrap.css";
@import "../assets/css/StoreStyle.css";
#content_bottom{
  height: 600px;
}
</style>