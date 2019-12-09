export default class Llave extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type, points)
    {
        super(scene, x, y , type);
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
        score += this.points;
        return score;
    }
}