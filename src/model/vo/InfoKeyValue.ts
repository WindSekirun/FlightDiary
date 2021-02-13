export class InfoKeyValue {
  key: string;
  value: string;
  link: string;
  sortKey: string;

  constructor(k: string, v: string) {
    this.key = k;
    this.value = v;
    this.sortKey = `${k}${v}`
  }
}

export function KV(key: string, value: string) {
  return new InfoKeyValue(key, value);
}
