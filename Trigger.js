export default class Trigger extends Phaser.GameObjects.Zone

{
    constructor(scene,x,y,width,height,Object)
    {
        super(scene,x,y,width,height)
        scene.add.existing(this);
        scene.physics.world.enable(this);
        
    }
}