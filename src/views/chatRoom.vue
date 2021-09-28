<template lang="html" xmlns:white-space="http://www.w3.org/1999/xhtml">
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64);margin-bottom: 10px">
          <li><a href="./home">首页</a></li>
          <li class="active">在线聊天室</li>
        </ul>
        <div class="container" style="width:100%;margin-right: -15px">
          <div class="row clearfix" style="width:100%;">
            <div class="col-md" style="background-color:#DFF7FF ">
              <div class="container" style="height: 530px">
                <div class="row clearfix">
                  <div class="col-md-12 column" style="margin-bottom: -10px">
                    <div class="col-md-10 column" >
                    <div class="jumbotron well" style="height: 430px; padding: 10px;
                    margin-top: 12px; margin-left: -17px;" >
                      <h1 v-for="(item,index) in chat" :key="index"  >
                        {{item}}<br />
                      </h1>
                    </div>
                    </div>
                      <div class="col-md-2 column">
                        <div class="jumbotron well" style="height: 430px; padding: 10px;
                    margin-top: 12px;margin-left: -17px;margin-right: -20px" >
                          <h1 v-for="(item,index) in userList" :key="index"  >
                            {{item}}<br />
                          </h1>
                        </div>
                      </div>

                    <div class="row clearfix">
                      <div class="col-md-12 column">
                        <div class="row clearfix">
                          <div class="col-md-11 column">
                            <label >{{ userName + ":" }} </label>
                            <input type="input" class="form-control"
                                   @keyup.enter="sendMsg" v-model="message"/>
                          </div>
                          <div class="col-md-1 column">
                            <button class="btn btn-default" @click="sendMsg" @keyup.enter="sendMsg"
                                    style="margin-top: 25px;margin-left: -10px">发送
                            </button>
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
  name: "chatRoom",
  data() {
    return {
      userId: null,
      userName: null,
      webScoket: null,
      isReloadData : true,
      message:"",
      chat:[],
      userList:[],
    }
  },
  components: {
    Navbar
  },

  methods: {
    logintoHome(){
      console.log(1)
    },
    onMessage(res){

      var msg = JSON.parse(res.data)

      if(msg.type === "join"){
        // this.userList.push(msg.userName)
      }
      else if(msg.type === "leave"){
        for(var i=0;i<this.userList.length;i++){
          if(this.userList[i] == msg.userName) {
            this.userList.splice(i, 0);
            break;
          }
        }
      }
      else if(msg.type === "onlineUser"){
        var users = msg.userName
        console.log(users)
        this.userList = users
        return;
      }
      this.chat.push(msg.msg)

      if(this.chat.length > 20)
        this.chat.splice(0,1)
    },
    sendMsg() {
      console.log(this.message)
      if (this.message != "") {
        var chatMsg = {};
        var jsonstr
        chatMsg.type = "msg";
        chatMsg.msg = this.message.replace(/(\r\n|\n|\r)/gm, "");
        jsonstr = JSON.stringify(chatMsg);
        this.webScoket.send(jsonstr);
      }
      this.message = "";
      // }
    },
  },
  created() {
    this.userName = localStorage.getItem("userName")
    this.userId = localStorage.getItem("userId")

    var url = "ws://localhost:8888/chatRoom/" + this.userName;
    this.webScoket = new WebSocket(url);
    this.webScoket.onmessage = this.onMessage;

    document.onkeydown = function(){}

  },
  destroyed: function () {
    this.webScoket.close()
  },
}

</script>

<style lang="css">
@import "../assets/css/bootstrap.css";
@import "../assets/css/StoreStyle.css";

#content_bottom {
  height: 600px;
}
</style>