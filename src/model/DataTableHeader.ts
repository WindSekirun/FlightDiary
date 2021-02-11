export class DataTableHeader {
  text: string;
  align = "start";
  sortable = false;
  value = "";

  constructor(name: string, value: string) {
    this.text = name;
    this.value = value;
  }
}
