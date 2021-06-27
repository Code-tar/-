<template>
  <div class="box">
    <h1>登录</h1>
    <i class="el-icon-user"></i><el-input v-model="loginDate.username" placeholder="账号"></el-input>
    <br>
    <i class="el-icon-lock"></i>
    <el-input v-model="loginDate.password" placeholder="密码"></el-input><br>
    <el-radio v-model="loginDate.type" label="学生">学生</el-radio>
    <el-radio v-model="loginDate.type" label="管理员">管理员</el-radio>
    <br>
    <el-button type="primary" plain @click="login">登录</el-button>
    <br>
    <span>账号：202，密码：202，管理员</span>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        loginDate:{
        username:'',
        password:'',
        type:'学生',
        }
      }
    },
    methods:{
      // reuqestLogin(data){
      //   this.$axios({
      //     url:'/login/getuser',
      //
      //   })
      // },


      login(){
        this.$axios({
          url:'/login/getuser',
          params:this.loginDate
        }).then((res)=>{
          // console.log(res.data.data[0]);
          if(res.data.code===200){
            if(res.data.data.length!==0){
              this.$message.success('登录成功！')
              window.sessionStorage.setItem('username',res.data.data[0].name||res.data.data[0].stuName)
              this.$router.push('/home/showNotice')
            }else{
              alert("账号不存在！")
            }
          }
        })
      },

    }
  }
</script>
<style scoped>
  .box{
    position: absolute;
    width: 400px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform:translate(-50%, -50%);
    /*设置透明度 */
    /*background-color:rgba(255,255,255,0.5);*/
    text-align: center;
    box-shadow: 5px 5px 5px #999999;

  }
  .box .el-input{
    width: 300px;
    margin-top: 20px;
    margin-left: 10px;
  }
  .el-button{
    width: 330px;
  }
  .el-radio{
    margin:10px;

  }
</style>
