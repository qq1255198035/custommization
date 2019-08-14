import BasicLayout from "@/layouts/BasicLayout.vue";
import SellerLayout from "@/layouts/SellerLayout.vue";
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
                        component: () => import("@/pages/Website/home"),
                        meta: {

                        }
                  },
                  {
                        path: "/products",
                        name: "products",
                        component: () => import("@/pages/Website/products"),
                        meta: {

                        }
                  },
                  {
                        path: "/about",
                        name: "about",
                        component: () => import("@/pages/Website/about"),
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
            path: "/seller",
            name: "seller",
            component: SellerLayout,
            redirect: "/dashbored",
            children:[
                  {
                        path: "/dashbored",
                        name: "dashbored",
                        component: () => import("@/pages/Seller/dashbored"),
                        meta: {
                              
                        }
                  }
            ]
      }
      

];
export default routes;