function formatComma(str: string) {
  return new Number(str).toLocaleString("en");
}

export function strToNum(str: string) {
  return Number((str || "").replace(/\D/g, ""));
}

export function displayNm(nm: string | undefined): string {
  const unit = strToNum(nm || "");
  const km = formatComma(Math.ceil(unit * 1.1852).toString());
  return `${formatComma(unit.toString())} nm / ${km} km`;
}

export function displayFt(ft: string): string {
  const unit = strToNum(ft || "");
  const km = formatComma(Math.ceil(unit * 0.0003048).toString());
  return `${formatComma(ft)} ft / ${km} km`;
}

export function displayFtM(ft: string): string {
  const unit = strToNum(ft || "");
  const km = formatComma(Math.ceil(unit * 0.3048).toString());
  return `${formatComma(ft)} ft / ${km} m`;
}

export function displayFtOnly(ft: string): string {
  return `${formatComma(ft)} ft`;
}

export function displayFtMFloor(ft: number): string {
  const floor = Math.floor(ft);
  return displayFtM(floor.toString());
}

export function calculateTotalDistance(nm: string[]): string {
  const total = nm
    .map((element) => Number((element || "").replace(/\D/g, "")))
    .reduce((a, b) => a + b, 0);
  return displayNm(`${total} nm`);
}
