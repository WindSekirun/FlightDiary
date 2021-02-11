export function displayNm(nm: string | undefined): string {
  const unit = Number((nm || "").replace(/\D/g, ""));
  const km = Math.ceil(unit * 1.1852)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const nmUnit = unit
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return `${nmUnit} nm / ${km} km`;
}

export function displayFt(ft: string): string {
  const unit = Number(ft.replace(/\D/g, ""));
  const km = Math.ceil(unit * 0.3048)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return `${ft.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} ft / ${km} km`;
}

export function calculateTotalDistance(nm: string[]): string {
  const total = nm
    .map((element) => Number((element || "").replace(/\D/g, "")))
    .reduce((a, b) => a + b, 0);
  return displayNm(`${total} nm`);
}
