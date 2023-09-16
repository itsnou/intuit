<template>
  <q-card
    class="q-pa-md flex flex-center"
    flat
    color="transparent"
    style="min-height: 200px"
  >
    <q-circular-progress
      indeterminate
      size="50px"
      color="light-blue"
      class="text-light-blue q-ma-md"
    ></q-circular-progress>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "spinner-component"
});
</script>
