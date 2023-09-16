<template>
  <q-layout view="hHh LpR fFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-btn flat :to="{ path: '/' }">
            <!-- <q-avatar square>
              <img
                src="static/isologo.png"
                style="width: 28px; height: 28px"
                class="q-ma-auto"
              />
            </q-avatar> -->
            Intuit Challange
          </q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      show-if-above
      elevated
      bordered
      style="background-color: #a9c1c9; color: whitesmoke"
    >
      <q-list>
        <ListMultiLevel
          :label="menuItems.label"
          :children="menuItems.subitems"
          :icon="menuItems.icon"
          :separator="menuItems.separator"
          :caption="menuItems.caption"
          :opened="menuItems.opened"
          :headerLevel="menuItems.headerLevel"
          :contentLevel="menuItems.contentLevel"
          :headerStyle="{ background: '#3f515a', padding: '0.9rem 5px' }"
          :access="menuItems.access"
          :color="menuItems.customClass"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { sideBarItems } from "src/utils";

import ListMultiLevel from "src/shared/components/ListMultiLevel.vue";

export default defineComponent({
  name: "app-layout",
  components: { ListMultiLevel },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      menuItems: sideBarItems,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>
