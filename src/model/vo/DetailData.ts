export class DetailData {
  planTitle: string;
  fullPlanTitle: string;
  approachTitle: string;
  planSubtitle: string;
  imageList: ImageData[];
}

export class ImageData {
  src: string;
  thumbnail: string;
  w = 1280;
  h = 720;

  constructor(folder: string, filename: string) {
    this.src = `${folder}/${filename}`;
    this.thumbnail = `${folder}/t${filename}`;
  }
}
