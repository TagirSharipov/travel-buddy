export function makeURL(cities: string, count: number | string, date: string, url = '/') : string {
  return `${url}?params=${cities}&count0${count}&date=${date}`;
}