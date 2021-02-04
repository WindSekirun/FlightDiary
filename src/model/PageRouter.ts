export class PageRouter {
  name: string;
  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}

export const pageHome = new PageRouter("Home", "/");
export const pageAbout = new PageRouter("About", "/about");
export const pageDetail = new PageRouter("Detail", "/detail/:id");
export const pageSpec = new PageRouter("Specs", "/spec");