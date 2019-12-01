import Enemigo from './Enemigo.js';
import Deteccion from './Ataque.js';

export default class Torreta extends Phaser.GameObjects.Container
{
    constructor(scene,x,y)
    {
        super(scene,x,y);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        //this.setInteractive(new Phaser.Geom.Circle(0, 0, 50), Phaser.Geom.Circle.Contains);

        
        this.enemigo = new Enemigo(scene,0,0,'enemigo');
        this.deteccion = new Deteccion(scene,50,0,'Deteccion');
        this.add(this.enemigo);
        this.add(this.deteccion);
        
        this.giro=true;
        this.body.setAngularVelocity(50);
        //this.body.center = new Vector2([300],[50]);
        //this.body.setSize(100,100,new Vector2([50],[50]));
    }
    create()
    {

    }
    preUpdate()
    {
       //this.angle++;
       
       
    }

    
}