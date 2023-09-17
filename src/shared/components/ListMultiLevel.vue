<template>
  <q-expansion-item
    v-if="children"
    class="text-weight-bold text-uppercase bg-secondary"
    :label="label"
    :icon="icon ?? null"
    :caption="caption"
    :default-opened="opened ?? false"
    :header-inset-level="headerLevel"
    :content-inset-level="contentLevel"
    dark
    style="border-bottom: solid 0.08rem lightgrey"
  >
    <ListMultiLevel
      v-for="(item, ndx) in children"
      :key="ndx"
      :label="item.label ?? null"
      :children="item.subitems ?? null"
      :icon="item.icon ?? null"
      :separator="item.separator ?? false"
      :caption="item.caption ?? null"
      :path="item.path ?? null"
      :opened="item.opened ?? false"
      :header-level="item.icon ? 0 : item.headerLevel"
      :content-level="item.contentLevel ?? 0"
      :customClass="item.customClass"
      :access="item.access"
    />
  </q-expansion-item>
  <template v-else>
    <q-item
      :class="customClass ? customClass : 'bg-gray text-primary'"
      clickable
      dense
      tag="a"
      :to="path"
      :style="separator ? 'border-bottom: solid 0.08rem lightgrey;' : ''"
    >
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ `${label}` }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </template>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListMultiLevel",
  props: [
    "label",
    "children",
    "icon",
    "caption",
    "opened",
    "path",
    "headerLevel",
    "contentLevel",
    "access",
    "customClass",
    "separator"
  ]
});
</script>
