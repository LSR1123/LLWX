import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

//  {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/table',
//     name: 'Example',
//     meta: { title: 'Example', icon: 'example' },
//     children: [
//       {
//         path: 'table',
//         name: 'Table',
//         component: () => import('@/views/table/index'),
//         meta: { title: 'Table', icon: 'table' }
//       },
//       {
//         path: 'tree',
//         name: 'Tree',
//         component: () => import('@/views/tree/index'),
//         meta: { title: 'Tree', icon: 'tree' }
//       }
//     ]
//   },

  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Form',
        component: () => import('@/page/customer/list.vue'),
        meta: { title: '顾客管理', icon: 'customer' }
      }
    ]
  },

  {
    path: '/employee',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Form',
        component: () => import('@/page/employee/list.vue'),
        meta: { title: '员工管理', icon: 'employee' }
      }
    ]
  },

  {
    path: '/page',
    //component: () => import('@/page/nested/index.vue'), // Parent router-view
    component: Layout,
    name: 'Form',
    meta: { title: '系统配置', icon: 'settings' },
    children: [
      {
        path: '/page/category',
        component: () => import('@/page/category/list.vue'),
        name: '栏目管理',
        meta: { title: '栏目管理' }
      },

      {
        path: '/page/product',
        component: () => import('@/page/product/list.vue'),
        name: '产品管理',
        meta: { title: '产品管理' }
      },
    ]
  },
  
  {
    path: '/page',
    //component: () => import('@/page/nested/index.vue'), // Parent router-view
    component: Layout,
    name: 'Form',
    meta: { title: '审核管理', icon: 'audit' },
    children: [
      {
        path: '/page/Employee review',
        component: () => import('@/page/Employee review/list.vue'),
        name: '员工审核',
        meta: { title: '员工审核' }
      },

      {
        path: '/page/product audit',
        component: () => import('@/page/product audit/list.vue'),
        name: '产品审核',
        meta: { title: '产品审核' }
      },
    ]
  },

  {
    path: '/address',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Form',
        component: () => import('@/page/address/list.vue'),
        meta: { title: '地址管理', icon: 'address' }
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Form',
        component: () => import('@/page/comment/list.vue'),
        meta: { title: '评论管理', icon: 'comment' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Form',
        component: () => import('@/page/order/list.vue'),
        meta: { title: '订单管理', icon: 'order' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
