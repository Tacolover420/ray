class Environmemt {
    constructor(grid) {
        this.block = 50;
        this.transform = 25000;
        this.grid = grid;
        this.width = this.grid[0].length;
        this.height = this.grid.length;
        this.sprite = [
            new Sprite(75, 75, Texture.Sprite.Armor.Material),
            new Sprite(225, 225, Texture.Sprite.Pillar.Material),
            new Sprite(75, 225, Texture.Sprite.Plant.Material),
            new Sprite(225, 75, Texture.Sprite.Barrel.Material),
            new Sprite(125, 325, Texture.Sprite.Table.Material),
            new Sprite(350, 350, Texture.Sprite.Table.Material),
            new Sprite(450, 150, Texture.Sprite.Table.Material)
        ];
        this.wallIndex = [];
    }

    renderSprite(sprite) {
        /*distance between player and sprite*/
        let distance = getDistance(player.x, player.y, sprite.x, sprite.y);

        /*size of sprite, calculated from distance divided by a const*/
        let size = this.transform / distance;

        /*an imaginary point going out from player in direction of pod */
        let podPoint = {x: player.x + 100  * Math.cos(player.pod * Math.PI / 180), y: player.y + 100 * Math.sin(player.pod * Math.PI / 180)};

        /*p1 player, p2 sprite, p3 podPoint, calculates angle from two lines with same origin*/
        let angle = (Math.atan2(sprite.y - player.y, sprite.x - player.x) - Math.atan2(podPoint.y - player.y, podPoint.x - player.x)) * 180 /Math.PI;

        if (angle < 360) {
            angle += 360;
        }

        if (angle > 360) {
            angle -= 360;
        }

        /*position on canvas x*/
        let drawx = canvas.width * 4 / 360 * (angle + 45);

        /*position on canvas y*/
        let drawy = canvas.height / 2 - size / 2;

        /*lil cheating solution*/
        if (drawx < - (3* canvas.width)) {
            drawx += (4* canvas.width);
        }
        else if (drawx > (3* canvas.width)) {
            drawx -= (4* canvas.width);
        }

        /*draw sprite y*/
        for (let i = 0; i < sprite.source.width; i++) {
            let pixel = size / sprite.source.width;
            let x = size / sprite.source.width * i;
            if (this.wallIndex[Math.round(drawx - size / 2 + x)] < distance) {
                continue;
            }
            ctx.drawImage(sprite.source, i, 0, 1, sprite.source.height, drawx - size / 2 + x, drawy, pixel, size);
        }
    }

    renderSky() {
        /*draw image*/
        ctx.drawImage(Texture.Material.Sky, 1920 / 360 * player.pod, 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);

        /*draw image next to first image*/
        ctx.drawImage(Texture.Material.Sky, 1920 / 360 * (player.pod - 360), 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);

        /*draw a ground*/
        ctx.fillStyle = Texture.Material.Ground;
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    }

    renderBlock() {
        for (let x = 0; x <= canvas.width; x++) {
            /*direction of ray*/
            let angle = player.pod - 45 + (90 / canvas.width * x);

            /*end point of ray*/
            let rayx = player.x + 1000 * Math.cos(angle * Math.PI / 180);
            let rayy = player.y + 1000 * Math.sin(angle * Math.PI / 180);

            /*bresenham algorithm raycasting*/
            let ray = this.raycast({x: player.x, y: player.y}, {x: rayx, y: rayy});

            ctx.fillStyle = "#000";
            ctx.fillRect(x, canvas.height / 2 - ray.distance / 2, 1, ray.distance);

            ctx.drawImage(ray.texture, ray.offset / 64 * ray.texture.width, 0, ray.texture.width / (canvas.width / 2), ray.texture.height, x, canvas.height / 2 - ray.distance / 2, 1, ray.distance);
            ctx.globalAlpha = 1.0;
        }


    }

    raycast(start, end) {
        /*difference between start and end point*/
        let difX = end.x - start.x;
        let difY = end.y - start.y;

        /*distance*/
        let dist = Math.abs(difX) + Math.abs(difY);

        /*delta x and y*/
        let dx = difX / dist;
        let dy = difY / dist;

        for (let i = 0; i <= Math.ceil(dist); i++) {
            /*calculated x and y coordinates*/
            let x = Math.floor(start.x + dx * i);
            let y = Math.floor(start.y + dy * i);

            /*ray hits solid wall*/
            if (this.grid[Math.floor(y / this.block)][Math.floor(x / this.block)] != Texture.Wall.Empty.Material) {
                /*get wall texture*/
                let texture = getWallSource(this.grid[Math.floor(y / this.block)][Math.floor(x / this.block)]);

                //console.log(x + " " + y);

                /*get distance to wall and save z*/
                let distance = getDistance(player.x, player.y, x, y);
                this.wallIndex.push(distance);

                /*scaled wall distance*/
                distance = this.transform / distance;

                /*get texture offset*/
                let offset = Math.floor(x % 50);
                if (Math.floor(x % 50) == 0 || Math.floor((x + 1) % 50) == 0) {
                    offset = Math.floor(y % 50);
                }

                return {distance: distance, offset: offset, texture: texture};
            }
        }
    }
}

