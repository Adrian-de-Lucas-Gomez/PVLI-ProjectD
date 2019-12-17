export default class Menu extends Phaser.Scene {
     constructor() {
    super({ key: 'Menu' });
  }
  preload(){
      this.load.image('fondico','./Imagenes/Fondos_Botones/FondoMenu.jpg');
      this.load.image('boton','./Imagenes/Fondos_Botones/StartButton.png');
      this.load.image('Logo','./Imagenes/Fondos_Botones/DproyectLogoWhite.png');
      this.load.audio('title_music','./Sounds/Menu.ogg');
      
  }

  create(){
    let image = this.add.image(400, 300, 'fondico');
    image.setScale(0.80);

    let Logotipo= this.add.image(410, 200, 'Logo');
    Logotipo.setScale(0.5);

    let boton = this.add.image(400, 450, 'boton');
    boton.setScale(0.10);

    this.sound.stopAll();
    this.sound.play("title_music",{loop: true , volume: 0.05})

    boton.setInteractive();
    boton.on("pointerover", ()=>{boton.setScale(0.11)})
    boton.on("pointerout", ()=>{boton.setScale(0.10)})

    boton.on("pointerup", ()=>{
      boton.setScale(0.08);
      this.sound.stopAll();
      this.scene.start('Level3',
      { puntuacion: 0 ,
        vidas: 3 ,
        piezas: 0 });
    })

    
   
  }

  update(time,delta){

  }
}