import Enemigo from './Enemigo.js';
import Ataque from './Ataque.js';

export default class Enemy extends Phaser.GameObjects.Container
{
    constructor(scene,x,y)
    {
        super(scene,x,y);
        scene.add.existing(this);

        this.incremento=1;
        this.OriPosX=this.x;
        this.OriPosY=this.y;
        this.enemigo = new Enemigo(scene,0,0,'enemigo');
        this.ataque = new Ataque(scene,50,0,'Deteccion');
        this.add(this.enemigo);
        this.add(this.ataque);
        
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