const useParseISODate = (isoDate) => {
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
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export default useParseISODate;
