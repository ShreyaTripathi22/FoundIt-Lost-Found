export const isWithinDays = (date1, date2, days = 3) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const diff = Math.abs(d1 - d2);
  return diff <= days * 24 * 60 * 60 * 1000;
};
