import Enemy from './Enemy.js';

export default class Torreta extends Enemy
{
    constructor(scene,x,y, type)
    {
        super(scene,x,y,type);
        this.enemigo.setPosition(0,0);
        this.deteccion.setPosition(40,0)

        //this.setInteractive(new Phaser.Geom.Circle(0, 0, 50), Phaser.Geom.Circle.Contains);
        
       
    }

    preUpdate()
    {
      
        this.body.setAngularVelocity(this.velocidad);
       
    }

   

    
    
}