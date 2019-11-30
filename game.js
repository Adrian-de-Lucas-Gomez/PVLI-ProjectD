
import Player from './Player.js';
import Llave from './Llave.js';
import Enemigo from './Enemigo.js';
import Ataque from './Ataque.js';
import Enemy from './Enemy.js';

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'main' });
     // variable
     
     this.llavesRecogidas = 0;
     this.LLavesMax = 3
  }
  

  preload() {
    this.load.image('fondo', './MapaProvisional.png');
    this.load.image('sprite', './player.png');
    this.load.image('llave','./llave.png')
    this.load.image('enemigo','./Enemigo.png')
    this.load.image('Deteccion', './Deteccion.png')
    //this.load.spritesheet('anim','./mago.png',291,513);
    this.load.tilemapTiledJSON('tilemap', '/MapaJuego/MapaProvisionalJSON.json');
    this.load.image('Dungeon', '/MapaJuego/TileSet/0x72_16x16DungeonTileset.v4.png');
    this.load.audio('level_music','./Sounds/Dangerous Dungeon.ogg')
  }

  create() {
  

console.log(Phaser.Input.Keyboard.KeyCodes)
    let image = this.add.image(400, 300, 'fondo');
    image.setScale(0.7);

    //carga del mapa
    this.map = this.make.tilemap({ key: 'tilemap', tileWidth: 16, tileHeight: 16 });

    this.map.addTilesetImage('Dungeon', 'Dungeon');

    //llaves
    this.llaves = this.add.group();
    this.llave1 = new Llave(this,100,350,'llave');
    this.llave2 = new Llave(this, 400, 300, 'llave')
    this.llave3 = new Llave(this,500,550,'llave');
    this.llaves.add(this.llave1);
    this.llaves.add(this.llave2);
    this.llaves.add(this.llave3);

    //enemigo
    this.Enemigos = this.add.group();
    this.Ataques = this.add.group();
    //this.enemigo1= new Enemigo(this, 0, 0 , 'enemigo');
    //this.enemigo2= new Enemigo(this, 300, 100 , 'enemigo');
    //this.enemigo3= new Enemigo(this, 400, 100 , 'enemigo');
    this.torreta1 = new Enemy(this,100,200);
    this.torreta2 = new Enemy(this,100,300);
    this.torreta3 = new Enemy(this,100,400);
    this.Enemigos.add(this.torreta1.enemigo);
    this.Enemigos.add(this.torreta2.enemigo);
    this.Enemigos.add(this.torreta3.enemigo);
    this.Ataques.add(this.torreta1.ataque);
    this.Ataques.add(this.torreta2.ataque);
    this.Ataques.add(this.torreta3.ataque);

    // camera
    
    this.cameras.main.setSize(1600,1200);
    this.cameras.main.setViewport(0, 0, 800, 600);
    
    //player
    this.player = new Player(this,100,100,'sprite');

    //physics
    this.physics.add.existing(this);
    
    this.physics.add.collider(this.player,this.Enemigos,this.ColEnemigo, null, this);
    this.physics.add.collider(this.player,this.Ataques,this.ColAtaque,null,this);

    this.physics.add.collider(this.player,this.llaves,this.ColLlave, null, this);

    
    
      //teclas
      this.w = this.input.keyboard.addKey('W');
      this.a = this.input.keyboard.addKey('A');
      this.s = this.input.keyboard.addKey('S');
      this.d = this.input.keyboard.addKey('D');
      this.r = this.input.keyboard.addKey('R');
      this.t = this.input.keyboard.addKey('T');
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
  
      this.sound.play("level_music",{loop: true , volume: 0.05})
  
    }

  update(time, delta){
    //controles
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

    //Teclas para probar el guadado de spawn y la reaparicion
    else if( this.r.isDown){
      this.player.ReturnToSpawn();
    }
    else if( this.t.isDown){
      this.player.ChangeSpawn();
    }
    else{
      this.player.body.setVelocityX(0)
    }

    //this.enemigo1.mover();
    
    this.scoreText.text="Score=" + this.score;
    this.livesText.text="lives:" + this.lives;
    this.keysText.text="Pieces:"+ this.pieces+"/3";
  }
 
  ColLlave(object1, object2)
  {
    this.score=this.score + 5;
    this.pieces=this.pieces+1;
    this.ActualizaHUD();
    object1.ChangeSpawn();
    object2.destroy();
  }

  ColEnemigo(object1, object2)
  {
    if(this.espacio.isDown)
    {

    }
    
  }
  ColAtaque(object1,object2)
  {
    console.log("Chocaste con el enemigo");
    this.lives--;
    this.ActualizaHUD();
    if(this.lives>=0){
      object1.ReturnToSpawn();
      //console.log(this.lives);
    }
    else{
      this.scene.start('GameOver')
    }
    
  }

  ActualizaHUD(){
    this.scoreText.text="Score=" + this.score;
    this.livesText.text="lives:" + this.lives;
    this.keysText.text="Pieces:"+ this.pieces+"/3";
  }

 // AtaqueEnemigo(object1,object2)
 //{
   // if(this.espacio.isDown)
    //{
      
   // }
  //}
}
