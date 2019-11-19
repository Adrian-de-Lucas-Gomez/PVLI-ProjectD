
import Player from './Player.js';
import Llave from './Llave.js';
import Enemigo from './Enemigo.js';
import Ataque from './Ataque.js';

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'main' });
     // variable
     
     this.llavesRecogidas = 0;
     this.LLavesMax = 3
  }
  

  preload() {
    this.load.image('fondo', './maze.jpg');
    this.load.image('sprite', './player.png');
    this.load.image('llave','./llave.png')
    this.load.image('enemigo','./Enemigo.png')
    this.load.image('Deteccion', './triangulo.png')
    //this.load.spritesheet('anim','./mago.png',291,513);
    this.load.tilemapTiledJSON('tilemap', '/MapaJuego/MapaProvisionalJSON.json');
    this.load.image('patronesTilemap', '/MapaJuego/TileSet/0x72_16x16DungeonTileset.v4.png');

    //carga del mapa
    this.map = this.make.tilemap({ key: 'tilemap', tileWidth: 16, tileHeight: 16 });

    this.map.addTilesetImage('patrones', 'patronesTilemap');

    


  }

  create() {
  

console.log(Phaser.Input.Keyboard.KeyCodes)
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
    this.Enemigos = this.add.group();
    this.enemigo1= new Enemigo(this, 200, 300 , 'enemigo');
    this.enemigo2= new Enemigo(this, 300, 300 , 'enemigo');
    this.enemigo3= new Enemigo(this, 400, 300 , 'enemigo');
    this.Enemigos.add(this.enemigo1)
    this.Enemigos.add(this.enemigo2)
    this.Enemigos.add(this.enemigo3)
    //this.ataque = new Ataque(this,200, 350, 'Deteccion');
    
   // this.Torreta = new Phaser.GameObjects.Container(this,200,300) ; 
    //this.Torreta.add(this.enemigo);
    //this.Torreta.add(this.ataque);

  
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
    //this.physics.add.collider(this.player,this.enemigo,this.ColEnemigo);
    //this.physics.add.collider(this.player,this.Enemigos,this.AtaqueEnemigo);
   
  
    

      //teclas
      this.w = this.input.keyboard.addKey('W');
      this.a = this.input.keyboard.addKey('A');
      this.s = this.input.keyboard.addKey('S');
      this.d = this.input.keyboard.addKey('D');
      this.cursor = this.input.keyboard.createCursorKeys();
      this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      console.log(this.espacio);

      this.score = 0;
      this.pieces = 0;
      this.lives = 3;
      this.scoreText;
      this.scoreText = this.add.text(16, 16, 'score:' + this.score, { fontSize: '40px', fill: '#0bfc03' });
      this.livesText = this.add.text(700, 25, 'lives:' + this.lives, { fontSize: '15px', fill: '#0bfc03' });
      this.keysText = this.add.text(525, 20, 'Pieces:'+ this.pieces+'/3', { fontSize: '22px', fill: '#0bfc03' });
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
    //this.score =this.score+1;
    this.scoreText.text="Score=" + this.score;
    this.livesText.text="lives:" + this.lives;
    this.keysText.text="Pieces:"+ this.pieces+"/3";
  }
 

  }
  choque(object1, object2)
  {
    
    console.log(this.score);
    //this.puntos = 1 + this.puntos;
    this.score += 10;
    //this.scoreText = this.add.text('Score: ' + this.score);
    this.llavesRecogidas += 1;
    object2.destroy();
    // object2.disableBody(true,true);   Otra forma de hacerlo si no quisieramos destruirlo
    console.log(this.puntos);
  }

  ColEnemigo(object1, object2)
  {
    console.log("Chocaste con el enemigo");
    //this.object1.ReturnToSpawn();
  }

 // AtaqueEnemigo(object1,object2)
 //{
   // if(this.espacio.isDown)
    //{
      
   // }
  //}
}
