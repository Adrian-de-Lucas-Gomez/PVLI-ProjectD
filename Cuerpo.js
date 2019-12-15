import Enemigo from './Enemigo.js';
export default class Cuerpo extends Enemigo
{
    constructor(scene, x, y, type)
    {
        super(scene, x, y, type)
        this.atacado = false;
        this.setScale(2);
    }
}