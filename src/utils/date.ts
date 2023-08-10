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

export const timeRegex = /^\d{2}:\d{2}$/;

export function timeToDate(time: string): Date {
  const [hour, minute] = time.split(":");
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  return new Date(year, month, day, Number(hour), Number(minute));
}

export function dateToTime(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function isoToDate(iso: string): string {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
