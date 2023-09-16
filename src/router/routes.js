import searchRoutes from "src/modules/search-section/routes";
const routes = [
  ...searchRoutes,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
