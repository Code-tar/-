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
    children: [
      {
        path: "showNotice",
        name: "showNotice",
        component: ShowNotice,
        meta:{
          title:'公告主页'
        }
      },
      {
        path: "notice",
        name: "notice",
        component: Notice,
        meta:{
          title:'公告管理'
        }
      },
      {
        path: "student",
        name: "student",
        component: Student,
        meta:{
          title:'学生管理'
        }
      },
      {
        path: "sushe",
        name: "sushe",
        component: Sushe,
        meta:{
          title:'宿舍管理'
        }
      },
      {
        path: "admin",
        name: "admin",
        component: Admin,
        meta:{
          title:'管理员管理'
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

});
export default router;
