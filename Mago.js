import Enemy from './Enemy.js';
export default class Mago extends Enemy
{
    constructor(scene,x,y)
    {
        super(scene,x,y,'mago');
        this.baldosa = scene.baldosa;
        this.TimeChangePosition = 3000;
        this.enemigo.setScale(1.5)
        this.enemigo.setPosition(0,0);
        this.deteccion.setPosition(40,0)
        //this.setAngle(180);
 
    }
   
    preUpdate()
    {
       // console.log(this.baldosa)
        this.baldosa = this.escena.baldosa;

    }

    ChangePosition()
    {
        console.log(this.baldosa)
        this.body.reset(this.baldosa.x,this.baldosa.y)
    }

    ChangeRotation(x)
    {
        this.setAngle(x);
    }

}