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
export const constantRouterMap = [
  {
    path: "/basic",
    name: "basic",
    component: BasicLayout,
    redirect: "/home",
    children: [
      {
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
    path: "/paylocal",
    name: "paylocal",
    component: () => import("@/pages/userSystem/payLocal/payLocal")
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: () => import("@/pages/userSystem/paySuccess/paySuccess")
  },
  {
    path: "/orderSuccess",
    name: "orderSuccess",
    component: () => import("@/pages/userSystem/orderSuccess/orderSuccess")
  },
  {
    path: "/wxSuccess",
    name: "wxSuccess",
    component: () => import("@/pages/userSystem/wxSuccess/wxSuccess")
  },
  {
    path: "/SellerPaySuccess",
    name: "SellerPaySuccess",
    component: () => import("@/pages/Seller/SellerPaySuccess")
  },
  {
    path: "/SellerPayWx",
    name: "SellerPayWx",
    component: () => import("@/pages/Seller/SellerPayWx")
  },
  {
    path: "/unifiedpay",
    name: "unifiedpay",
    component: () => import("@/pages/Seller/UnifiedPay")
  },

  {
    path: '/user',
    name: 'user',
    component: BlankLayout,
    redirect: 'login',
    hidden: true,
    children: [{
        path: '/login',
        name: 'login',
        hidden: true,
        component: () => import('@/pages/common/login'),
      },
      {
        path: "/share",
        name: "share",
        hidden: true,
        component: () => import("@/pages/userSystem/share/share"),
        meta: {
          login:true,
          keepAlive: true
        }
      },
      {
        path: "/sellerShare",
        name: "sellerShare",
        hidden: true,
        component: () => import("@/pages/common/sellerShare/sellerShare"),
      },
      {
        path: "/payment",
        name: "payment",
        hidden: true,
        component: () => import("@/pages/userSystem/payment/payment")
      },
      {
        path: "/detarlsuccess",
        name: "detarlsuccess",
        hidden: true,
        component: () => import("@/pages/Seller/DetarlSuccess")
      },
      {
        path: '/register',
        name: 'register',
        hidden: true,
        component: () => import('@/pages/common/register')
      },
      {
        path: '/passwordSet',
        name: 'passwordSet',
        hidden: true,
        component: () => import('@/pages/common/passwordForm')
      },
      {
        path: "/neworder",
        name: "neworder",
        hidden: true,
        component: () => import("@/pages/Seller/NewOrder"),
        meta: {

        }
      },
      {
        path: "/orderdetails",
        name: "orderdetails",
        hidden: true,
        component: () => import("@/pages/Seller/OrderDetails"),
        meta: {

        }
      },
      {
        path: "/orderres",
        name: "orderres",
        component: () => import("@/pages/Seller/OrderResult"),
        meta: {  
        }
      },
      {
        path: "/design",
        name: "design",
        hidden: true,
        component: () => import("@/pages/Seller/Design")
      },
      {
        path: "/designList",
        name: "designList",
        hidden: true,
        component: () => import("@/pages/Seller/DesignList")
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/pages/404')
  },

  {
    path: "/seller",
    name: "seller",
    component: SellerLayout,
    redirect: "/dashbored",
    children: [{
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