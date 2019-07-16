
const routes = [
      {
            path: "/",
            redirect: "/test"
      },
      {
            path: "/test",
            name: "test",
            component: () => import("@/pages/test")
      }
];
export default routes;