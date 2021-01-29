export class PageRouter {
  name: string;
  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}

export const pageHome = new PageRouter("Home", "/");
export const pageSpecification = new PageRouter("Specifictaion", "/spec");
export const pageAbout = new PageRouter("About", "/about");
export const pageDetail = new PageRouter("Detail", "/detail/:id");
