import { boot } from "quasar/wrappers";
import axios from "axios";
const api_locations = axios.create({
  baseURL: "https://api.geoapify.com/v1/geocode/autocomplete",
});

import { Notify } from "quasar";

export default boot(({ app }) => {
  api_locations.interceptors.request.use(
    (config) => {
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

  api_locations.interceptors.response.use(
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
      return response;
    },
    (error) => {
      Notify.create({
        type: "negative",
        message: error.message,
        position: "bottom-right",
      });
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api_locations = api_locations;
});

export { api_locations };
