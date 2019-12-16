
import Player from './Player.js';
import Llave from './Llave.js';
import Torreta from './Torreta.js';
import Puerta from './Puerta.js';
import Ojo from './Ojo.js';
import Bonus from './Bonus.js';
import Baldosa from './Baldosa.js';
import PatrullaPasillo from './PatrullaPasillo.js';
import Mago from './Mago.js';
import PatrullaRecorrido from './PatrullaRecorrido.js';


export default class Level1 extends Phaser.Scene {

  constructor() {
    super({ key: 'Level1' });
     // variable
     
     //this.llavesRecogidas = 0;
     this.LLavesMax = 3
     this.MaxTime= '2:00';
     this.score = 0;
     this.pieces = 3;
     this.lives = 3;
     this.TimeBaldosa = 1000;
    //Constantes del juego
     this.POINTS_PER_KEY=15;
     this.POINTS_PER_COIN=5;
     this.POINTS_PER_BONUS=50;
     
  }
  

  preload() {
    this.load.tilemapTiledJSON('tilemap1', './Level1.json');
    this.load.image('Dungeon', './MapaJuego/TileSet/0x72_16x16DungeonTileset.v4.png');
    this.load.audio('level1_music','./Sounds/DangerousDungeon.ogg');

    
    this.load.image('sprite', './Personajes/Jugador/D.png');

    this.load.image('llave','./Personajes/Objetos/llave.png');
    this.load.image('enemigo','./Personajes/Enemigos/enemigo.png');
    this.load.image('Deteccion', './Personajes/Objetos/Deteccion.png');
    this.load.image('puerta', './Personajes/Objetos/puerta.png');
    
    this.load.image('bonus', './Personajes/Objetos/Bonus.png');
    this.load.image('baldosa', './Personajes/Objetos/Baldosa.png');
    this.load.image('mago','./Personajes/Enemigos/Mago.png');
    this.load.image('fantasma','./Personajes/Enemigos/torreta.png');
    this.load.image('circu','./Personajes/Enemigos/Patrullacircular.png');
    
    this.load.audio('coin_sound','./Sounds/Pickup_Coin.wav');
    this.load.audio('catch_sound','./Sounds/Powerup2.wav');
    this.load.audio('key_sound','./Sounds/KeyPick.wav');
    this.load.audio('wizard_sound','./Sounds/MagoDash.wav');
    this.load.spritesheet('Danim','./Personajes/Jugador/Danim.png',{frameWidth: 10, frameHeight: 14});
  }

  init(data){
    this.score=data.puntuacion;
    this.pieces=data.piezas;
    this.lives=data.vidas;
  }

