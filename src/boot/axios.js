import { boot } from "quasar/wrappers";
import { Notify } from "quasar";
import axios from "axios";

const api_locations = axios.create({
  baseURL: "https://api.geoapify.com/v1/geocode/autocomplete",
});

const api_wheather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
});

const api_historical = axios.create({
  baseURL: "https://api.aerisapi.com/",
});

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

  api_wheather.interceptors.request.use(
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

  api_wheather.interceptors.response.use(
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

  api_historical.interceptors.request.use(
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

  api_historical.interceptors.response.use(
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
  app.config.globalProperties.$api_wheather = api_wheather;
  app.config.globalProperties.$api_historical = api_historical;
});

export { api_locations, api_wheather, api_historical };
