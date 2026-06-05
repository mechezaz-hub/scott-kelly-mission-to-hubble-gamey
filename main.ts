namespace SpriteKind {
    export const telescope = SpriteKind.create()
}
function createAsteroids () {
    info.startCountdown(120)
    asteroidlist = [
    assets.image`asteroid0`,
    assets.image`asteroid1`,
    assets.image`asteroid2`,
    assets.image`spaceDebris0`,
    assets.image`spaceDebris1`
    ]
    while (info.countdown() > 0) {
        projectile = sprites.createProjectileFromSide(assets.image`asteroid0`, randint(-75, -25), randint(-25, 25))
        projectile.setPosition(160, randint(5, 115))
        pause(randint(250, 1000))
    }
}
function startGame () {
    info.setLife(2214)
    scene.setBackgroundImage(assets.image`spaceBackground`)
    discovery = sprites.create(assets.image`discoveryShuttle`, SpriteKind.Player)
    discovery.setPosition(30, 60)
    discovery.z = 10
    controller.moveSprite(discovery, 75, 75)
    discovery.setStayInScreen(true)
}
info.onCountdownEnd(function () {
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    hubble = sprites.create(assets.image`hubbleTelescope`, SpriteKind.telescope)
    hubble.setPosition(140, 55)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.telescope, function (sprite, otherSprite) {
    scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`splashScreen`)
    scroller.setLayerZIndex(scroller.BackgroundLayer.Layer0, -1000)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    scene.setBackgroundImage(assets.image`kellyScreen`)
    game.showLongText("You're the best!!!!! Thanks for finding my son!", DialogLayout.Bottom)
    game.reset()
})
let hubble: Sprite = null
let discovery: Sprite = null
let projectile: Sprite = null
let asteroidlist: Image[] = []
scene.setBackgroundImage(assets.image`kellyScreen`)
game.showLongText("My name is Scott Kelly,", DialogLayout.Bottom)
game.showLongText("Sorry to disturb you, but my son is stranded in space.", DialogLayout.Bottom)
game.showLongText("Fortunatley, my brother found him and he took him to his Hubble telesope.", DialogLayout.Bottom)
game.showLongText("Can you help me find him?", DialogLayout.Bottom)
startGame()
createAsteroids()