  create() {
    //console.log(Phaser.Input.Keyboard.KeyCodes)
    this.anims.create({key: 'run',
    frames: this.anims.generateFrameNumbers('Danim'),
    frameRate: 5,
    repeat: -1
    });

    // generador de randoms
    this.rnd = Phaser.Math.RND;

    //carga del mapa
    //this.map = this.make.tilemap({ key: 'tilemap', tileWidth: 16, tileHeight: 16 });
    this.map = this.add.tilemap("tilemap1");
    this.tiles=this.map.addTilesetImage('Dungeon', 'Dungeon');

    this.backgroundLayer = this.map.createStaticLayer('suelo',[this.tiles]);
    this.wallLayer = this.map.createStaticLayer('paredes',[this.tiles]);
    this.TopWallLayer = this.map.createStaticLayer('TopesMuros',[this.tiles]);
    this.coinLayer = this.map.createDynamicLayer('monedas',[this.tiles]);

    //llaves
    this.llaves = this.add.group();
    this.llave1 = new Llave(this,50,540,'llave',this.POINTS_PER_KEY);
    this.llave2 = new Llave(this, 760, 90, 'llave',this.POINTS_PER_KEY);
    this.llave3 = new Llave(this,570,570,'llave',this.POINTS_PER_KEY);
    this.llaves.add(this.llave1);
    this.llaves.add(this.llave2);
    this.llaves.add(this.llave3);

    //baldosas del nivel
    this.baldosa1 = new Baldosa(this,240,255);
    this.baldosa2 = new Baldosa(this,125,507);
    this.baldosa3 = new Baldosa(this,575,80);
    this.baldosa4 = new Baldosa(this,670,290);
    this.baldosa5 = new Baldosa(this,735,420);
    this.baldosa = this.baldosa1;
    //array de baldosas
    this.Baldosas = [this.baldosa1,this.baldosa2,this.baldosa3,this.baldosa4,this.baldosa5];

    //Bonus
    this.Bonus = this.add.group();
    this.bonus1= new Bonus(this, 40, 160, 'bonus', this.POINTS_PER_BONUS);
    this.bonus2= new Bonus(this, 40, 408, 'bonus', this.POINTS_PER_BONUS);
    this.bonus3= new Bonus(this, 690, 570, 'bonus', this.POINTS_PER_BONUS);
    this.Bonus.add(this.bonus1);
    this.Bonus.add(this.bonus2);
    this.Bonus.add(this.bonus3);

    //enemigos
    //grupos
    this.Enemigos = this.add.group();
    this.Detecciones = this.add.group();
    this.Triggers=this.add.group();
    this.Cuerpos = this.add.group();

    //declaracion de enemigos
    this.patrulla1 = new PatrullaRecorrido(this,135,125,185,250);
    this.patrulla2 = new PatrullaPasillo(this,440,470,580,470,true);
    this.torreta = new Torreta(this,540,270,'fantasma');
    this.mago = new Mago(this,this.baldosa1.x, this.baldosa1.y);

  
    // Añadir los enemigos a los grupos
    this.Enemigos.add(this.patrulla1.enemigo);
    this.Enemigos.add(this.patrulla2.enemigo);
    this.Enemigos.add(this.torreta.enemigo);
    this.Enemigos.add(this.mago.enemigo);

    this.Detecciones.add(this.patrulla1.deteccion);
    this.Detecciones.add(this.patrulla2.deteccion);
    this.Detecciones.add(this.torreta.deteccion);
    this.Detecciones.add(this.mago.deteccion);
    

    this.Triggers.add(this.patrulla1);
    this.Triggers.add(this.patrulla2);

    //player
    this.player = new Player(this,50,100,'sprite');
    
    //Colisiones con Layers del Tilemap
    
    //this.wallLayer.setCollisionByExclusion([19], false);
    this.physics.add.collider(this.player, this.wallLayer);
    this.wallLayer.setCollisionByProperty({ Colision: true });
    this.wallLayer.setCollision([17,18,19]);
    //this.physics.add.existing(this.wallLayer);
    
    //monedas
    this.coinLayer.setCollisionByProperty({ Colision: true });
    this.coinLayer.setCollision([220,221]);

    this.coins=this.add.group();
    this.coins.add(this.coinLayer);

    this.physics.add.overlap(this.player, this.coins, this.ColCoin,null,this);

    //puerta
    this.puerta = new Puerta(this,752,150,'puerta');

    //Colisiones con entidades
    this.physics.add.collider(this.player,this.Detecciones,this.ColAtaque,null,this);
    this.physics.add.collider(this.player,this.puerta,this.ColPuerta,null,this);
    this.physics.add.collider(this.player,this.llaves,this.ColLlave, null, this);

    this.physics.add.overlap(this.player,this.Triggers,this.ColEnemigo,null,this);
    this.physics.add.collider(this.player,this.Cuerpos,this.colCuerpos,null,this);

    this.physics.add.collider(this.player,this.Bonus,this.ColBonus,null, this);

    
      //teclas
      this.w = this.input.keyboard.addKey('W');
      this.a = this.input.keyboard.addKey('A');
      this.s = this.input.keyboard.addKey('S');
      this.d = this.input.keyboard.addKey('D');
      this.r = this.input.keyboard.addKey('R');
      this.t = this.input.keyboard.addKey('T');
      this.cursor = this.input.keyboard.createCursorKeys();
      this.espacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      

      // HUD
      this.scoreText = this.add.text(16, 16, 'score:' + this.score, { fontSize: '40px', fill: '#FFFFFF' });
      this.livesText = this.add.text(700, 40, 'lives:' + this.lives, { fontSize: '15px', fill: '#FFFFFF' });
      this.keysText = this.add.text(650, 10, 'Pieces:'+ this.pieces+'/3', { fontSize: '22px', fill: '#FFFFFF' });
      this.TimeText = this.add.text(300, 16, ' ', { fontSize: '40px', fill: '#FFFFFF' });
      //Variables del tiempo
      this.actMin=0;
      this.actSec=0;

      this.sound.stopAll();
      this.sound.play("level1_music",{loop: true , volume: 0.05});


      // camera
    this.camera=this.cameras.main.setSize(100,100);
    this.cameras.main.setViewport(0, 0, 800, 600);
    //this.cameras.main.startFollow(this.player);
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
      this.sound.play("wizard_sound",{loop: false , volume: 0.15});
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
      this.player.body.setVelocityX(-100);
      this.player.flipX=false;
    }
    else if ( this.d.isDown || this.cursor.right.isDown)
    {
      this.player.body.setVelocityX(100);
      this.player.flipX=true;
    }

    else{
      this.player.body.setVelocityX(0);
    }
    

    //Ataque del jugador al enemigo
    if(this.physics.collide(this.player,this.Enemigos) && this.espacio.isDown )
    {
      this.Ataque = true;
    }
    else{this.Ataque = false;}
    //Ataque del jugador al enemigo Ojo
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
    this.ActualizaHUD();
  }

  ColLlave(object1, object2)
  {
    this.score=this.score + this.POINTS_PER_KEY;
    //this.score= object2.AddPoints(this.score);
    this.pieces=this.pieces+1;
    this.ActualizaHUD();
    this.sound.play("key_sound",{loop: false , volume: 0.50});
    object1.ChangeSpawn();
    object2.destroy();
    
  }
  ColCoin(object1, object2)
  {
    if(object2.index==221 && object2.visible==true){
      object2.visible = false;
      this.score=this.score + this.POINTS_PER_COIN;
      this.sound.play("coin_sound",{loop: false , volume: 0.05});
      this.ActualizaHUD();
    }
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
    this.sound.play("catch_sound",{loop: false , volume: 0.05});
    console.log("Chocaste con el enemigo");
    this.lives--;
    this.ActualizaHUD();
    if(this.lives>=0){
      object1.ReturnToSpawn();
      //console.log(this.lives);
    }
    else{
      this.scene.restart();
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
      this.scene.start('Level2',
      { puntuacion: this.score ,
        vidas: this.lives ,
        piezas: 0 });
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
