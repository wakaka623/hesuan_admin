import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
let isadmin=window.sessionStorage.getItem('isadmin');
// console.log(isadmin);

export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/authredirect',
        component: () =>
            import ('@/views/login/authredirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/errorPage/401'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'dashboard',
            meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
        }]
    },
    {
        path: '/hengyin',
        alwaysShow: true,
        redirect: '/unite/index',
        component: Layout,
        meta: {
            title: 'HY',
            icon: 'documentation',
            noCache: true
        },
        children: [{
                path: 'hengyin_client_funds',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'hengyin_client_funds',
                meta: { title: '客户资金表', icon: 'icon', noCache: true }
            },
            {
                path: 'hengyin_transaction',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'hengyin_transaction',
                meta: { title: '客户成交表', icon: 'icon', noCache: true }
            }
        ]
    },
    {
        path: '/ruida',
        alwaysShow: true,
        redirect: '/unite/index',
        component: Layout,
        meta: {
            title: 'RD',
            icon: 'documentation',
            noCache: true
        },
        children: [{
                path: 'ruida_client_funds',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'ruida_client_funds',
                meta: { title: '资金表', icon: 'icon', noCache: true }
            },
            {
                path: 'ruida_transaction',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'ruida_transaction',
                meta: { title: '成交表', icon: 'icon', noCache: true }
            },
            {
                path: 'ruida_deposit_and_withdrawal',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'ruida_deposit_and_withdrawal',
                meta: { title: '出入金表', icon: 'icon', noCache: true }
            },
        ]
    },
    {
        path: '/sanli',
        alwaysShow: true,
        redirect: '/unite/index',
        component: Layout,
        meta: {
            title: 'SL',
            icon: 'documentation',
            noCache: true
        },
        children: [{
                path: 'sanli_client_funds',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'sanli_client_funds',
                meta: { title: '客户资金表', icon: 'icon', noCache: true }
            },
            {
                path: 'sanli_transaction',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'sanli_transaction',
                meta: { title: '客户交易表', icon: 'icon', noCache: true }
            },
        ]
    },
    {
        path: '/huaxin',
        alwaysShow: true,
        redirect: '/unite/index',
        component: Layout,
        meta: {
            title: 'HX',
            icon: 'documentation',
            noCache: true
        },
        children: [{
                path: 'huaxin_deposit_and_withdrawal',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'huaxin_deposit_and_withdrawal',
                meta: { title: '出入金表', icon: 'icon', noCache: true }
            },
            {
                path: 'huaxin_client_funds',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'huaxin_client_funds',
                meta: { title: '资金对账表', icon: 'icon', noCache: true }
            },
            {
                path: 'huaxin_transaction',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'huaxin_transaction',
                meta: { title: '交易统计表', icon: 'icon', noCache: true }
            },
            {
                path: 'huaixn_history',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'huaixn_history',
                meta: { title: '历史成交表', icon: 'icon', noCache: true }
            },
        ]
    },
    {
        path: '/jinkong',
        alwaysShow: true,
        redirect: '/unite/index',
        component: Layout,
        meta: {
            title: 'JK',
            icon: 'documentation',
            noCache: true
        },
        children: [{
                path: 'jinkong_deposit_and_withdrawal',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'jinkong_deposit_and_withdrawal',
                meta: { title: '出入金表', icon: 'icon', noCache: true }
            },
            {
                path: 'jinkong_client_funds',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'jinkong_client_funds',
                meta: { title: '资金管理表', icon: 'icon', noCache: true }
            },
             {
                path: 'jinkong_chengjiaobiao',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'jinkong_chengjiaobiao',
                meta: { title: '成交表', icon: 'icon', noCache: true }
            },
            {
                path: 'jinkong_transaction',
                component: () =>
                    import ('@/views/unite/index'),
                name: 'jinkong_transaction',
                meta: { title: '交易统计表', icon: 'icon', noCache: true }
            },
           
        ]
    },
    // {
    //   path: '/dongzheng',
    //   component: Layout,
    //   meta: {
    //     title: '东证',
    //     icon: 'documentation',
    //   },
    //   children: [{
    //     path: 'index',
    //     component: () => import('@/views/dongzheng/index'),
    //     name: 'index',
    //     meta: { title: '东证', icon: 'icon', noCache: true }
    //   }]
    // }
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/admin',
        component: Layout,
        meta: {
            title: '用户列表',
            icon: 'documentation',
            noCache: true
        },
        children: [{
                path: 'admin',
                component: () =>
                    import ('@/views/admin/index'),
                name: 'admin',
                meta: { title: '用户列表', icon: 'people', noCache: true }
            },
            {
                path: 'edit/:id',
                hidden: true,
                component: () =>
                    import ('@/views/admin/edit'),
                name: 'edit',
                meta: { title: '编辑', icon: 'people', noCache: true }
            }
        ]
    },
    {
        path: '/chuangyuan',
        redirect: '/unite/index',
        component: Layout,
        meta: {
            title: '创元',
            icon: 'documentation',
            noCache: true
        },
        children: [{
            path: 'chuangyuan',
            component: () =>
                import ('@/views/unite/index'),
            name: 'chuangyuan',
            meta: { title: '创元', icon: 'icon', noCache: true }
        }]
    },
    {
        path: '/dongzheng',
        redirect: '/unite/index',
        component: Layout,
        meta: {
            title: '东证',
            icon: 'documentation',
            noCache: true
        },
        children: [{
            path: 'dongzheng',
            component: () =>
                import ('@/views/unite/index'),
            name: 'dongzheng',
            meta: { title: '东证', icon: 'icon', noCache: true }
        }]
    },
    // {
    //     path: '/icon',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/svg-icons/index'),
    //         name: 'icons',
    //         meta: { title: 'icons', icon: 'icon', noCache: true }
    //     }]
    // },

    { path: '*', redirect: '/404', hidden: true }
]