/**
 * Converts a date string into the format "Month Day, Year".
 * @param dateString - A string in the format "YYYY-MM-DD".
 * @returns A formatted date string, e.g., "Nov 27, 2024".
 */
export const formatDateToMonthDayYear = (dateString: string): string => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
};
