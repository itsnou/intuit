const searchRoutes = [
  {
    path: "/",
    component: () => import("src/shared/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("src/modules/search-section/pages/SearchSection.vue"),
      },
    ],
  },
];

export default searchRoutes;
