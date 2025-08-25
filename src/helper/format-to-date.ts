export const formatToDateBR = (dateIsoFormat: string) => {
  const date = new Date(dateIsoFormat);
  return date.toLocaleDateString("pt-BR");
};

export const formatToISO = (dateBRFormat: string) => {
  const [day, month, year] = dateBRFormat.split("/").map(Number);
  return new Date(year, month - 1, day).toISOString();
};
