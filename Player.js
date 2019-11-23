
export default class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,type)
    {
        super(scene,x,y,type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);

        this.posX=this.x;
        this.posY=this.y;
    }
    create()
    {
         
    }

    preUpdate()
    {
        this.setScale(0.05);
        //this.setCollideWorldBounds(true);
        
    }
    
    ReturnToSpawn(){
        this.x=this.posX;
        this.y=this.posY;
        console.log("Deberia de volver al punto de inicio");
    }

    ChangeSpawn(){
        this.posX=this.x;
        this.posY=this.y;
    }
}