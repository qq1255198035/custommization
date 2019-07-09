
const routes = [
      {
            path: "/",
            redirect: "/main"
      },
      {
            path: "/main",
            name: "main",
            component: () => import("@/pages/main")
      }
];
export default routes;