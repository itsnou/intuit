<template>
  <div class="q-pa-sm">
    <q-card class="my-card">
      <q-card-section>
        <q-select
          v-model="autocomplete"
          use-input
          input-debounce="400"
          :options="locations"
          @filter="filterLocations"
          dense
          :loading="filterLocationsLoading"
          :label="$t('Common.Search')"
        >
          <template v-slot:selected-item="scope">
            <q-item v-bind="scope">
              <q-item-section>
                <q-item-label>{{ scope.opt.formatted }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                <q-item-label>{{ $t("Common.NoResults") }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.formatted }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
    </q-card>
    <Card v-if="autocomplete" class="q-mt-md" :autocomplete="autocomplete" />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useSearchStore } from "../store/searchStore";
import Card from "../components/Card.vue";

export default defineComponent({
  name: "SearchSection",
  components: {
    Card
  },
  setup() {
    const autocomplete = ref("");
    const filterLocationsLoading = ref(false);
    const storeSearch = useSearchStore();
    const locations = computed(() => storeSearch.locations);

    const filterLocations = async (val, update) => {
      update(async () => {
        filterLocationsLoading.value = true;
        await storeSearch.getAllLocations(val);
        filterLocationsLoading.value = false;
      });
    };

    return {
      // variables
      autocomplete,
      filterLocationsLoading,
      // computed
      locations,
      // methods,
      filterLocations
    };
  }
});
</script>
