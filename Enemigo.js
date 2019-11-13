export default class Enemigo extends Phaser.Physics.Arcade.Sprite
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
        //this.setScale(0.3);
        this.setCollideWorldBounds(true);
    }

    mover(){
        
    }
}