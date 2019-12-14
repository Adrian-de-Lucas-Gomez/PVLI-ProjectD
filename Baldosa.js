export default class Baldosa extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, type)
    {
        super(scene, x, y , type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.setScale(0.02);
        //this.setAngle(0);
        this.body.immovable = true;

    }
}