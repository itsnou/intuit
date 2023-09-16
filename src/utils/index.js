import { createI18n } from "vue-i18n";
import messages from "src/i18n";

const i18n = new createI18n({
  locale: localStorage.getItem("language") || "en-US",
  messages,
  allowComposition: true,
});

export const sideBarItems = {
  label: "Intuit Challange",
  caption: "Intuit",
  opened: true,
  headerLevel: 0,
  contentLevel: 0,
  separator: false,
  subitems: [
    {
      label: i18n.global.t("Common.Home"),
      icon: "home",
      opened: true,
      headerLevel: 0.5,
      contentLevel: 1,
      path: "/",
      customClass: "text-white custom-padding",
      separator: true,
    },
  ],
};
