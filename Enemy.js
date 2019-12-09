import Enemigo from './Enemigo.js';
import Deteccion from './Ataque.js';
import Trigger from './Trigger.js';

export default class Enemy extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,x2,y2)
    {
        super(scene,x,y);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        //this.incremento=1;
        //this.OriPosX=this.x;
       // this.OriPosY=this.y;
        this.Pos1X =x;
        this.Pos1Y = y;
        this.Pos2X =x2;
        this.Pos2Y = y2;
        this.PosX = this.Pos2X;
        this.PosY = this.Pos2Y;
        this.enemigo = new Enemigo(scene,20,20,'enemigo');
        this.deteccion = new Deteccion(scene,60,20,'Deteccion');
        //this.trigger = new Trigger(scene,0,0,100,100);
        this.add(this.enemigo);
        this.add(this.deteccion);
        //this.add(this.trigger);
        this.giro=true;
        this.velocidad = 40;
        this.escena = scene;
        //scene.physics.moveTo(this,0,0,20)

        this.knockOutTime=3000; //3 segundos de estar KO
    }
    create()
    {

    }
    preUpdate()
    {
       this.mover();
      
       
       
    }

    mover()
    {
        //suponemos que siempre empieza a moverse hacia la derecha y arriba
        //pos1x < pos2x
        this.escena.physics.moveTo(this,this.PosX,this.PosY,this.velocidad)
        this.enemigo.flipX=this.giro;
        //scene.physics.moveTo(scene,x,y,speed,maxtime)
        if(this.x != this.Pos2X)
        {
            if(this.x <= this.Pos1X)
            {
                this.PosX = this.Pos2X
                this.PosY = this.Pos2Y 
                this.giro=!this.giro;
            }
            if(this.x >= this.Pos2X)
            {
                this.PosX = this.Pos1X
                this.PosY = this.Pos1Y 
                this.giro=!this.giro;
            }
        }
        else
        {
            if(this.y <= this.Pos1Y)
            {
                this.PosX = this.Pos2X
                this.PosY = this.Pos2Y 
                this.giro=!this.giro;
            }
            if(this.y >= this.Pos2Y)
            {
                this.PosX = this.Pos1X
                this.PosY = this.Pos1Y 
                this.giro=!this.giro;
            }
        }
      
        
        //this.escena.physics.moveTo(this,300,300,20)
    }


    Atacado()
    {
       
        this.velocidad = 0;
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