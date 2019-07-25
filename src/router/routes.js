
const routes = [
      {
            path: "/",
            redirect: "/test"
      },
      {
            path: "/test",
            name: "test",
            component: () => import("@/pages/test"),
            meta:{
                  index:1
            }
      },
      {
            path: "/swiper",
            name: "swiper",
            component: () => import("@/pages/Swiper"),
            meta:{
                  index:2
            }
      },
      {
            path: "/test2",
            name: "test2",
            component: () => import("@/pages/test2"),
            meta: {
                  index: 3
            }
      },
];
export default routes;