import Torreta from './Torreta.js';
import Cuerpo from './Cuerpo.js';
export default class Ojo extends Torreta
{
    constructor(scene,x,y,type,cx,cy,type2)
    {
        super(scene,x,y,type);
        this.cuerpo = new Cuerpo(scene,cx,cy,type2);
        this.enemigo.setScale(2);
        this.knockOutTime=3000;

    }

    preUpdate()
    {
        this.body.setAngularVelocity(this.velocidad);
        
        if(this.cuerpo.atacado == true)
        {
            this.Atacado();
            this.cuerpo.atacado = false;
        }
    }
    Atacado()
    {
       
        this.velocidad = 0;
        console.log("velocidad: " + this.velocidad)
        setTimeout(() => {
            this.velocidad = 40;

        },this.knockOutTime);
    }
}