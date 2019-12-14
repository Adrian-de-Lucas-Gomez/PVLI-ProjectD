import Llave from './Llave.js';
export default class Bonus extends Llave
{
    constructor(scene, x, y, type, points)
    {
        super(scene, x, y , type, points);
        scene.add.existing(this);
        scene.physics.world.enable(this);
    }
    create()
    {
        this.setScale(0.8);
        
    }
    preUpdate()
    {
        
    }
    AddPoints(score){
        console.log("Yupi");
    }
}