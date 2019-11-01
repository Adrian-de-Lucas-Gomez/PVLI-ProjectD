
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
     //variables del juego
    this.puntos = 0;
    this.llavesRecogidas = 0;
    this.LLavesMax = 3

   

  }

  create() {

    let image = this.add.image(400, 300, 'fondo');
    image.setScale(1.7);

    //llaves
    this.llave1 = new Llave(this,300,200,'llave');
    this.llave2 = new Llave(this, 400, 200, 'llave')
    //this.add.existing(llave1);
  
     // camera
    this.cameras.main.setViewport(0, 0, 800, 600);

    //player
    this.player = new Player(this);
    //this.add.existing(this.player);
 
    //physics
    this.physics.add.existing(this);
    //this.physics.add.collider(this.player, this.llave1, this.choque(10), null, this);
   
  
    

      //teclas
      this.w = this.input.keyboard.addKey('W');
      this.a = this.input.keyboard.addKey('A');
      this.s = this.input.keyboard.addKey('S');
      this.d = this.input.keyboard.addKey('D');
      this.cursor = this.input.keyboard.createCursorKeys();
      //console.log(this.cursor);
  }

  update(time, delta) {
    //controles
    {

    if(this.w.isDown || this.cursor.up.isDown)
    {
       //this.player.y-=5;
       this.player.body.setVelocityY(-100);
      
    }
    else if(this.s.isDown || this.cursor.down.isDown)
    {
      this.player.body.setVelocityY(100);
    }
    else
    {
      this.player.body.setVelocityY(0);
    }
     if(this.a.isDown || this.cursor.left.isDown)
    {
       // this.player.x-=5;
       this.player.body.setVelocityX(-100)
    }
    else if ( this.d.isDown || this.cursor.right.isDown)
    {
      this.player.body.setVelocityX(100)
    }
    else{
      this.player.body.setVelocityX(0)
    }
   }
   
   //colisiones
   {
     if(this.physics.collide(this.player,this.llave1))
     {
       this.choque(20, this.llave1)
     }
   }

  }
  choque(puntos, object)
  {
    this.puntos =+puntos;
    //this.llave1.destroy();
    this.llavesRecogidas++;
    object.destroy();
    console.log(this.puntos)

  }
}
