import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { api_locations } from "src/boot/axios";

export const useSearchStore = defineStore("search", () => {
  const token = import.meta.env.VITE_API_TOKEN_LOCATIONS;
  const listLocations = ref([]);
  const locations = computed(() => listLocations.value);

  const getAllLocations = async (payload) => {
    if (payload) {
      try {
        const { data } = await api_locations.get("/", {
          params: {
            text: payload,
            apiKey: token,
          },
        });
        listLocations.value = data.features.map(
          (location) => location.properties
        );
      } catch (error) {
        return null;
      }
    }
  };

  return {
    // variables
    listLocations,
    // computed
    locations,
    // methods
    getAllLocations,
  };
});
