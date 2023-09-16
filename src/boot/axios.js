import { boot } from "quasar/wrappers";
import axios from "axios";
const token = import.meta.VITE_API_TOKEN;
const api = axios.create({ baseURL: "https://api.tomorrow.io/v4/" });

import { Notify } from "quasar";

export default boot(({ app }) => {
  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      Notify.create({
        type: "negative",
        message: error,
        position: "bottom-right",
      });
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      const type =
        response.status >= 200 && response.status < 400
          ? "positive"
          : "negative";
      if (response.config.method !== "get") {
        Notify.create({
          type: type,
          message: $t("Common.Success"),
          position: "bottom-right",
        });
      }
    },
    (error) => {
      Notify.create({
        type: "negative",
        message: error,
        position: "bottom-right",
      });
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
