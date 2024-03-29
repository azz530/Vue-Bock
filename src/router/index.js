import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//解决路由重复点击报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/404',
      component: resolve => require(['../views/404.vue'], resolve),
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
              path: '/article',
              name: 'Article',
              component: resolve => require(['../views/user/MyArticle.vue'], resolve),
            },
            {
              path: '/album',
              name: 'Album',
              component: resolve => require(['../views/user/MyAlbum.vue'], resolve),
              children:[
                {
                  path: '/album_photo/:album_id',
                  name: 'AlbumPhoto',
                  component: resolve => require(['../views/user/AlbumPhoto.vue'], resolve),
                }
              ]
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
    },

    {
      path: '*',
      redirect: '/404'
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
