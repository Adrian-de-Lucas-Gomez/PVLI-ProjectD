import Player from './Player.js';
import Llave from './Llave.js';
//import Enemigo from './Enemigo.js';
//import Deteccion from './Ataque.js';
import Enemy from './Enemy.js';
import Torreta from './Torreta.js';
import Puerta from './Puerta.js';
//import Trigger from './Trigger.js';
import Ojo from './Ojo.js';
import Bonus from './Bonus.js';
import Baldosa from './Baldosa.js';
import PatrullaPasillo from './PatrullaPasillo.js';
import Mago from './Mago.js';

export default class Level2 extends Phaser.Scene {

  constructor() {
    super({ key: 'Level2' });
     // variable
     
     //this.llavesRecogidas = 0;
     this.LLavesMax = 3
     this.MaxTime= '1:00';
     this.pieces = 0;
     this.lives = 3;
     //Constantes del juego
     this.POINTS_PER_KEY=15;
     this.POINTS_PER_COIN=5;
     this.POINTS_PER_BONUS=50;
  }
  

  preload() {
    //this.load.image('fondo', './MapaProvisional.png');
    //this.load.image('sprite', './D.png');
    //this.load.image('llave','./llave.png');
    //this.load.image('enemigo','./enemigo.png');
    //this.load.image('Deteccion', './Deteccion.png');
    //this.load.image('puerta', './puerta.png');
    this.load.tilemapTiledJSON('tilemap2', './Level2.json');
    this.load.image('Dungeon2', './MapaJuego/TileSet/0x72_16x16DungeonTileset_Sand.PNG');
    this.load.audio('level2_music','./Sounds/Level2.mp3')
  }

  init(data){
    this.score=data.puntuacion;
    this.pieces=data.piezas;
    this.lives=data.vidas;
  }

