
import Player from './Player.js';
import Llave from './Llave.js';
import Enemigo from './Enemigo.js';
import Deteccion from './Ataque.js';
import Enemy from './Enemy.js';
import Torreta from './Torreta.js';
import Puerta from './Puerta.js';

export default class Level3 extends Phaser.Scene {

  constructor() {
    super({ key: 'Level3' });
     // variable
     
     //this.llavesRecogidas = 0;
     this.LLavesMax = 3
     this.MaxTime= '1:00';
  }
  

  preload() {
    this.load.image('fondo', './MapaProvisional.png');
    this.load.image('sprite', './D.png');
    this.load.image('llave','./llave.png')
    this.load.image('enemigo','./enemigo.png')
    this.load.image('Deteccion', './Deteccion.png')
    this.load.image('puerta', './puerta.png')
    //this.load.spritesheet('anim','./mago.png',291,513);
    this.load.tilemapTiledJSON('tilemap', './MapaProvisionalJSON.json');
    this.load.image('Dungeon', './MapaJuego/TileSet/0x72_16x16DungeonTileset(Blue).png');
    this.load.audio('level1_music','./Sounds/Dangerous Dungeon.ogg')
  }

  create() {
    console.log(Phaser.Input.Keyboard.KeyCodes)

    //carga del mapa
    //this.map = this.make.tilemap({ key: 'tilemap', tileWidth: 16, tileHeight: 16 });
    this.map = this.add.tilemap("tilemap");
    this.tiles=this.map.addTilesetImage('Dungeon', 'Dungeon');

    this.backgroundLayer = this.map.createStaticLayer('suelo',[this.tiles]);
    this.wallLayer = this.map.createStaticLayer('paredes',[this.tiles]);
    this.TopWallLayer = this.map.createStaticLayer('TopesMuros',[this.tiles]);

    
    //player
    this.player = new Player(this,50,50,'sprite');

    //physics
    //this.physics.add.existing(this);
    //Colisiones con Layers del Tilemap
    
    //this.wallLayer.setCollisionByExclusion([19], false);
    this.physics.add.collider(this.player, this.wallLayer);

    this.wallLayer.setCollisionByProperty({ Colision: true });
    this.wallLayer.setCollision([17,18,19]);
    //this.physics.add.existing(this.wallLayer);
    
    //llaves
    this.llaves = this.add.group();
    this.llave1 = new Llave(this,100,350,'llave');
    this.llave2 = new Llave(this, 400, 300, 'llave')
    this.llave3 = new Llave(this,500,550,'llave');
    this.llaves.add(this.llave1);
    this.llaves.add(this.llave2);
    this.llaves.add(this.llave3);

    //enemigos
    //grupos
    this.Enemigos = this.add.group();
    this.Detecciones = this.add.group();
    this.Containers=this.add.group();
  
    this.patrulla1 = new Enemy(this,100,200);
    this.patrulla2 = new Enemy(this,100,300);
    this.patrulla3 = new Enemy(this,100,400);
    this.torreta = new Torreta(this,400,400);
    this.Enemigos.add(this.patrulla1.enemigo);
    this.Enemigos.add(this.patrulla2.enemigo);
    this.Enemigos.add(this.patrulla3.enemigo);
    this.Enemigos.add(this.torreta.enemigo)
    this.Detecciones.add(this.patrulla1.deteccion);
    this.Detecciones.add(this.patrulla2.deteccion);
    this.Detecciones.add(this.patrulla3.deteccion);
    this.Detecciones.add(this.torreta.deteccion);
    this.Containers.add(this.patrulla1);
    this.Containers.add(this.patrulla2);
    this.Containers.add(this.patrulla3);
    this.Containers.add(this.torreta);

    //puerta
    this.puerta = new Puerta(this,750,300,'puerta')


    //this.camera.follow(this.player);
    
    
    
    
    
    //Colisiones con entidades
    this.physics.add.collider(this.player,this.Enemigos,);
    this.physics.add.collider(this.player,this.Detecciones,this.ColAtaque,null,this);
    this.physics.add.collider(this.player,this.puerta,this.ColPuerta,null,this);
    this.physics.add.collider(this.player,this.llaves,this.ColLlave, null, this);
    this.physics.add.overlap(this.player,this.Containers,this.ColEnemigo,null,this)

    this.physics.add.collider(this.player,this.map,);
    
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

      // HUD
      this.score = 0;
      this.pieces = 0;
      this.lives = 3;
      this.scoreText = this.add.text(16, 16, 'score:' + this.score, { fontSize: '40px', fill: '#0bfc03' });
      this.livesText = this.add.text(700, 50, 'lives:' + this.lives, { fontSize: '15px', fill: '#0bfc03' });
      this.keysText = this.add.text(650, 20, 'Pieces:'+ this.pieces+'/3', { fontSize: '22px', fill: '#0bfc03' });
      this.TimeText = this.add.text(300, 16, ' ', { fontSize: '40px', fill: '#0bfc03' });

      this.actMin=0;
      this.actSec=0;

      this.sound.stopAll();
      this.sound.play("level1_music",{loop: true , volume: 0.05})


      // camera
    this.camera=this.cameras.main.setSize(100,100);
    this.cameras.main.setViewport(0, 0, 800, 600);
    this.cameras.main.startFollow(this.player);
    this.camera.setBounds(0, 0, 800, 600);



    this.timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this , loop: true});
    function onEvent(){this.actSec++;}
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
    /*
    else if( this.r.isDown){
      this.player.ReturnToSpawn();
    }
    else if( this.t.isDown){
      this.player.ChangeSpawn();
    }
    */
    else{
      this.player.body.setVelocityX(0)
    }
    

    //Ataque del jugador al enemigo
    if(this.physics.collide(this.player,this.Enemigos) || this.espacio.isDown )
    {
      this.Ataque = true;
    }

    this.scoreText.text="Score=" + this.score;
    this.livesText.text="lives:" + this.lives;
    this.keysText.text="Pieces:"+ this.pieces+"/" + this.LLavesMax;
    //this.TimeText.text= this.timedEvent.getProgress().toString().substr(0, 4); 
    if(this.actSec==60){
      this.actSec=0;
      this.actMin++;
    }

    this.TimeText.text= this.MaxTime + ' / '+this.actMin + ':' + this.actSec; 

    
    if(this.actMin + ':' + this.actSec+'0' == this.MaxTime){
        this.scene.start('Menu');
    }
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
    if(this.Ataque)
    {
      object2.body.stop();
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
    this.keysText.text="Pieces:"+ this.pieces+"/" + this.LLavesMax;
  }

  ColPuerta(objet1,object2)
  {
    if(!object2.open)// si la puerta no esta abierta
    {
      this.puerta.AbrePuerta();
      //sonido cuqui
      
      
    }
    else// si ya esta abierta
    {
      object2.body.enable = false;
      this.sound.stopAll();
      this.scene.start('Level2');
      //collider.active = false;
      //scene.physics.world.removeCollider(collider);
    }
  }

  onEvent(){
    this.scene.start('Menu');
  }
}
