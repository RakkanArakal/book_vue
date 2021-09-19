<template lang="html">
  <div id="page">
    <Navbar></Navbar>
    <div id="content">
      <div id="content_bottom" style="height: auto">
        <ul class="breadcrumb" style="color: rgb(212, 106, 64)">
          <li><a href="./home">首页</a></li>
          <li class="active">用户管理</li>
        </ul>

        <el-table
            :data="users"
            border
            style="width: 100%">
          <el-table-column fixed prop="id" label="用户id" width="150"></el-table-column>
          <el-table-column prop="account" label="用户名" width="300"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column label="账户状态" width="150">
            <template slot-scope="scope">{{scope.row.ban==0?'正常':'已禁用'}}
          </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="70">
            <template slot-scope="scope">
              <el-button @click="ban(scope.row)" type="text" size="small">{{scope.row.ban==0?'禁用':'恢复'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {

  data(){
    return {
      users: []
    }
  },
  methods: {
    ban(item){
      if(item.id == 1){
        alert("禁用无效！");
        return;
      }
      if(item.ban == 1)
        item.ban = 0;
      else
        item.ban = 1;
      this.$axios.post("ban",item);
      console.log(item);
    }
  },
  components: {
    Navbar
  },

  created() {
    this.$axios.get("getuser").then(res=> {
      this.users = res.data
      console.log(res)
    })
  }
}

</script>

<style  >


</style>
