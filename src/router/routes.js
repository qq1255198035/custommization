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
      

];
export default routes;