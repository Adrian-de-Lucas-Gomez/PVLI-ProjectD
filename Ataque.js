export default class Ataque extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type)
    {
        super(scene, x, y , type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.setAngle(-90);
        
    }
    create()
    {
       
        
    }
    preUpdate()
    {
        this.setScale(0.03);
        this.setCollideWorldBounds(true);
    }

    mover(){
        
    }
}