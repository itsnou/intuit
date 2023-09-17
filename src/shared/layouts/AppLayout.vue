<template>
  <q-layout view="hHh LpR fFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-btn flat :to="{ path: '/' }"> Intuit Challange </q-btn>
        </q-toolbar-title>
        <q-separator />
        <q-btn color="secondary" @click="dialog = !dialog">
          {{ language === "en-US" ? "Spanish" : "English" }}
        </q-btn>
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
    <q-dialog v-model="dialog">
      <q-card width="300px">
        <q-card-section>
          <q-card-title>{{ $t("Alert.ChangeLanguage.Title") }}</q-card-title>
        </q-card-section>

        <q-card-section>
          <span>{{ $t("Alert.ChangeLanguage.Text") }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :label="$t('Common.Cancel')"
            color="primary"
            @click="dialog = !dialog"
          />
          <q-btn label="OK" color="primary" @click="changeLanguage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { sideBarItems } from "src/utils";
import { useI18n } from "vue-i18n";

import ListMultiLevel from "src/shared/components/ListMultiLevel.vue";

export default defineComponent({
  name: "app-layout",
  components: { ListMultiLevel },
  setup() {
    const leftDrawerOpen = ref(false);
    const i18n = useI18n();
    const language = computed(() => i18n.locale.value);
    const dialog = ref(false);

    return {
      menuItems: sideBarItems,
      leftDrawerOpen,
      language,
      dialog,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      changeLanguage() {
        i18n.locale.value === "en-US"
          ? (i18n.locale.value = "es-ES")
          : (i18n.locale.value = "en-US");
        localStorage.setItem("language", i18n.locale.value);
        dialog.value = !dialog.value;
        window.location.reload();
      }
    };
  }
});
</script>
