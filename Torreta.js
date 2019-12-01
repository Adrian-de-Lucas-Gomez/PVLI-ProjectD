import Enemigo from './Enemigo.js';
import Ataque from './Ataque.js';

export default class Torreta extends Phaser.GameObjects.Container
{
    constructor(scene,x,y)
    {
        super(scene,x,y);
        scene.add.existing(this);

        
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
       this.angle++;
       
       
    }

    
}