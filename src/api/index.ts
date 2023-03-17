import haversine from 'haversine-distance';
import { citiesList } from "../model";

export function sleep(n: number = 1000) {
  return new Promise((r) => setTimeout(r, n));
}

export async function loadCities(value: string): Promise<string []> {
  await sleep(500);
  if (value.toLowerCase() === 'fail') throw new Error();
  const filtered = citiesList.map(c => c[0]).filter(
    (s) => s.toLowerCase().indexOf(value?.toLowerCase()) > -1
  ).slice(0,10);
  return filtered;
}

export async function calcRoute(str: string): Promise<[string[][], number]> {
  await sleep();

  const params = str.split(',');

  const arr = params.map( city => {
    const a = citiesList.find( c => c[0] === city);
    if (!a || city === 'Dijon') throw new Error('City not found');
    return a;
  });
  const cities = [[arr[0][0], '']];
  let acc = 0;
  for (let i = 1; i < arr.length; i++) {
    const dist = (haversine({lat: arr[i-1][1], lng: arr[i-1][2]},{lat: arr[i][1], lng: arr[i][2]}));
    acc = acc + dist;
    cities.push([arr[i][0], (dist / 1000).toFixed(2) + ' km']);
  }
  return [cities, acc];
}
