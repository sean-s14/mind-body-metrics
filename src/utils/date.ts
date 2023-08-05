export function createDateString(
  hours: number = new Date().getHours(),
  minutes: number = new Date().getMinutes()
) {
  const year: number = new Date().getFullYear();
  const month: number = new Date().getMonth();
  const day: number = new Date().getDate();
  return new Date(year, month, day, hours, minutes).toISOString();
}

export const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
