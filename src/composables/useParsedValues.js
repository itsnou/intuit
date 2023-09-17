const useParsedValues = (type, value) => {
  if (type === "temp" && value) {
    return `${value} °C`;
  } else if (type === "humidity" && value) {
    return `${value} %`;
  } else {
    return "No Data";
  }
};

export default useParsedValues;
