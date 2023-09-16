import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const getAllLocations = async () => {};

  return {
    getAllLocations,
  };
});
