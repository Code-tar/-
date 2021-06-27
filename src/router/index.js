import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Student from "../views/Student.vue";
import Notice from "../views/Notice.vue";
import Sushe from "../views/Sushe.vue";
import Admin from "../views/Admin.vue";
import ShowNotice from "../views/ShowNotice.vue";


Vue.use(VueRouter);

const routes = [
  {path:'/',redirect:'Login'},
  {
    path: '/home',
    name: "home",
    component: Home,
    meta:{
      isLogin: true
    },
    children: [
      {
        path: "showNotice",
        name: "showNotice",
        component: ShowNotice,
        meta:{
          title:'公告主页',
          isLogin: true
        }
      },
      {
        path: "notice",
        name: "notice",
        component: Notice,
        meta:{
          title:'公告管理',
          isLogin: true
        }
      },
      {
        path: "student",
        name: "student",
        component: Student,
        meta:{
          title:'学生管理',
          isLogin: true
        }
      },
      {
        path: "sushe",
        name: "sushe",
        component: Sushe,
        meta:{
          title:'宿舍管理',
          isLogin: true
        }
      },
      {
        path: "admin",
        name: "admin",
        component: Admin,
        meta:{
          title:'管理员管理',
          isLogin: true
        }
      },
      {
        path: '**',   // 错误路由
        redirect: '/home'   //重定向
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to,from, next) => {
  /* 路由发生变化修改页面title */

  if (to.meta.title) {
    document.title = to.meta.title

  }

  next();

  const username = window.sessionStorage.getItem('username')
  if(to.meta.isLogin){
    if(username){
      next()
    }else {
      next({
        path:'/login',
        query:{
          redirect:to.fullPath
        }
      })
    }

  }
  else
    next()
  // if (to.meta.requireAuth) {
  //   if ($store.state.state) {
  //     next()
  //   } else {
  //     next({
  //       path: '/Login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //
  //     })
  //   }
  // }
  //   else
  //     next();

});
export default router;
