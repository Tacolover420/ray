class Environmemt {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.block = 50;
        this.transform = 25000;
        this.grid = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ];
        this.sprite = [
            new Sprite(60, 60, Texture.Sprite.Armor),
            new Sprite(240, 240, Texture.Sprite.Pillar),
            new Sprite(60, 240, Texture.Sprite.Plant),
            new Sprite(240, 60, Texture.Sprite.Barrel),
            new Sprite(150, 150, Texture.Sprite.Table)
        ];
    }

    renderSprite(sprite) {
        let cross = {x: sprite.x, y: player.y};
        let dist = {player: getDistance(player.x, player.y, cross.x, cross.y), sprite: getDistance(sprite.x, sprite.y, cross.x, cross.y)};
        let distance = getDistance(player.x, player.y, sprite.x, sprite.y);
        let size = this.transform / distance;
        let pod = player.pod;
        let angle = Math.atan(dist.sprite / dist.player) * 180 / Math.PI;
        let drawx = (-pod + 45 + angle) / player.fov * canvas.width - size / 2;
        if (player.x < sprite.x && player.y > sprite.y) { //1. Quadrant
            angle = Math.asin(dist.sprite / distance) * 180 / Math.PI;
            drawx = (-pod + 45 - angle) / player.fov * canvas.width - size / 2;
        }
        else if (player.x > sprite.x && player.y < sprite.y) { //3. Quadrant
            angle = Math.asin(dist.sprite / distance) * 180 / Math.PI;
            drawx = (-pod + 180 + 45 - angle) / player.fov * canvas.width - size / 2;
        }
        else if (player.x > sprite.x && player.y > sprite.y) { //2. Quadrant
            angle = Math.asin(dist.sprite / distance) * 180 / Math.PI;
            drawx = (-pod + 180 + 45 + angle) / player.fov * canvas.width - size / 2;
        }
        let drawy = canvas.height / 2 - size / 2;
        ctx.drawImage(sprite.source, drawx , drawy, size, size);
    }

    renderSkyBox() {
        if (pod < 0) {
            pod += 360;
        }
        if (pod > 360) {
            pod -= 360;
        }
        ctx.drawImage(Load.Sky, 1920 / 360 * pod, 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);
        if (pod > 270) {
            ctx.drawImage(Load.Sky, 1920 / 360 * (pod - 360), 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);
        }
        ctx.fillStyle = Texture.Color.Ground;
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    }

    renderBlock() {
        let resolution = canvas.width;
        for (let x = 0; x < resolution; x++) { //every 2nd px gets scanned
            let ray = player.pod + (-player.fov / 2 + player.fov / resolution * x);
            let distance = 0, offset = 0;
            let hit = false, shadow = false;
            do {
                let rayx = player.x + distance * Math.cos(ray * (Math.PI / 180));
                let rayy = player.y + distance * Math.sin(ray * (Math.PI / 180));
                if (this.grid[Math.floor(rayx / this.block)][Math.floor(rayy / this.block)] != Texture.Wall.Empty) {
                    distance = Math.sqrt(Math.pow(player.x - rayx, 2) + Math.pow(player.y - rayy, 2));
                    offset = Math.floor(rayx % 64);
                    if (Math.floor(rayx % 64) == 0 || Math.floor((rayx + 1) % 64) == 0) {
                        offset = Math.floor(rayy % 64);
                    }
                    if (rayx % 64 > rayy % 64) {
                        shadow = true;
                    }
                    /*if(x == 0){ //distance for minimap -45
                        distance1 = distance;
                    }
                    if(x == resolution - 1){ //distance for minimap +45
                        distance2 = distance;
                    }*/
                    hit = true;
                }
                distance += 0.5;
                if (distance > 10000) {
                    hit = true;
                }
            } while(!hit);
            distance = Math.floor(this.transform / distance);
            /*if(shadow){
                ctx.fillStyle = "#000";
                ctx.fillRect(x, display.height / 2 - distance / 2, 1, distance); //base coloring for shadow (x pos, center rectangle, width of rectangle (display / resolution = 1), height of rectangle
                ctx.globalAlpha = 0.75; //shadow -> make texture mix with black background -> darker
            }*/
            ctx.drawImage(Load.Stone, offset / 64 * Load.Stone.width, 0, Load.Stone.width / (canvas.width / 2), Load.Stone.height, x, canvas.height / 2 - distance / 2, 1, distance);
            ctx.globalAlpha = 1.0;
            let raydirX = Math.cos(((x / 1600 * 90) * this.pov) * (Math.PI / 180)); //angle to x y pos
            let raydirY = Math.sin(((x / 1600 * 90) * this.pov) * (Math.PI / 180));
        }
    }
}
