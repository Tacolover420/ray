class Minimap {
    constructor(width) {
        this.width = width;
        //this.blockSurface = environment.width / environment.block * width;
        this.blockSurface = width / (environment.width * environment.block) * environment.block;
        this.height = this.blockSurface * environment.height;
    }

    render() {
        ctx.fillStyle = Texture.Color.Ground;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = "#000";
        for (let y = 0; y < environment.height; y++) {
            for (let x = 0; x < environment.width; x++) {
                if (environment.grid[y][x] != Texture.Wall.Empty) {
                   let img = getWallSource(environment.grid[y][x]);
                   ctx.drawImage(img, x * this.blockSurface, y * this.blockSurface, this.blockSurface, this.blockSurface);
                }
            }
        }
        ctx.fillRect((player.x - player.fat / 2) / environment.block * this.blockSurface, (player.y - player.fat / 2) / environment.block * this.blockSurface, player.fat / environment.block * this.blockSurface, player.fat / environment.block * this.blockSurface);
        ctx.beginPath();
        ctx.moveTo(player.x / environment.block * this.blockSurface, player.y / environment.block * this.blockSurface);
        ctx.lineTo(player.x / environment.block * this.blockSurface + 20 * Math.cos(player.pod * Math.PI / 180), player.y / environment.block * this.blockSurface + 20 * Math.sin(player.pod * Math.PI / 180));
        ctx.stroke();
    }

    renderSprite(sprite) {
        ctx.beginPath();
        ctx.arc(sprite.x / environment.block * this.blockSurface, sprite.y / environment.block * this.blockSurface, this.blockSurface / 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
