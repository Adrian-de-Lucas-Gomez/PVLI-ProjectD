import Enemigo from './Enemigo.js';
import Deteccion from './Ataque.js';

export default class Enemy extends Phaser.GameObjects.Container
{
    constructor(scene,x,y)
    {
        super(scene,x,y);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.incremento=1;
        this.OriPosX=this.x;
        this.OriPosY=this.y;
        this.enemigo = new Enemigo(scene,0,0,'enemigo');
        this.deteccion = new Deteccion(scene,50,0,'Deteccion');
        this.add(this.enemigo);
        this.add(this.deteccion);
        
        this.giro=true;
    }
    create()
    {

    }
    preUpdate()
    {
       this.mover();
       
       
    }

    mover(){
        
        if(this.x < this.OriPosX || this.x > this.OriPosX+200){
            this.incremento=this.incremento* -1;
            this.giro=!this.giro;
        }
        this.x=this.x+this.incremento;
        this.y= this.OriPosY;
        this.enemigo.flipX=this.giro;
    }
}