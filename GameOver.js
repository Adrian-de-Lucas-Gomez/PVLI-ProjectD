export default class GameOver extends Phaser.Scene {
     constructor() {
    super({ key: 'GameOver' });
    this.FinalScore=0;
  }
  preload(){
      this.load.image('fondico','./Imagenes/Fondos_Botones/FondoMenu.jpg');
      this.load.image('gameover','./Imagenes/Fondos_Botones/GAMEover.png');
      this.load.image('botonfin','./Imagenes/Fondos_Botones/ReturnButton.png');
      this.load.audio('GO_music','./Sounds/GameOver.ogg');
  }
  init(data){
        this.FinalScore=data.puntuacion;
        console.log(data.puntuacion);
  }

  create(){
    this.sound.stopAll();

    let image = this.add.image(400, 300, 'fondico');
    image.setScale(0.80);

    let image2 = this.add.image(400, 200, 'gameover');
    image2.setScale(0.60);

    let boton = this.add.image(400, 500, 'botonfin');
    boton.setScale(0.10);

    this.ScoreText = this.add.text(225, 250, 'Puntuacion: ' + this.FinalScore, { fontSize: '40px', fill: '#FFFFFF'});

    this.sound.play("GO_music",{loop: true , volume: 0.05})

    boton.setInteractive();
    boton.on("pointerover", ()=>{boton.setScale(0.11)})
    boton.on("pointerout", ()=>{boton.setScale(0.10)})

    boton.on("pointerup", ()=>{
      boton.setScale(0.08);
      this.sound.stopAll();
      this.scene.start('Menu');
    })

    
   
  }

  update(time,delta){

  }
}