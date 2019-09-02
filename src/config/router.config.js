// eslint-disable-next-line
import BlankLayout from "@/layouts/BlankLayout.vue";
import BasicLayout from "@/layouts/BasicLayout.vue";
import SellerLayout from "@/layouts/SellerLayout.vue";
/**
 * 基础路由
 * @type { *[] }
 */
/*const data = [
  {
    path: '/seller',
    name: 'seller',
    hidden: false,
    component: () => import("@/pages/Seller/DashBored"),
    meta: {
      title: '',
      icon: ''
    },children: [
      {}
    ]
  }
];*/
export const constantRouterMap = [{
    path: "/basic",
    name: "basic",
    component: BasicLayout,
    redirect: "/home",
    children: [{
        path: "/home",
        name: "home",
        component: () => import("@/pages/Website/Home"),
        meta: {

        }
      },
      {
        path: "/products",
        name: "products",
        component: () => import("@/pages/Website/Products"),
        meta: {

        }
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/pages/Website/About"),
        meta: {

        }
      },
      {
        path: "/test",
        name: "test",
        component: () => import("@/pages/Website/test"),
        meta: {

        }
      },
      {
        path: "/test2",
        name: "test2",
        component: () => import("@/pages/Website/test2"),
        meta: {

        }
      },
      {
        path: "/swiper",
        name: "swiper",
        component: () => import("@/pages/Website/Swiper"),
        meta: {

        }
      },

      {
        path: "/comtest",
        name: "comtest",
        component: () => import("@/pages/Website/comtest"),
        meta: {

        }
      }
    ],
  },
  {
    path: "/share",
    name: "share",
    component: () => import("@/pages/userSystem/share/share")
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("@/pages/userSystem/payment/payment")
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: () => import("@/pages/userSystem/paySuccess/paySuccess")
  },


  {
    path: '/user',
    name: 'user',
    component: BlankLayout,
    redirect: '/home',
    hidden: true,
    children: [{
        path: '/login',
        name: 'login',
        component: () => import('@/pages/common/login')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/common/register')
      },
      {
        path: '/passwordSet',
        name: 'passwordSet',
        component: () => import('@/pages/common/passwordForm')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/pages/404')
  },
  {
    path: "/neworder",
    name: "neworder",
    component: () => import("@/pages/Seller/NewOrder"),
    meta: {

    }
  },
  {
    path: "/seller",
    name: "seller",
    component: SellerLayout,
    redirect: "/dashbored",
    children:[
          {
                path: "/dashbored",
                name: "dashbored",
                component: () => import("@/pages/Seller/DashBored"),
                meta: {
                      
                }
          },
          {
                path: "/grouporder",
                name: "grouporder",
                component: () => import("@/pages/Seller/GroupOrder"),
                meta: {
                      
                }
          },
          {
                path: "/commissions",
                name: "commissions",
                component: () => import("@/pages/Seller/Commissions"),
                meta: {
                      
                }
          },
          {
                path: "/commissionsdetails",
                name: "commissionsdetails",
                component: () => import("@/pages/Seller/CommissionsDeatils"),
                meta: {
                      
                }
          },
          {
                path: "/myorder",
                name: "myorder",
                component: () => import("@/pages/Seller/MyOrders"),
                meta: {
                      
                }
          }
    ]
},
]