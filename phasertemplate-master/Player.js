//export default class Player extends Phaser.GameObjects.Sprite
export default class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene)
    {
        super(scene,100,400,'sprite');
    }
    create()
    {
        
        //this.setCollideWorldBounds(true);
        //this.setAcceleration(10,0);

        
    }

    preUpdate()
    {
        this.setScale(0.05);
        this.setCollideWorldBounds(true);
    
        
    
        
    }
    
}