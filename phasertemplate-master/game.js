
import Player from './Player.js';
export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.image('fondo', 'https://img-cdn.hipertextual.com/files/2019/06/hipertextual-estas-son-imagenes-que-se-juegan-premio-mejor-astrofotografo-ano-2019530966.jpg?strip=all&lossy=1&quality=57&resize=740%2C490&ssl=1');
    this.load.image('sprite', './favicon.png');

  }

  create() {
    
    //let player = scene.add.sprite(0, 0, 'sprite');


    let image = this.add.image(400, 300, 'fondo');
    //let sprite = new Phaser.GameObjects.Sprite(this, 400, 400, 'sprite');
    
    this.player = new Player(this);
    this.add.existing(this.player);
 
    
    this.cameras.main.setViewport(0, 0, 800, 600);
    this.player.setCollideWorldBounds(true);
    this.player.setGravity(0,10);
  }

  update(time, delta) {
  }



}
