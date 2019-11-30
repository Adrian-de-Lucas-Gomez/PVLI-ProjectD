export default class GameOver extends Phaser.Scene {
     constructor() {
    super({ key: 'GameOver' });
  }
  preload(){
      this.load.image('fondico','./FondoMenu.jpg');
      this.load.image('boton','./Play.png');
      this.load.audio('GO_music','./Sounds/GameOver.ogg')
      //this.load.image('fondico','./FondoMenu.jpg');
  }

  create(){
    this.sound.stopAll();

    let image = this.add.image(400, 300, 'fondico');
    image.setScale(0.80);

    this.GOText = this.add.text(225, 150, 'GameOver' , { fontSize: '80px', fill: '#0bfc03'});

    let boton = this.add.image(400, 500, 'boton');
    boton.setScale(0.10);
    //let image = this.add.image(400, 300, 'fondo');

    this.sound.play("GO_music",{loop: true , volume: 0.05})

    boton.setInteractive();
    boton.on("pointerover", ()=>{boton.setScale(0.11)})
    boton.on("pointerout", ()=>{boton.setScale(0.10)})

    boton.on("pointerup", ()=>{
      boton.setScale(0.08);
      this.sound.stopAll();
      this.scene.start('Menu')
    })

    
   
  }

  update(time,delta){

  }
}