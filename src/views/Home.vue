<template>
  <div id="box">
    <!--    <h1>-->
    <!--      我是主页面-->
    <!--    </h1>-->
    <!--    <router-link to="/home/showNotice">公告主页</router-link>-->
    <!--    <router-link to="/home/sushe">宿舍管理</router-link>-->
    <!--    <router-link to="/home/student">学生管理</router-link>-->
    <!--    <router-link to="/home/notice">公告管理</router-link>-->
    <!--    <router-link to="/home/admin">管理员管理</router-link>-->
    <!--    <router-view></router-view>-->
    <el-container>
      <el-header>宿舍管理系统</el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
              :default-active="this.$route.path"
              class="el-menu-vertical-demo"

             >
            <router-link to="/home/showNotice">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">公告主页</span>
              </el-menu-item>
            </router-link>

            <router-link to="/home/sushe">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">宿舍管理</span>
              </el-menu-item>
            </router-link>

            <router-link to="/home/student">
              <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">学生管理</span>
              </el-menu-item>
            </router-link>

            <router-link to="/home/notice">
              <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">公告管理</span>
              </el-menu-item>
            </router-link>

            <router-link to="/home/admin">
              <el-menu-item index="5">
                <i class="el-icon-menu"></i>
                <span slot="title">管理员管理</span>
              </el-menu-item>
            </router-link>

          </el-menu>
        </el-aside>
        <el-main>
          <div class="tag" >
<!--            <span v-for="item in title1" :key="item">{{item}}</span>-->
            <el-tag
                v-for="tag in title1"
                :key="tag"
                closable
                type=""
                @close="handleClose1(tag)"
                @click="redict(tag)"
            >
              {{tag}}
            </el-tag>

          </div>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>


.el-aside {
  background: #fff;
}

.el-header {
  background: red;
}

.el-container, #box {
  height: 100%;
}

.el-menu {
  border: none;
}

.el-menu a {
  text-decoration: none;
}
.tag{
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  align-items: center;
  box-shadow: 0 5px 5px #888888;
}
.el-tag{
  margin-left: 10px;
  cursor: pointer;
}
</style>
<script>
export default {
  name:'box',
  data(){
    return{
      title1:['公告主页']
    }
  },

  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    getPath(){
      if(this.title1.includes(this.$route.meta.title))
        return
      this.title1.push(this.$route.meta.title)
      // console.log(this.title1);
    },
    handleClose1(tag) {
      if(this.$route.meta.title !== tag)
        this.title1.splice(this.title1.indexOf(tag), 1);
    },
    redict(tag){
      console.log(tag);
      let cur = this.$route.meta.title
      if(tag === '公告主页' && tag !== cur)
        this.$router.push('./home/showNotice')
      if( tag === '学生管理' && tag !== cur)
        this.$router.push('./student')
      if(tag === '管理员管理' && tag !== cur)
        this.$router.push('./admin')
      if(tag === '公告管理')
        this.$router.push('./notice')
      if(tag === '宿舍管理' && tag !== cur)
        this.$router.push('./sushe')

      // this.$router.push()
    }
  },


  // mounted() {
  //   console.log(this.$route.meta.title);
  // },
  watch: {
    '$route':'getPath'
  },

  // metaInfo () {
  //   return {
  //     title: this.pageName
  //   }
  // },
  // data () {
  //   return {
  //     pageName: 'loading'
  //   }
  // },
  // mounted () {
  //   setTimeout(() => {
  //     this.pageName = '222'
  //   }, 2000)
  // }



}
</script>