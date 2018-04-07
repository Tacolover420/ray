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
            new Sprite(350, 350, Texture.Sprite.Plant.Material),
            new Sprite(450, 150, Texture.Sprite.Barrel.Material),
            new Sprite(475, 625, Texture.Sprite.Table.Material)
        ];
        this.wallIndex = [];
    }

    render() {
        this.renderSky();
        this.renderBlock();
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
            ctx.drawImage(sprite.source, i, 0, 1, sprite.source.height, drawx - size / 2 + x, drawy - player.view, pixel, size);
        }
    }

    renderSky() {
        /*draw image*/
        ctx.drawImage(Texture.Material.Sky, Texture.Material.Sky.width / 360 * player.pod, 0, Texture.Material.Sky.width / 4, Texture.Material.Sky.height, 0, 0 - Texture.Material.Sky.height / 5 + (-player.view), canvas.width, canvas.height / 1.5);

        /*draw image next to first image*/
        ctx.drawImage(Texture.Material.Sky, Texture.Material.Sky.width / 360 * (player.pod - 360), 0, Texture.Material.Sky.width / 4, Texture.Material.Sky.height, 0, 0 - Texture.Material.Sky.height / 5 + (-player.view), canvas.width, canvas.height / 1.5);

        /*draw a ground*/
        ctx.fillStyle = Texture.Material.Ground;
        ctx.fillRect(0, canvas.height / 2 + (-player.view), canvas.width, canvas.height);
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

            /*draw textured wall*/
            ctx.drawImage(ray.texture, Math.round(ray.offset / 50 * ray.texture.width), 0, ray.texture.width / (canvas.width / 2), ray.texture.height, x, canvas.height / 2 - (ray.distance / 2 + player.view), 1, ray.distance);

            /*apply shadow*/
            if (ray.shadow) {
                ctx.globalAlpha = 0.4;
                ctx.fillStyle = "#000";
                ctx.fillRect(x, canvas.height / 2 - (ray.distance / 2 + player.view), 1, ray.distance);
            }
            ctx.globalAlpha = 1.0;
        }
        this.renderFloor();
    }

    renderFloor() {

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

                /*get distance to wall and save z*/
                let distance = getDistance(player.x, player.y, x, y);
                this.wallIndex.push(distance);

                /*scaled wall distance*/
                distance = this.transform / distance;

                /*get texture offset*/
                let offset = (start.x + dx * i) % 50;
                if (x % 50 == 0 || (x + 1) % 50 == 0) {
                    offset = (start.y + dy * i) % 50;
                }

                /*north and east walls*/
                let shadow = false;
                if ((start.x + dx * i) % 50 < (start.y + dy * i) % 50) {
                    /*set shadow*/
                    shadow = true;

                    /*invert texture*/
                    offset = 50 - offset;
                }

                return {distance: distance, offset: offset, texture: texture, shadow: shadow};
            }
        }
    }
}

