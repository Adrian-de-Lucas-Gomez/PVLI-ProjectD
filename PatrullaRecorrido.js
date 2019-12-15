import Enemy from './Enemy.js';
export default class PatrullaRecorrido extends Enemy
{
    constructor(scene,px,py,dx,dy)
    {
        super(scene,px,py,'enemigo');
        this.Punto1= [px ,py];
        this.Punto2= [px , py + dy];
        this.Punto3= [px + dx , py + dy];
        this.Punto4= [px+dx , py];
        this.PX = this.Punto2[0];
        this.PY = this.Punto2[1];
        this.giro=true;
        this.knockOutTime=4000;

    }

    preUpdate()
    {
        this.escena.physics.moveTo(this,this.PX,this.PY,this.velocidad)
        this.enemigo.flipX=this.giro;
        
        
        this.ChangeDirection();
    }

    ChangeDirection()
    {
        if(this.x <= this.Punto1[0] && this.y <= this.Punto1[1] )
        {
            this.PX = this.Punto2[0];
            this.PY = this.Punto2[1];
            this.deteccion.x = 20;
            this.deteccion.y = 60;
            this.deteccion.setAngle(0);
            this.deteccion.flipY = this.giro;
            
        }
        else if( this.y >= this.Punto2[1] && this.x <= this.Punto2[0])
        {
            this.PX = this.Punto3[0];
            this.PY = this.Punto3[1];
            this.giro=true;
            this.deteccion.x = 60;
            this.deteccion.y = 20;
            this.deteccion.setAngle(-90);
            this.deteccion.flipY = !this.giro;
            
        }
       else if(this.x >= this.Punto3[0]  &&  this.y >= this.Punto3[1])
        {
            this.PX = this.Punto4[0];
            this.PY = this.Punto4[1];
            this.deteccion.x = 20;
            this.deteccion.y = -20;
            this.deteccion.setAngle(0);
            this.deteccion.flipY = this.giro;

        }
       else if( this.y <= this.Punto4[1] && this.x >= this.Punto4[0])
        {
            this.PX = this.Punto1[0];
            this.PY = this.Punto1[1];
            this.giro = false;
            this.deteccion.x = -20;
            this.deteccion.y = 20;
            this.deteccion.setAngle(-90);
            this.deteccion.flipY = !this.giro;
        }
    }

    Atacado()
    {
       
        this.velocidad = 0;
        setTimeout(() => {
            this.velocidad = 40;

        },this.knockOutTime);
    }
}