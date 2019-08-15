import BasicLayout from "./../layouts/BasicLayout.vue";
const routes = [
      {
            path: "/",
            name: "index",
            component: BasicLayout,
            redirect: "/home",
            children:[
                  {
                        path: "/home",
                        name: "home",
                        component: () => import("@/pages/home"),
                        meta: {

                        }
                  },
                  {
                        path: "/test",
                        name: "test",
                        component: () => import("@/pages/test"),
                        meta: {
                              
                        }
                  },
                  {
                        path: "/swiper",
                        name: "swiper",
                        component: () => import("@/pages/Swiper"),
                        meta: {
                              
                        }
                  },
                  {
                        path: "/products",
                        name: "products",
                        component: () => import("@/pages/products"),
                        meta: {
                              
                        }
                  },
                  {
                        path: "/comtest",
                        name: "comtest",
                        component: () => import("@/pages/comtest"),
                        meta: {
                              
                        }
                  }
            ]
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
            path: "/payfailed",
            name: "payfailed",
            component: () => import("@/pages/userSystem/payFailed/payFailed")
      },
      {
            path: "/orders",
            name: "orders",
            component: () => import("@/pages/userSystem/orders/orders")
      },
      {
            path: "/login",
            name: "login",
            component: () => import("@/pages/common/login")
      },
      {
            path: "/register",
            name: "register",
            component: () => import("@/pages/common/register")
      }
      

];
export default routes;