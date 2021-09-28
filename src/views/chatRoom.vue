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
<!--                    <div class="jumbotron well"  style="height: 430px; padding: 10px;-->
<!--                    margin-top: 12px; margin-left: -17px;" >-->

<!--&lt;!&ndash;                      <ul class="infinite-list" style="overflow:auto">&ndash;&gt;-->
<!--&lt;!&ndash;                        <li v-for="(item,index) in chat" :key="index" class="infinite-list-item">&ndash;&gt;-->
<!--&lt;!&ndash;                          {{item}}</li>&ndash;&gt;-->
<!--&lt;!&ndash;                      </ul>&ndash;&gt;-->
<!--                      <h1 v-for="(item,index) in chat" :key="index"  >-->
<!--                        {{item}}<br />-->
<!--                      </h1>-->
<!--                    </div>-->
                      <textarea  cols="70" rows="20" readonly="true" class="jumbotron well" v-model="chat" style="height: 440px;width: 730px; padding: 7px;
                        margin-left: -17px;resize: none; margin-top: 12px; margin-bottom: -122px"  >
                      </textarea>
                    </div>
                      <div class="col-md-2 column">
                        <textarea  cols="70" rows="20" readonly="true" class="jumbotron well" v-model="userList" style="height: 440px;width: 153px; padding: 7px;
                        margin-left: -17px;margin-right: 170px;resize: none; margin-top: 12px;margin-bottom: 4px" >
                      </textarea>

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
      textare: null,
      isReloadData : true,
      message:"",
      chat:[],
      userList:[],
      count: 0

    }
  },
  components: {
    Navbar
  },

  methods: {
    load () {
      this.count += 2
    },
    logintoHome(){
      console.log(1)
    },
    onMessage(res){

      var msg = JSON.parse(res.data)
      var i
      if(msg.type === "join"){
        // this.userList.push(msg.userName)
      }
      else if(msg.type === "leave"){
        for(i=0;i<this.userList.length;i++){
          if(this.userList[i] == msg.userName) {
            this.userList.splice(i, 0);
            break;
          }
        }
      }
      else if(msg.type === "onlineUser"){
        this.userList = ""
        for(i=0;i<msg.userName.length;i++){
          this.userList += msg.userName[i]
          this.userList +="\n"
        }
        return;
      }

      // this.chat.push(msg.msg)

      this.chat += msg.msg
      this.chat +="\n"

      // if(this.chat.length > 20)
        // this.chat.splice(0,1)
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
      // this.message = "";
      // }
    },
  },
  created() {
    this.userName = localStorage.getItem("userName");
    this.userId = localStorage.getItem("userId");
    this.textarea = document.getElementById("textarea");
    console.log(this.textarea)
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