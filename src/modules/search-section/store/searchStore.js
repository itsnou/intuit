import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api_locations, api_wheather, api_historical } from "src/boot/axios";

const token_locations = import.meta.env.VITE_API_TOKEN_LOCATIONS;
const token_wheather = import.meta.env.VITE_API_TOKEN_WEATHER;
const token_historical_id = import.meta.env.VITE_API_TOKEN_HISTORICAL_ID;
const token_historical_key = import.meta.env.VITE_API_TOKEN_HISTORICAL_KEY;

const CACHE_KEY_LOCATIONS = "locations_cache";
const CACHE_KEY_WEATHER = "weather_cache";
const CACHE_KEY_HISTORICAL = "historical_cache";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

export const useSearchStore = defineStore("search", () => {
  const listLocations = ref([]);
  const wheatherData = ref(null);
  const historicalData = ref(null);
  const locations = computed(() => listLocations.value);

  const getAllLocations = async (payload) => {
    const cachedData = localStorage.getItem(CACHE_KEY_LOCATIONS);
    const cachedTimestamp = localStorage.getItem(
      CACHE_KEY_LOCATIONS + "_timestamp"
    );

    if (cachedData && cachedTimestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - Number(cachedTimestamp) <= CACHE_EXPIRATION_TIME) {
        listLocations.value = JSON.parse(cachedData);
        return;
      }
    }

    if (payload) {
      try {
        const { data } = await api_locations.get("/", {
          params: {
            text: payload,
            apiKey: token_locations,
          },
        });
        listLocations.value = data.features.map(
          (location) => location.properties
        );
        historicalData.value = null;
        // Almacenar datos en caché
        localStorage.setItem(
          CACHE_KEY_LOCATIONS,
          JSON.stringify(listLocations.value)
        );
        localStorage.setItem(
          CACHE_KEY_LOCATIONS + "_timestamp",
          new Date().getTime().toString()
        );
      } catch (error) {
        return null;
      }
    }
  };

  const getWeatherData = async ({ lat, lon }) => {
    const cachedData = localStorage.getItem(CACHE_KEY_WEATHER);
    const cachedTimestamp = localStorage.getItem(
      CACHE_KEY_WEATHER + "_timestamp"
    );

    if (cachedData && cachedTimestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - Number(cachedTimestamp) <= CACHE_EXPIRATION_TIME) {
        wheatherData.value = JSON.parse(cachedData);
        return;
      }
    }

    try {
      const { data } = await api_wheather.get("/", {
        params: {
          lat,
          lon: lon,
          appid: token_wheather,
          units: "metric",
        },
      });
      wheatherData.value = data;

      // Almacenar datos en caché
      localStorage.setItem(
        CACHE_KEY_WEATHER,
        JSON.stringify(wheatherData.value)
      );
      localStorage.setItem(
        CACHE_KEY_WEATHER + "_timestamp",
        new Date().getTime().toString()
      );
    } catch (error) {
      return null;
    }
  };

  const getHistoricalWheather = async ({ lat, lon, from, to }) => {
    try {
      const { data } = await api_historical.get(`/conditions/${lat},${lon}`, {
        params: {
          client_id: token_historical_id,
          client_secret: token_historical_key,
          from,
          to,
          filter: "6hr",
        },
      });
      historicalData.value = data.response[0]; // Hardcodeo esto, ya que nunca tuve la oportunidad de ver mas de un elemento en el array de response
    } catch (error) {
      return null;
    }
  };

  return {
    // variables
    listLocations,
    wheatherData,
    historicalData,
    // computed
    locations,
    // methods
    getAllLocations,
    getWeatherData,
    getHistoricalWheather,
  };
});
