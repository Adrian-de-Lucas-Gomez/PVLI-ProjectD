export default class Menu extends Phaser.Scene {
     constructor() {
    super({ key: 'Menu' });
  }
  preload(){
      this.load.image('fondico','./FondoMenu.jpg');
      this.load.image('boton','./Play.png');
      this.load.audio('title_music','./Sounds/Biological Weapon.ogg')
      //this.load.image('fondico','./FondoMenu.jpg');
  }

  create(){
    let image = this.add.image(400, 300, 'fondico');
    image.setScale(0.80);

    let boton = this.add.image(400, 300, 'boton');
    boton.setScale(0.10);
    //let image = this.add.image(400, 300, 'fondo');

    this.sound.play("title_music",{loop: true , volume: 0.15})

    boton.setInteractive();
    boton.on("pointerover", ()=>{boton.setScale(0.11)})
    boton.on("pointerout", ()=>{boton.setScale(0.10)})

    boton.on("pointerup", ()=>{
      boton.setScale(0.08),
      this.sound.stopAll(),
      this.scene.start('main')
    })

    
   
  }

  update(time,delta){

  }
}