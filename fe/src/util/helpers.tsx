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

export const formatDateStringToDDMMYYY = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

export const formatRunTimeToHHMM = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

interface FormatDateToDDMMYYYY {
  (isoString: string): string;
}

export const formatIsoStringToDDMMYYYY: FormatDateToDDMMYYYY = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

export const formatDateToMonthYYYY = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const calcAgeYYYYMMDD = (dateString: string) => {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() || 
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  return age;
}

export const arraysAreEqual = (arr1: number[], arr2: number[]) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value) => arr2.includes(value));
};