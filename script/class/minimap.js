class Minimap {
    constructor(width) {
        this.width = width;
        this.blockSurface = width / (environment.width * environment.block) * environment.block;
        this.height = this.blockSurface * environment.height;
    }

    renderPlayer() {
        let size = 7;

        ctx.fillStyle = "#47a";
        ctx.strokeStyle = "#000";
        ctx.beginPath();

        /*player front side*/
        ctx.moveTo(player.x / environment.block * this.blockSurface + size * Math.cos(player.pod * Math.PI / 180), player.y / environment.block * this.blockSurface + size * Math.sin(player.pod * Math.PI / 180));

        /*player back left side*/
        ctx.lineTo(player.x / environment.block * this.blockSurface + size * Math.cos((player.pod - 140)* Math.PI / 180), player.y / environment.block * this.blockSurface + size * Math.sin((player.pod - 140) * Math.PI / 180));

        /*player back right side*/
        ctx.lineTo(player.x / environment.block * this.blockSurface + size * Math.cos((player.pod - 220)* Math.PI / 180), player.y / environment.block * this.blockSurface + size * Math.sin((player.pod - 220) * Math.PI / 180));

        /*back to player front side*/
        ctx.lineTo(player.x / environment.block * this.blockSurface + size * Math.cos(player.pod * Math.PI / 180), player.y / environment.block * this.blockSurface + size * Math.sin(player.pod * Math.PI / 180));

        /*draw player triangle*/
        ctx.fill();
        ctx.stroke();
    }

    renderBlock() {
        /*draw ground*/
        ctx.fillStyle = Texture.Material.Ground;
        ctx.fillRect(0, 0, this.width, this.height);

        /*draw every block*/
        for (let y = 0; y < environment.height; y++) {
            for (let x = 0; x < environment.width; x++) {
                if (environment.grid[y][x] != Texture.Wall.Empty.Material) {
                   let img = getWallSource(environment.grid[y][x]);
                   ctx.drawImage(img, x * this.blockSurface, y * this.blockSurface, this.blockSurface, this.blockSurface);
                }
            }
        }
    }

    renderSprite(sprite) {
        /*draw sprite as circle*/
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(sprite.x / environment.block * this.blockSurface, sprite.y / environment.block * this.blockSurface, this.blockSurface / 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
