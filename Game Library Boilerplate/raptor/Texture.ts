class Texture {
  private img;

  constructor(url: string) {
    this.img = new Image();
    this.img.src = url;
  }
}
export default Texture;
