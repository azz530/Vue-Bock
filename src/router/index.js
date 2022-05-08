import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../views/Login.vue'], resolve),
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['../views/Register.vue'], resolve),
    },
    {
      path: '/forgetPsw',
      name: 'ForgetPsw',
      component: resolve => require(['../views/ForgetPsw.vue'], resolve),
    },
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(['../views/Home.vue'], resolve),
      redirect:'/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: resolve => require(['../views/index/Index.vue'], resolve),
        },
        {
          path: '/article',
          name: 'Article',
          component: resolve => require(['../views/article/Article.vue'], resolve),
        },
        {
          path: '/album',
          name: 'Album',
          component: resolve => require(['../views/album/Album.vue'], resolve),
        },
        {
          path: '/video',
          name: 'Video',
          component: resolve => require(['../views/video/Video.vue'], resolve),
        },
        {
          path:'/userinfo',
          name:'UserInfo',
          component:resolve => require(['../views/user/UserInfo.vue'],resolve),
          redirect:'/usermsg',
          children:[
            {
              path:'/usermsg',
              name:'UserMsg',
              component:resolve => require(['../views/user/UserMsg.vue'],resolve),
            },
            {
              path:'/collection',
              name:'Collection',
              component:resolve => require(['../views/user/Collection.vue'],resolve),
            },
            {
              path:'/history',
              name:'History',
              component:resolve => require(['../views/user/History.vue'],resolve),
            },
          ]
        },
      ],
    },
    {
      path: '/articleDetails',
      name: 'ArticleDetails',
      component: resolve => require(['../views/ArticleDetails.vue'], resolve),
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/forgetPsw') {
    return next();
  }
  const tokenStr = window.sessionStorage.getItem('token');
  if (tokenStr) {
    return next();
  } else {
    return next('/login')
  }
})
export default router
