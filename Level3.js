
import Player from './Player.js';
import Llave from './Llave.js';
import Torreta from './Torreta.js';
import Puerta from './Puerta.js';
//import Trigger from './Trigger.js';
import Ojo from './Ojo.js';
import Bonus from './Bonus.js';
import Baldosa from './Baldosa.js';
import PatrullaPasillo from './PatrullaPasillo.js';
import Mago from './Mago.js';
import PatrullaRecorrido from './PatrullaRecorrido.js';
export default class Level3 extends Phaser.Scene {

  constructor() {
    super({ key: 'Level3' });
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
  
    this.load.tilemapTiledJSON('tilemap3', './Level3.json');
    this.load.image('Dungeon3', './MapaJuego/TileSet/0x72_16x16DungeonTileset(Blue).png');
    this.load.audio('level3_music','./Sounds/BiologicalWeapon.ogg')
  }

  init(data){
        this.score = data.puntuacion;
        console.log(data.puntuacion);
  }

  create() {
    // generador de randoms
    this.rnd = Phaser.Math.RND;

    //carga del mapa
    //this.map = this.make.tilemap({ key: 'tilemap', tileWidth: 16, tileHeight: 16 });
    this.map = this.add.tilemap("tilemap3");
    this.tiles=this.map.addTilesetImage('Dungeon3', 'Dungeon3');

    this.backgroundLayer = this.map.createStaticLayer('suelo',[this.tiles]);
    this.wallLayer = this.map.createStaticLayer('paredes',[this.tiles]);
    this.TopWallLayer = this.map.createStaticLayer('TopesMuros',[this.tiles]);
    this.coinLayer = this.map.createDynamicLayer('monedas',[this.tiles]);

    
    //player
    this.player = new Player(this,50,550,'sprite');

    //physics
    //this.physics.add.existing(this);
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
      
    
    //llaves
    this.llaves = this.add.group();
    this.llave1 = new Llave(this,60,230,'llave');
    this.llave2 = new Llave(this, 740, 110, 'llave')
    this.llave3 = new Llave(this,760,510,'llave');
    this.llaves.add(this.llave1);
    this.llaves.add(this.llave2);
    this.llaves.add(this.llave3);

    //baldosas del nivel
    this.baldosa1 = new Baldosa(this,70,120,'baldosa');
    this.baldosa2 = new Baldosa(this,320,180,'baldosa');
    this.baldosa3 = new Baldosa(this,280,385,'baldosa');
    this.baldosa4 = new Baldosa(this,280,520,'baldosa');
    this.baldosa5 = new Baldosa(this,630,410,'baldosa');
    this.baldosa5 = new Baldosa(this,625,260,'baldosa');
    this.baldosa = this.baldosa1;
    //array de baldosas
    this.Baldosas = [this.baldosa1,this.baldosa2,this.baldosa3,this.baldosa4,this.baldosa5];


    //Bonus
    this.bonus1= new Bonus(this, 40, 408, 'bonus', this.POINTS_PER_BONUS);

    //enemigos
    //grupos
    this.Enemigos = this.add.group();
    this.Detecciones = this.add.group();
    this.Triggers=this.add.group();
    this.Cuerpos = this.add.group();
  
    this.patrulla1 = new PatrullaRecorrido(this,80,300,220,180);
    this.patrulla2 = new PatrullaPasillo(this,520,90,710,90,true,'enemigo');
    this.patrulla3 = new PatrullaPasillo(this,730,100,730,300,false,'enemigo');
    this.torreta1 = new Torreta(this,180,200,'enemigo');
    this.torreta2 = new Torreta(this,630,500,'enemigo');
    this.mago = new Mago(this,this.baldosa1.x, this.baldosa1.y,'mago')
    this.ojo = new Ojo(this,445,345,'ojo',380,400,'cuerpo');

    this.Enemigos.add(this.patrulla1.enemigo);
    this.Enemigos.add(this.patrulla2.enemigo);
    this.Enemigos.add(this.patrulla3.enemigo);
    this.Enemigos.add(this.torreta1.enemigo);
    this.Enemigos.add(this.torreta2.enemigo);
    this.Enemigos.add(this.mago.enemigo);
    this.Enemigos.add(this.ojo.enemigo);
    


    this.Detecciones.add(this.patrulla1.deteccion);
    this.Detecciones.add(this.patrulla2.deteccion);
    this.Detecciones.add(this.patrulla3.deteccion);
    this.Detecciones.add(this.torreta1.deteccion);
    this.Detecciones.add(this.torreta1.deteccion);
    this.Detecciones.add(this.mago.deteccion);
    this.Detecciones.add(this.ojo.deteccion);
    

    this.Triggers.add(this.patrulla1);
    this.Triggers.add(this.patrulla2);
    this.Triggers.add(this.patrulla3);

    this.Cuerpos.add(this.ojo.cuerpo);

  

    //puerta
    this.puerta = new Puerta(this,440,150,'puerta')


    //this.camera.follow(this.player);
    
    
    
    
    
    //Colisiones con entidades
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
      this.keysText = this.add.text(650, 10, 'Pieces:'+ this.pieces+'/' + this.LLavesMax, { fontSize: '22px', fill: '#0bfc03' });
      this.TimeText = this.add.text(300, 16, ' ', { fontSize: '40px', fill: '#0bfc03' });
      //Temporizador
      this.actMin=0;
      this.actSec=0;
      //Musica
      this.sound.stopAll();
      this.sound.play("level3_music",{loop: true , volume: 0.05})


      // camera
    this.camera=this.cameras.main.setSize(100,100);
    this.cameras.main.setViewport(0, 0, 800, 600);
    this.cameras.main.startFollow(this.player);
    this.camera.setBounds(0, 0, 800, 600);


    //Contador de un segundo
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this , loop: true});
    function onEvent(){this.actSec++;}

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
    if(this.physics.collide(this.player,this.Enemigos) || this.espacio.isDown )
    {
      this.Ataque = true;
    }
    if(this.actSec==60){
      this.actSec=0;
      this.actMin++;
    }

    this.hudTimer();
  }
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
      //object2.SubirDificultad(50);
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
      this.scene.start('Menu');
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
