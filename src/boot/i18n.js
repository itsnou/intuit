import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

const language = localStorage.getItem("language") || "en-US";

export default boot(({ app }) => {
  localStorage.setItem("language", language);
  const i18n = createI18n({
    locale: language,
    globalInjection: true,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
