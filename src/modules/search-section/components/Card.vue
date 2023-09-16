<template>
  <Spinner v-if="loading" />
  <q-card v-else class="my-card">
    <q-card-section class="text-center">
      <p>{{ autocomplete.formatted }}</p>
      <div>
        {{ getFullDate(day) }}
      </div>
      <q-item>
        <q-item-section>
          {{ `${$t("Common.Humidity")}: ${wheatherData.main?.humidity}%` }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          {{ `${$t("Common.TempMax")}: ${wheatherData.main?.temp_max} C°` }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          {{ `${$t("Common.TempMin")}: ${wheatherData.main?.temp_min} C°` }}
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="text-center">
      <q-item-label class="q-mr-md">Range dates</q-item-label>
      <div>
        <q-btn color="primary">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" range>
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn
                  :label="$t('Common.Cancel')"
                  color="primary"
                  flat
                  v-close-popup
                />
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  @click="getHistoricalWheather"
                  v-close-popup
                />
              </div>
            </q-date>
          </q-popup-proxy>
          {{ $t("Common.SelectDate") }}
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section v-if="historicalData !== null">
      <ListHistorical :historicalData="historicalData" />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import { useSearchStore } from "../store/searchStore";
import { storeToRefs } from "pinia";
import Spinner from "src/components/Spinner.vue";
import ListHistorical from "./ListHistorical.vue";

export default defineComponent({
  name: "search-section-card",
  components: {
    Spinner,
    ListHistorical
  },
  props: {
    autocomplete: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useSearchStore();
    const { wheatherData, historicalData } = storeToRefs(store);
    const loading = ref(true);
    const day = ref(new Date());
    const date = ref({
      from: new Date(),
      to: new Date()
    });

    const getFullDate = (date) => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return date.toLocaleDateString("en-US", options);
    };

    const getHistoricalWheather = async () => {
      loading.value = true;
      await store.getHistoricalWheather({
        lat: props.autocomplete.lat,
        lon: props.autocomplete.lon,
        from: date.value.from,
        to: date.value.to
      });
      loading.value = false;
    };

    onBeforeMount(async () => {
      loading.value = true;
      await store.getWeatherData({
        lat: props.autocomplete.lat,
        lon: props.autocomplete.lon
      });
      loading.value = false;
    });

    return {
      // variables
      wheatherData,
      loading,
      day,
      date,
      historicalData,
      // methods
      getFullDate,
      getHistoricalWheather
    };
  }
});
</script>

<style scoped lang="scss">
.my-card {
  width: 300px;
  margin: 20px auto;
}

@media screen and (min-width: 725px) {
  .my-card {
    width: 350px;
  }
}

@media screen and (min-width: 1024px) {
  .my-card {
    width: 400px;
  }
}

@media screen and (min-width: 1440px) {
  .my-card {
    width: 450px;
  }
}
</style>
