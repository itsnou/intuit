<template>
  <div>
    <q-select
      class="q-mb-md"
      v-model="historicalSelected"
      :options="listHistorical"
      dense
      :label="$t('Common.Search')"
    >
      <template v-slot:selected-item="scope">
        <q-item v-bind="scope">
          <q-item-section>
            <q-item-label>{{ scope.opt.time }}</q-item-label>
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
            <q-item-label>{{ scope.opt.time }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <div v-if="historicalSelected" class="text-center">
      <q-item>
        <q-item-section>
          {{ `${$t("Common.Humidity")}: ${historicalSelected.humidity}%` }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          {{ `${$t("Common.Temp")}: ${historicalSelected.temp} C°` }}
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          {{
            `${$t("Common.TempApparent")}: ${
              historicalSelected.apparentTemp
            } C°`
          }}
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import useParseISODate from "src/composables/useParseISODate";

export default defineComponent({
  name: "list-historical",
  props: {
    historicalData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const historicalSelected = ref(null);
    const listHistorical = computed(() => {
      return props.historicalData.periods.map((item) => {
        return {
          time: useParseISODate(item.dateTimeISO),
          temp: item.tempC ?? "No data",
          apparentTemp: item.feelslikeC ?? "No data",
          humidity: item.humidity ?? "No data"
        };
      });
    });

    return {
      // variables
      historicalSelected,
      // computed
      listHistorical
    };
  }
});
</script>
