export default class Enemigo extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type)
    {
        super(scene, x, y , type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.setScale(1.2);
        this.setAngle(0);
        this.body.immovable = true;
       


        
        this.incremento=1;
        this.OriPosX=this.x;
        this.OriPosY=this.y;
    }
    create()
    {
        
        
        
    }
   
}