import Enemigo from './Enemigo.js';
import Deteccion from './Ataque.js';
import Trigger from './Trigger.js';

export default class Torreta extends Phaser.GameObjects.Container
{
    constructor(scene,x,y, type)
    {
        super(scene,x,y);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.velocidad = 50;
        this.knockOutTime=3000;
        //this.setInteractive(new Phaser.Geom.Circle(0, 0, 50), Phaser.Geom.Circle.Contains);

        
        this.enemigo = new Enemigo(scene,0,0,type);
        this.deteccion = new Deteccion(scene,50,0,'Deteccion');
        //this.trigger = new Trigger(scene,0,0,100,100);
        this.add(this.enemigo);
        this.add(this.deteccion);
        //this.add(this.trigger);
        
        this.giro=true;
        //this.body.setAngularVelocity(this.velocidad);
       
    }
    create()
    {

    }
    preUpdate()
    {
      
        this.body.setAngularVelocity(this.velocidad);
       
    }

    Atacado()
    {
       
        this.velocidad = 0;
        console.log("velocidad: " + this.velocidad)
        setTimeout(() => {
            this.velocidad = 40;

        },this.knockOutTime);
    }

    SubirDificultad(x)
    {
        this.velocidad =+ x;
    }

    Reset()
    {
        this.velocidad = 40;
    }

    
}