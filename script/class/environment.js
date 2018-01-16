class Environmemt {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.block = 50;
        this.transform = 20000;
        this.grid = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ];
        this.sprite = [
            new Sprite(100, 100, Texture.Sprite.Armor),
            new Sprite(60, 200, Texture.Sprite.Table)
        ];
    }
    renderSprite(sprite) {
        let cross = {x: sprite.x, y: player.y};
        let dist = {player: getDistance(player.x, player.y, cross.x, cross.y), sprite: getDistance(sprite.x, sprite.y, cross.x, cross.y)};
        let angle = Math.atan(dist.sprite / dist.player) * 180 / Math.PI;
        let distance = getDistance(player.x, player.y, sprite.x, sprite.y);
        let size = this.transform / distance;
        let drawx = (-player.pod + angle * 2) / player.fov * canvas.width;
        let drawy = canvas.height / 2 - size / 2;
        ctx.drawImage(sprite.source, drawx , drawy, size, size);
    }
    renderSkyBox() {
        ctx.drawImage(Load.Sky, canvas.width / 360 * player.pod, 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);
        if(player.pod > 270){
            ctx.drawImage(Load.Sky, canvas.width / 360 * (player.pod - 360), 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);
        }
        ctx.fillStyle = Texture.Color.Ground;
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    }
}
