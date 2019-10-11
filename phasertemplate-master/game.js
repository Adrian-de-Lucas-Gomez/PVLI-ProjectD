export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('fondo', 'https://img-cdn.hipertextual.com/files/2019/06/hipertextual-estas-son-imagenes-que-se-juegan-premio-mejor-astrofotografo-ano-2019530966.jpg?strip=all&lossy=1&quality=57&resize=740%2C490&ssl=1');
   
   
  }

  create() {
    //let player = scene.add.sprite(0, 0, 'fondo');
    
    
    let image = this.add.image(400,300,'fondo');
    let sprite = new Phaser.GameObjects.Sprite(this, 400, 400, 'sprit');
    
    this.add.existing(sprite);
    this.cameras.main.setViewport(0, 0, 800, 600);
  }

  update(time, delta) {    
  }
  
  
  
}