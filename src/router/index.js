import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import(/* webpackChunkName: "group-user" */ '../views/Home.vue');
const Login = () => import(/* webpackChunkName: "group-user" */ '../views/Login.vue');
const Register = () => import(/* webpackChunkName: "group-user" */ '../views/Register.vue');
const ForgetPsw = () => import(/* webpackChunkName: "group-user" */ '../views/ForgetPsw.vue');
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/login',
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
    },
    {
      path:'/forgetPsw',
      name:'ForgetPsw',
      component:ForgetPsw,
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path === '/login' || to.path === '/register' || to.path === '/forgetPsw'){
    next();
  }
  // const tokenStr = window.sessionStorage.getItem('token');
  // if(!tokenStr){
  //   return next('/login');
  // }
})
export default router
