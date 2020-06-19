/* eslint-disable import/prefer-default-export */
export function getFormattedDate(): string {
  const date = new Date();

  const day:number = date.getDate();
  const month: number = date.getMonth() + 1;

  const dd: string = day < 10 ? `0${day}` : `${day}`;
  const mm: string = month < 10 ? `0${month}` : `${month}`;
  const yyyy: string = `${date.getFullYear()}`;

  return `${dd}-${mm}-${yyyy}`;
}