  create() {
    //console.log(Phaser.Input.Keyboard.KeyCodes);

    //carga del mapa
    //this.map = this.make.tilemap({ key: 'tilemap', tileWidth: 16, tileHeight: 16 });
    this.map = this.add.tilemap("tilemap2");
    this.tiles=this.map.addTilesetImage('Dungeon2', 'Dungeon2');

    this.backgroundLayer = this.map.createStaticLayer('suelo',[this.tiles]);
    this.wallLayer = this.map.createStaticLayer('paredes',[this.tiles]);
    this.TopWallLayer = this.map.createStaticLayer('TopesMuros',[this.tiles]);
    this.coinLayer = this.map.createDynamicLayer('monedas',[this.tiles]);

    
    //player
    this.player = new Player(this,50,100,'sprite');

    //physics
    this.physics.add.collider(this.player, this.wallLayer);

    this.wallLayer.setCollisionByProperty({ Colision: true });
    this.wallLayer.setCollision([17,18,19]);

      //monedas
      this.coinLayer.setCollisionByProperty({ Colision: true });
      this.coinLayer.setCollision([220,221]);
  
      this.coins=this.add.group();
      this.coins.add(this.coinLayer);
  
      this.physics.add.overlap(this.player, this.coins, this.ColCoin,null,this);
      
    
    
    //llaves
    this.llaves = this.add.group();
    this.llave1 = new Llave(this,100,350,'llave');
    this.llave2 = new Llave(this, 400, 300, 'llave')
    this.llave3 = new Llave(this,500,550,'llave');
    this.llaves.add(this.llave1);
    this.llaves.add(this.llave2);
    this.llaves.add(this.llave3);

    //Bonus
    this.bonus1= new Bonus(this, 40, 408, 'bonus', this.POINTS_PER_BONUS);

    //enemigos
    //grupos
    this.Enemigos = this.add.group();
    this.Detecciones = this.add.group();
    this.Containers=this.add.group();
    this.Triggers=this.add.group();
  
    this.patrulla1 = new PatrullaPasillo(this,150,120,350,120,true,'enemigo');
    this.patrulla2 = new PatrullaPasillo(this,135,150,135,300,false,'enemigo');
    this.patrulla3 = new PatrullaPasillo(this,150,370,320,370,true,'enemigo');
    this.torreta = new Torreta(this,540,270,'enemigo');

    this.Enemigos.add(this.patrulla1.enemigo);
    this.Enemigos.add(this.patrulla2.enemigo);
    this.Enemigos.add(this.patrulla3.enemigo);
    this.Enemigos.add(this.torreta.enemigo);


    this.Detecciones.add(this.patrulla1.deteccion);
    this.Detecciones.add(this.patrulla2.deteccion);
    this.Detecciones.add(this.patrulla3.deteccion);
    this.Detecciones.add(this.torreta.deteccion);
    

    this.Triggers.add(this.patrulla1);
    this.Triggers.add(this.patrulla2);
    this.Triggers.add(this.patrulla3);

    //puerta
    this.puerta = new Puerta(this,750,300,'puerta')


    //this.camera.follow(this.player);

    //Colisiones con entidades
    this.physics.add.collider(this.player,this.Detecciones,this.ColAtaque,null,this);
    this.physics.add.collider(this.player,this.puerta,this.ColPuerta,null,this);
    this.physics.add.collider(this.player,this.llaves,this.ColLlave, null, this);

    this.physics.add.overlap(this.player,this.Triggers,this.ColEnemigo,null,this);
    this.physics.add.collider(this.player,this.Cuerpos,this.colCuerpos,null,this);
    this.physics.add.collider(this.player,this.bonus1,this.ColBonus,null, this);

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
      this.scoreText = this.add.text(16, 16, 'score:' + this.score, { fontSize: '40px', fill: '#0bfc03' });
      this.livesText = this.add.text(700, 40, 'lives:' + this.lives, { fontSize: '15px', fill: '#0bfc03' });
      this.keysText = this.add.text(650, 10, 'Pieces:'+ this.pieces+'/3', { fontSize: '22px', fill: '#0bfc03' });
      this.TimeText = this.add.text(300, 16, ' ', { fontSize: '40px', fill: '#0bfc03' });
      //Variables de tiempo
      this.actMin=0;
      this.actSec=0;

      this.sound.stopAll();
      this.sound.play("level2_music",{loop: true , volume: 0.05})


      // camera
    this.camera=this.cameras.main.setSize(100,100);
    this.cameras.main.setViewport(0, 0, 800, 600);
    this.cameras.main.startFollow(this.player);
    this.camera.setBounds(0, 0, 800, 600);

    //Contador de un segundo
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this , loop: true});
    function onEvent(){this.actSec++;}

        //contador para mover al mago
    this.timerMago = this.time.addEvent({
      delay: 5000,  
      callback: ChangePosition,
      callbackScope: this,
      loop: true
      });
     function ChangePosition()
     {
       this.mago.ChangePosition();
       let grados = this.rnd.pick([-90,0,90,180]);
       this.mago.ChangeRotation(grados);
      }
  //contador para cambiar de baldosa   
    this.timerBaldosa = this.time.addEvent({
      delay: 1000,  
      callback: ChangeBaldosa,
      callbackScope: this,
      loop: true
      });
     function ChangeBaldosa()
     {this.baldosa = this.rnd.pick(this.Baldosas);}


      //Actualizacion del HUD
    this.ActualizaHUD();
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

    else{
      this.player.body.setVelocityX(0)
    }
    

     //Ataque del jugador al enemigo
     if(this.physics.collide(this.player,this.Enemigos) && this.espacio.isDown )
     {
       this.Ataque = true;
     }
     else{this.Ataque = false}
     if(this.espacio.isDown)
     {
       this.AtaqueOjo= true;
     }
     else{this.AtaqueOjo = false;}


     //tiempo
    if(this.actSec==60){
      this.actSec=0;
      this.actMin++;
    }

    this.hudTimer();
  }


    //Metodos Auxiliares;


  hudTimer(){
    if(this.actSec<10){
      this.TimeText.text= this.MaxTime + ' / '+this.actMin + ':' + '0'+this.actSec;
       //Si ya es el tiempo maximo se termina el nivel
    if(this.actMin + ':' + '0'+this.actSec == this.MaxTime){
      this.scene.start('Menu');
    }
    }
    else{
      this.TimeText.text= this.MaxTime + ' / '+this.actMin + ':' + this.actSec;
       //Si ya es el tiempo maximo se termina el nivel
    if(this.actMin + ':' + this.actSec == this.MaxTime){
      this.scene.start('Menu');
    }
    }
   
  }
  ColLlave(object1, object2)
  {
    this.score=this.score + 5;
    this.pieces=this.pieces+1;
    this.sound.play("key_sound",{loop: false , volume: 0.50});
    this.ActualizaHUD();
    object1.ChangeSpawn();
    object2.destroy();
  }

  ColCoin(object1, object2)
  {
    if(object2.index==221 && object2.visible==true){
      object2.visible = false;
      this.score=this.score + this.POINTS_PER_COIN;
      this.sound.play("coin_sound",{loop: false , volume: 0.15});
      //this.ActualizaHUD();
    }
    this.ActualizaHUD();
  }
  ColBonus(object1, object2){
    this.score=this.score + this.POINTS_PER_BONUS;
    //this.score= object2.AddPoints(this.score);
    //this.pieces=this.pieces+1;
    this.sound.play("key_sound",{loop: false , volume: 0.50});
    this.ActualizaHUD();
    //object1.ChangeSpawn();
    object2.destroy();
  }

  ColEnemigo(object1, object2)
  {
    if(this.Ataque)
    {
      object2.Atacado();
      
    }
    
  }
  ColAtaque(object1,object2)
  {
    this.sound.play("catch_sound",{loop: false , volume: 0.15});
    console.log("Chocaste con el enemigo");
    this.lives--;
    this.ActualizaHUD();
    if(this.lives>=0){
      object1.ReturnToSpawn();
      //console.log(this.lives);
    }
    else{
      this.scene.start('GameOver',{puntuacion: this.score})
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
      this.scene.start('Level3',
      { puntuacion: this.score ,
        vidas: this.lives ,
        piezas: 0 });
      //collider.active = false;
      //scene.physics.world.removeCollider(collider);
    }
  }

  colCuerpos(object1,object2)
  {
    if(this.AtaqueOjo)
    {
      object2.atacado = true;
    
    }
   
  }
}
