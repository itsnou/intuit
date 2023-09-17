import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api_locations, api_wheather, api_historical } from "src/boot/axios";

const token_locations = import.meta.env.VITE_API_TOKEN_LOCATIONS;
const token_wheather = import.meta.env.VITE_API_TOKEN_WEATHER;
const token_historical_id = import.meta.env.VITE_API_TOKEN_HISTORICAL_ID;
const token_historical_key = import.meta.env.VITE_API_TOKEN_HISTORICAL_KEY;

const CACHE_KEY_LOCATIONS = "locations_cache";
const CACHE_KEY_WEATHER = "weather_cache";
const CACHE_PAYLOAD_LOCATIONS = "locations_payload";
const CACHE_EXPIRATION_TIME = 2 * 60 * 1000;

export const useSearchStore = defineStore("search", () => {
  const listLocations = ref([]);
  const wheatherData = ref(null);
  const historicalData = ref(null);
  const locations = computed(() => listLocations.value);

  /**
   * Se obtiene la lista de ubicaciones desde la API geoapify. Si el parámetro de búsqueda está vacío, se devuelve una lista vacía.
   * @async
   * @param {string} payload - El texto de búsqueda para obtener las ubicaciones.
   * @returns {Promise<Array>|null} Una promesa que resuelve en una matriz de ubicaciones o null si la solicitud falla o no se encuentra en caché.
   * @throws {Error} Si ocurre un error durante la solicitud al servidor.
   */
  const getAllLocations = async (payload) => {
    const cachedData = localStorage.getItem(CACHE_KEY_LOCATIONS);
    const cachedTimestamp = localStorage.getItem(
      CACHE_KEY_LOCATIONS + "_timestamp"
    );
    const cachePayload = localStorage.getItem(CACHE_PAYLOAD_LOCATIONS);

    if (cachedData && cachedTimestamp && cachePayload === payload) {
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
        localStorage.setItem(CACHE_PAYLOAD_LOCATIONS, payload);
      } catch (error) {
        return null;
      }
    }
  };

  /**
   * Obtiene datos climáticos para una ubicación especificada por latitud y longitud,
   * ya sea desde el servidor o desde la caché local si está disponible.
   * @async
   * @param {Object} params - Parámetros de la solicitud de datos climáticos.
   * @param {number} params.lat - Latitud de la ubicación.
   * @param {number} params.lon - Longitud de la ubicación.
   * @returns {Promise<Object>|null} Una promesa que resuelve en datos climáticos o null si la solicitud falla o no se encuentra en caché.
   * @throws {Error} Si ocurre un error durante la solicitud al servidor.
   */
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

  /**
   * Obtiene datos climáticos históricos para una ubicación especificada por latitud y longitud
   * en un rango de fechas especificado.
   *
   * @async
   * @param {Object} params - Parámetros de la solicitud de datos climáticos históricos.
   * @param {number} params.lat - Latitud de la ubicación.
   * @param {number} params.lon - Longitud de la ubicación.
   * @param {string} params.from - Fecha de inicio en formato ISO (ejemplo: '2023-09-01').
   * @param {string} params.to - Fecha de finalización en formato ISO (ejemplo: '2023-09-15').
   * @returns {Promise<Object>|null} Una promesa que resuelve en datos climáticos históricos o null si la solicitud falla.
   * @throws {Error} Si ocurre un error durante la solicitud al servidor.
   */
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
