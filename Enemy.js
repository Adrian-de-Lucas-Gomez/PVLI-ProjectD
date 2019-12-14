import Enemigo from './Enemigo.js';
import Deteccion from './Ataque.js';

export default class Enemy extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,type)
    {
        super(scene,x,y);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.enemigo = new Enemigo(scene,20,20,type);
        this.deteccion = new Deteccion(scene,60,20,'Deteccion');
        this.add(this.enemigo);
        this.add(this.deteccion);
        this.velocidad = 40;
        this.escena = scene;
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