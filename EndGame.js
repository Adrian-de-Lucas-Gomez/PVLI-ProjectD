export default class EndGame extends Phaser.Scene {
     constructor() {
    super({ key: 'EndGame' });
    this.FinalScore=0;
  }
  preload(){
      this.load.image('fondico','./Imagenes/Fondos_Botones/FondoMenu.jpg');
      this.load.image('Logo','./Imagenes/Fondos_Botones/DproyectLogoWhite.png');
      this.load.image('botonfin','./Imagenes/Fondos_Botones/ReturnButton.png');
      this.load.audio('End_music','./Sounds/NewHope.ogg');
      //this.load.image('fondico','./FondoMenu.jpg');
  }
  init(data){
        this.FinalScore=data.puntuacion;
        console.log(data.puntuacion);
  }

  create(){
    this.sound.stopAll();

    let image = this.add.image(400, 300, 'fondico');
    image.setScale(0.80);

    this.GOText = this.add.text(70, 120, '¡Enhorabuena! Lograste terminar' , { fontSize: '35px', fill: '#FFFFFF'});
    let image2 = this.add.image(400, 225, 'Logo');
    image2.setScale(0.30);

    let boton = this.add.image(400, 500, 'botonfin');
    boton.setScale(0.10);
    //let image = this.add.image(400, 300, 'fondo');
    this.ScoreText = this.add.text(150, 300, 'Final score: ' + this.FinalScore, { fontSize: '40px', fill: '#FFFFFF'});

    this.sound.play("End_music",{loop: true , volume: 0.05})

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