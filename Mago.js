import Enemy from './Enemy.js';
export default class Mago extends Enemy
{
    constructor(scene,x,y,type)
    {
        super(scene,x,y,type);
        this.baldosa = scene.baldosa;
        this.TimeChangePosition = 3000;
        this.enemigo.setScale(2)
        //this.timer = scene.time.addEvent({
          //  delay: 3000,  
           // callback: ChangePosition,
            //args: [],
            //callbackScope: this,
           // repeat: 4
       // });
        
      

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

}