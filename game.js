
import Player from './Player.js';
import Llave from './Llave.js';
import Enemigo from './Enemigo.js';

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'main' });
   
  }
  

  preload() {
    this.load.image('fondo', './maze.jpg');
    this.load.image('sprite', './player.png');
    this.load.image('llave','./llave.png')
    this.load.image('enemigo','./favicon.png')
    //this.load.spritesheet('anim','./mago.png',291,513);


  }

  create() {
    // variable
    this.puntos = 0;
    this.llavesRecogidas = 0;
    this.LLavesMax = 3


    let image = this.add.image(400, 300, 'fondo');
    image.setScale(1.7);

    //llaves
    this.llaves = this.add.group();
    this.llave1 = new Llave(this,300,200,'llave');
    this.llave2 = new Llave(this, 400, 200, 'llave')
    this.llave3 = new Llave(this,100,100,'llave');
    this.llaves.add(this.llave1);
    this.llaves.add(this.llave2);
    this.llaves.add(this.llave3);

    //enemigo
    this.enemigo= new Enemigo(this, 200, 300 , 'enemigo');
    //this.add.sprite(150,100,'anim');
  
    //this.add.existing(llave1);
  
     // camera
    this.cameras.main.setViewport(0, 0, 800, 600);

    //player
    this.player = new Player(this);
    //this.add.existing(this.player);
 
    //physics
    this.physics.add.existing(this);
    //this.physics.add.collider(this.player, this.llave2, this.choque(10), null, this);
    //this.physics.add.collider(this.player, this.llave2);
    // this.physics.add.collider(this.player, this.llaves, (o1,o2)=>{
     // o2.destroy();
    //});

    this.physics.add.collider(this.player,this.llaves,this.choque);
    this.physics.add.collider(this.player,this.enemigo,this.ColEnemigo);
   
  
    

      //teclas
      this.w = this.input.keyboard.addKey('W');
      this.a = this.input.keyboard.addKey('A');
      this.s = this.input.keyboard.addKey('S');
      this.d = this.input.keyboard.addKey('D');
      this.cursor = this.input.keyboard.createCursorKeys();
      //console.log(this.cursor);
  }

  update(time, delta){
    //controles
  {

    if(this.w.isDown || this.cursor.up.isDown)
    {
       
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
 

  }
  choque(object1, object2)
  {
    console.log(this.puntos);
    this.puntos = 1 + this.puntos;
    this.llavesRecogidas += 1;
    object2.destroy();
    console.log(this.puntos);
  }

  ColEnemigo(object1, object2)
  {
    console.log("Chocaste con el enemigo");
    //this.object1.ReturnToSpawn();
  }
}
