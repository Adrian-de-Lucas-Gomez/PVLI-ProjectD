
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

        this.play('run');
    }
    create()
    {
         
    }

    preUpdate(t,d)
    {
        this.setScale(2);
        super.preUpdate(t,d);   //Para que funcione la animacion
        //this.setCollideWorldBounds(true);
        if(this.body.velocity.x==0 && this.body.velocity.y==0){
            this.anims.pause();
        }
        else{
            this.anims.resume();
        }
        
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