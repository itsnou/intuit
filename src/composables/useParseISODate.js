import { useI18n } from "vue-i18n";
import { computed } from "vue";

const useParseISODate = (isoDate) => {
  const i18n = useI18n();
  const language = computed(() => i18n.locale.value);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Crear una instancia de Date a partir de la cadena ISO
  const date = new Date(isoDate);

  // Obtener la fecha en el formato deseado
  const formattedDate = date.toLocaleDateString(language, options);

  return formattedDate;
};

export default useParseISODate;
