import BasicLayout from "@/layouts/BasicLayout.vue";
import SellerLayout from "@/layouts/SellerLayout.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";
const routes = [
      {
            path: "/",
            name: "myindex",
            redirect: "/home",
      },
      {
            path: "/basic",
            name: "basic",
            component: BasicLayout,
            redirect: "/home",
            children:[
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
                  }
            ],
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
      {
            path: "/payorder",
            name: "payorder",
            component: BlankLayout,
            redirect: '/orders',
            children: [
                  {
                        path: "/share",
                        name: "share",
                        component: () => import("@/pages/userSystem/share/share"),
                        meta: {
                              requireAuth: true
                        }
                  },
                  {
                        path: "/payment",
                        name: "payment",
                        component: () => import("@/pages/userSystem/payment/payment"),
                        meta: {
                              requireAuth: true
                        }
                  },
                  {
                        path: "/paysuccess",
                        name: "paysuccess",
                        component: () => import("@/pages/userSystem/paySuccess/paySuccess"),
                        meta: {
                              requireAuth: true
                        }
                  },
                  {
                        path: "/payfailed",
                        name: "payfailed",
                        component: () => import("@/pages/userSystem/payFailed/payFailed"),
                        meta: {
                              requireAuth: true
                        }
                  },
                  
            ]
      },
      {
            path: "/person",
            name: "person",
            component: SellerLayout,
            redirect: '/orders',
            children: [
                  {
                        path: "/orders",
                        name: "orders",
                        component: () => import("@/pages/userSystem/orders/orders"),
                        meta: {
                              requireAuth: true
                        }
                  },
                  {
                        path: "/personSet",
                        name: "personSet",
                        component: () => import("@/pages/person/person"),
                        meta: {
                              requireAuth: true
                        }
                  },
                  
            ]
      }, 
      {
            path: "/login",
            name: "login",
            component: () => import("@/pages/common/login")
      },
      {
            path: "/paylocal",
            name: "paylocal",
            component: () => import("@/pages/userSystem/payLocal/payLocal")
      },
      {
            path: "/register",
            name: "register",
            component: () => import("@/pages/common/register")
      },
      
      {
           
            path: "/orderdetails",
            name: "orderdetails",
            component: () => import("@/pages/Seller/OrderDetails"),
            meta: {
                  
            }
                 
      }, 
      {
            path: "/neworder",
            name: "neworder",
            component: () => import("@/pages/Seller/NewOrder"),
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

];
export default routes;