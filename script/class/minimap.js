class Minimap {
    constructor(width) {
        this.width = width;
        this.blockSurface = width / (environment.width * environment.block) * environment.block;
        this.height = this.blockSurface * environment.height;
        this.size = 6 / 2;
    }

    renderMap() {
        this.renderBlock();
        this.renderPlayer();
    }

    renderPlayer() {
        let size = 7;

        /*coloring*/
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

    renderMinimap() {
        /*draw ground*/
        ctx.fillStyle = Texture.Material.Ground;
        ctx.fillRect(0, 0, this.size * 2* this.blockSurface, this.size * 2 * this.blockSurface);

        /*get positions on minimap*/
        let coord = this.getMinimapCoordinates();

        /*player position and start end of scan in minimap*/
        let px = coord.px;
        let py = coord.py;
        let start = coord.start;
        let end = coord.end;

        /*draw every block*/
        for (let y = 0; y < environment.height; y++) {
            for (let x = 0; x < environment.width; x++) {
                if (environment.grid[y][x] != Texture.Wall.Empty.Material) {
                    /*inside scan area*/
                    if (compareStartEnd(start.x, end.x, x * this.blockSurface, (x + 1) * this.blockSurface) &&
                        compareStartEnd(start.y, end.y, y * this.blockSurface, (y + 1) * this.blockSurface)) {

                        /*offset x and y*/
                        let ox = 0;
                        if (end.x < (x + 1) * this.blockSurface) {
                            ox = end.x - x * this.blockSurface;
                        }

                        let oy = 0;
                        if (end.y < (y + 1) * this.blockSurface) {
                            oy = end.y - y * this.blockSurface;
                        }

                        let img = getWallSource(environment.grid[y][x]);
                        ctx.drawImage(img, 0, 0, ox ==  0 ? img.width : img.width / this.blockSurface * ox,  oy ==  0 ? img.width : img.width / this.blockSurface * oy, x * this.blockSurface - start.x, y * this.blockSurface - start.y, ox ==  0 ? this.blockSurface : ox, oy ==  0 ? this.blockSurface : oy);
                    }
                }
            }
        }

        /*render player*/
        let size = 7;

        /*coloring*/
        ctx.fillStyle = "#47a";
        ctx.strokeStyle = "#000";
        ctx.beginPath();

        px = px - start.x;
        py = py - start.y;

        /*player front side*/
        ctx.moveTo(px + size * Math.cos(player.pod * Math.PI / 180), py + size * Math.sin(player.pod * Math.PI / 180));

        /*player back left side*/
        ctx.lineTo(px + size * Math.cos((player.pod - 140)* Math.PI / 180), py + size * Math.sin((player.pod - 140) * Math.PI / 180));

        /*player back right side*/
        ctx.lineTo(px + size * Math.cos((player.pod - 220)* Math.PI / 180), py + size * Math.sin((player.pod - 220) * Math.PI / 180));

        /*back to player front side*/
        ctx.lineTo(px + size * Math.cos(player.pod * Math.PI / 180), py + size * Math.sin(player.pod * Math.PI / 180));

        /*draw player triangle*/
        ctx.fill();
        ctx.stroke();
    }

    renderSpriteMinimap(sprite) {
        /*get positions on minimap*/
        let coord = this.getMinimapCoordinates();

        /*player position and start end of scan in minimap*/
        let px = coord.px;
        let py = coord.py;
        let start = coord.start;
        let end = coord.end;

        /*position of sprite in minimap*/
        let sx = sprite.x / environment.block * this.blockSurface;
        let sy = sprite.y / environment.block * this.blockSurface;

        /*sprite inside scan*/
        if (compareStartEnd(start.x, end.x, sx, sx) &&
            compareStartEnd(start.y, end.y, sy, sy)) {

            sx = sx - start.x;
            sy = sy - start.y;

            /*draw sprite as circle*/
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.arc(sx, sy, this.blockSurface / 10, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }

    getMinimapCoordinates() {
        /*player position in minimap*/
        let px = player.x / environment.block * this.blockSurface;
        let py = player.y / environment.block * this.blockSurface;

        /*upper left of minimap for scan*/
        let start = {x: px - this.size * this.blockSurface, y: py - this.size * this.blockSurface};

        /*lower right of minimap for scan*/
        let end = {x: px + this.size * this.blockSurface, y: py + this.size * this.blockSurface};

        /*check start x and y*/
        if (start.x < 0) {
            start.x = 0;
            end.x = start.x + 2 * this.size * this.blockSurface;

        }
        if (start.y < 0) {
            start.y = 0;
            end.y = start.y + 2 * this.size * this.blockSurface;
        }

        /*check end x and y*/
        if (end.x > this.width) {
            end.x = this.width;
            start.x = end.x - 2 * this.size * this.blockSurface;
        }
        if (end.y > this.height) {
            end.y = this.height;
            start.y = end.y - 2 * this.size * this.blockSurface;
        }

        return {px: px, py: py, start: start, end: end};
    }
}
