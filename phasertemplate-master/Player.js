
export default class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene)
    {
        super(scene,100,400,'sprite');
        scene.add.existing(this);
        scene.physics.world.enable(this);
    }
    create()
    {
         
    }

    preUpdate()
    {
        this.setScale(0.05);
        this.setCollideWorldBounds(true);
    
        
    
        
    }
    
}