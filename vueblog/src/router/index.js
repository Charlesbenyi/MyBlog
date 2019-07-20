import Vue from 'vue'
import Router from 'vue-router'

import Blogindex from '../views/Blogindex.vue'
import detail from '../views/detail.vue'
import Index from '../views/Index.vue'
import Bloghoster from '../views/BlogHoster.vue'
import host_user from '../views/Hoster/user.vue'
import Insertuser from '../views/Hoster/insertuser.vue'
import updateuser from '../views/Hoster/updateuser.vue'
import wirteblog from '../views/blog/writeBlog.vue'
import managerCatalog from '../views/catalog/manageCatalog.vue'
import LookBlog from '../views/blog/lookBlog.vue'
import detailBlog from '../views/blog/detailBlog.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path:'/detail',
      name:'detail',
      component:detail
    },
    {
      path:'/hoster',
      name:'hoster',
      redirect:'/hoster/user',
      component:Bloghoster,
      children:[
        {
          path:'user',
          name:'host_user',
          component:host_user
        },
        {
          path:'insert',
          name:"insertuser",
          component:Insertuser
        },
        {
          path:'updateuser',
          name:'updateuser',
          component:updateuser
        },
        {
          path:'writeblog',
          name:'writeblog',
          component:wirteblog
        },
        {
          path:'manageCatalog',
          name:'manageCatalog',
          component:managerCatalog
        },
        {
          path:'lookblog',
          name:'lookblog',
          component:LookBlog
        },
        {
          path:'detailblog',
          name:'detailblog',
          component:detailBlog
        }
      ]
    }
  ]
})
