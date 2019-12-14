import Enemigo from './Enemigo.js';
import Deteccion from './Ataque.js';
import Trigger from './Trigger.js';

export default class Enemy extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,x2,y2,horizontal)
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
       
        this.add(this.enemigo);
        this.add(this.deteccion);
     
        this.giro=true;
        this.horizontal = horizontal;
        this.velocidad = 40;
        this.escena = scene;
     

        this.knockOutTime=3000; //3 segundos de estar KO
    }
    create()
    {

    }
    preUpdate()
    {
         //suponemos que siempre empieza a moverse hacia la derecha y arriba
        //pos1x < pos2x
        this.escena.physics.moveTo(this,this.PosX,this.PosY,this.velocidad)
        this.enemigo.flipX=this.giro;
        
        if(this.horizontal)
        {
            this.deteccion.y = this.enemigo.y;
            this.deteccion.setAngle(-90);
            this.moverH();
        }
        else
        {
            this.deteccion.setAngle(0);
            this.deteccion.x = this.enemigo.x
            this.moverV();
        }
       
      
       
       
    }

    moverH()
    {

        this.deteccion.flipY= !this.giro;
        //scene.physics.moveTo(scene,x,y,speed,maxtime)
            if(this.x <= this.Pos1X)
            {
                this.PosX = this.Pos2X
                this.PosY = this.Pos2Y 
                this.giro = !this.giro;
                this.deteccion.x = 60;
                
            }
            if(this.x >= this.Pos2X)
            {
                this.PosX = this.Pos1X
                this.PosY = this.Pos1Y 
                this.giro=!this.giro;
                this.deteccion.x = -20;
                
            }
        //this.escena.physics.moveTo(this,300,300,20)
    }
    moverV()
    {
        this.deteccion.flipY= this.giro;
        if(this.y <= this.Pos1Y)
        {
            this.PosX = this.Pos2X
            this.PosY = this.Pos2Y 
            this.giro=!this.giro;
            this.deteccion.y = 60;
        }
        if(this.y >= this.Pos2Y)
        {
            this.PosX = this.Pos1X
            this.PosY = this.Pos1Y 
            this.giro=!this.giro;
            this.deteccion.y = -20;
        }
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