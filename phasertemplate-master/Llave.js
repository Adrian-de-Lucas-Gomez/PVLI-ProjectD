export default class Llave extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type)
    {
        super(scene, x, y , type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
    }
    create()
    {
       
        
    }
    preUpdate()
    {
        this.setScale(0.3);
        this.setAngle(90);
        this.setCollideWorldBounds(true);
        //this.setVelocityX(30);

        //this.x++;
    }
}