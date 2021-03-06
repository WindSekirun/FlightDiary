export class InfoKeyValue {
  key: string;
  value: string;
  link: string;
  sortKey: string;
  connectUrl: string | undefined;
  hasUrl: boolean;

  constructor(k: string, v: string, url: string | undefined) {
    this.key = k;
    this.value = v;
    this.sortKey = `${k}${v}`;
    this.connectUrl = url;
    this.hasUrl = url != undefined;
  }
}

export function KV(key: string, value: string) {
  return new InfoKeyValue(key, value, undefined);
}

export function KVC(key: string, value: string, url: string) {
  return new InfoKeyValue(key, value, url);
}
