
import Player from './Player.js';
import Llave from './Llave.js';
export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.image('fondo', './maze.jpg');
    this.load.image('sprite', './player.png');
    this.load.image('llave','./llave.png')

   

  }

  create() {

    let image = this.add.image(400, 300, 'fondo');
    image.setScale(1.7);
    //let sprite = new Phaser.GameObjects.Sprite(this, 400, 400, 'sprite');

    //llaves
    this.llave1 = new Llave(this,250,40,'llave');
    //this.add.existing(llave1);
  
     // camera
    this.cameras.main.setViewport(0, 0, 800, 600);

    //player
    this.player = new Player(this);
    //this.add.existing(this.player);
 
    //physics
    this.physics.add.existing(this);
    //this.physics.add.existing(this.player);
    //this.physics.add.collider(thi)
    

      //teclas
      this.w = this.input.keyboard.addKey('W');
      this.a = this.input.keyboard.addKey('A');
      this.s = this.input.keyboard.addKey('S');
      this.d = this.input.keyboard.addKey('D');
  }

  update(time, delta) {
    if(this.w.isDown)
    {
       //this.player.y-=20;
       this.player.setVelocity(0,-1);
    }
     if(this.a.isDown)
    {
        this.player.x--;
    }
     if(this.s.isDown)
    {
        this.player.y++;

    }
     if(this.d.isDown)
    {
        this.player.x++;
    }

    //this.physics.arcade.collision(this.player,this.llave1);
    //this.physics.add.collider(this.player,this.llave1)

   
  

  

  }
}
