import Torreta from './Torreta.js';
import Cuerpo from './Cuerpo.js';
export default class Ojo extends Torreta
{
    constructor(scene,x,y,type,cx,cy)
    {
        super(scene,x,y,type);
        this.cuerpo = new Cuerpo(scene,cx,cy,"enemigo");
        this.enemigo.setScale(0.05);

    }

    preUpdate()
    {
        this.body.setAngularVelocity(this.velocidad);
        console.log(this.cuerpo.atacado);
        if(this.cuerpo.atacado == true)
        {
            this.Atacado();
            this.cuerpo.atacado = false;
        }
    }
}