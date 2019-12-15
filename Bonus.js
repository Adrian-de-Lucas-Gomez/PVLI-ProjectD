import Llave from './Llave.js';
export default class Bonus extends Llave
{
    constructor(scene, x, y, type, points)
    {
        super(scene, x, y , type, points);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(1.12);
    }
    create()
    {
        
        
    }
    preUpdate()
    {
        
    }
    AddPoints(score){
        console.log("Yupi");
    }
}