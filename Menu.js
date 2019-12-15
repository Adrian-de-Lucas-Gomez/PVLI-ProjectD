export default class Menu extends Phaser.Scene {
     constructor() {
    super({ key: 'Menu' });
  }
  preload(){
      this.load.image('fondico','./FondoMenu.jpg');
      this.load.image('boton','./StartButton.png');
      this.load.image('Logo','./DproyectLogoWhite.png');
      this.load.audio('title_music','./Sounds/Menu.ogg')
      //this.load.image('fondico','./FondoMenu.jpg');
      this.load.image('sprite', './D.png');

    this.load.image('llave','./llave.png');
    this.load.image('enemigo','./enemigo.png');
    this.load.image('Deteccion', './Deteccion.png');
    this.load.image('puerta', './puerta.png');
    this.load.image('ojo', './Ojo2.png');
    this.load.image('cuerpo', './CuerpoOjo.png')
    this.load.image('bonus', './Bonus.png');
    this.load.image('baldosa', './Baldosa.png')
    this.load.image('mago','./Mago.png');
    this.load.image('fantasma','./torreta.png');
    this.load.image('circu','./Patrullacircular.png');
    
    this.load.audio('coin_sound','./Sounds/Pickup_Coin.wav');
    this.load.audio('catch_sound','./Sounds/Powerup2.wav');
    this.load.audio('key_sound','./Sounds/KeyPick.wav');
    this.load.audio('wizard_sound','./Sounds/MagoDash.wav');
    this.load.spritesheet('Danim','./Danim.png',{frameWidth: 10, frameHeight: 14});
  }

  create(){
    let image = this.add.image(400, 300, 'fondico');
    image.setScale(0.80);

    let Logotipo= this.add.image(410, 200, 'Logo');
    Logotipo.setScale(0.5);

    let boton = this.add.image(400, 450, 'boton');
    boton.setScale(0.10);
    //let image = this.add.image(400, 300, 'fondo');

    this.sound.stopAll();
    this.sound.play("title_music",{loop: true , volume: 0.05})

    boton.setInteractive();
    boton.on("pointerover", ()=>{boton.setScale(0.11)})
    boton.on("pointerout", ()=>{boton.setScale(0.10)})

    boton.on("pointerup", ()=>{
      boton.setScale(0.08);
      this.sound.stopAll();
      this.scene.start('Level1',
      { puntuacion: 0 ,
        vidas: 3 ,
        piezas: 0 });
    })

    
   
  }

  update(time,delta){

  }
}