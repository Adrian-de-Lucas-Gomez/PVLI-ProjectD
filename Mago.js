import Enemy from './Enemy.js';
export default class Mago extends Enemy
{
    constructor(scene,x,y,type)
    {
        super(scene,x,y,type);
        this.TimeChangePosition = 5000;
        this.enemigo.setScale(0.06)
      

    }
    preUpdate()
    {
        this.baldosa = this.escena.baldosa;
        this.ChangePosition()
    }

    ChangePosition()
    {
        setTimeout(() => {
           this.body.reset(this.baldosa.x,this.baldosa.y)
      
        },this.TimeChangePosition);
    }

}