export default class Puerta extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene,x,y,type)
    {
        super(scene,x,y,type)
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.escena = scene;
        this.body.immovable = true;

        this.open = false
        this.setScale(0.05);
    }
    create()
    {}
    PreUpdate()
    {

    }

    AbrePuerta()
    {
        if(this.escena.pieces >= this.escena.LLavesMax)
        {
            this.open = true;
            //this.destroy();
            console.log(this.open);
            console.log(this.escena.pieces);
            console.log(this.escena.LLavesMax);
            return true;
        }
        else{
            return false;
        }
    }
}