export default class Enemigo extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type)
    {
        super(scene, x, y , type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.setScale(0.05);
        this.setAngle(0);
        
    }
    create()
    {
        
        
    }
    preUpdate()
    {
       
       
    }

    mover(){
        
    }
}