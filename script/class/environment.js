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
            new Sprite(100, 100, Texture.Sprite.Table),
            new Sprite(60, 200, Texture.Sprite.Table),
            new Sprite(200, 60, Texture.Sprite.Table)
        ];
    }

    renderSprite(sprite) {
        let cross = {x: sprite.x, y: player.y};
        let dist = {player: getDistance(player.x, player.y, cross.x, cross.y), sprite: getDistance(sprite.x, sprite.y, cross.x, cross.y)};
        let angle = Math.atan(dist.sprite / dist.player) * 180 / Math.PI;
        let distance = getDistance(player.x, player.y, sprite.x, sprite.y);
        let size = this.transform / distance;
        let pod = player.pod;
        if (pod > 180) {
            pod -= 360;
        }
        let drawx = (-pod + 45 + angle) / player.fov * canvas.width - size / 2;
        let drawy = canvas.height / 2 - size / 2;
        ctx.drawImage(sprite.source, drawx , drawy, size, size);
    }

    renderSkyBox() {
        ctx.drawImage(Load.Sky, 1920 / 360 * player.pod, 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);
        if(player.pod > 270){
            ctx.drawImage(Load.Sky, 1920 / 360 * (player.pod - 360), 0, 1920 / 4, 1080, 0, 0, canvas.width, canvas.height / 1.5);
        }
        ctx.fillStyle = Texture.Color.Ground;
        ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    }

    renderBlock() {
        let resolution = canvas.width;
        for(let x = 0; x < resolution; x++){ //every 2nd px gets scanned
            let ray = player.pod + (-player.fov / 2 + player.fov / resolution * x);
            let distance = 0, offset = 0;
            let hit = false, shadow = false;
            do{
                let rayx = player.x + distance * Math.cos(ray * (Math.PI / 180));
                let rayy = player.y + distance * Math.sin(ray * (Math.PI / 180));
                if(this.grid[Math.floor(rayx / this.block)][Math.floor(rayy / this.block)] != Texture.Wall.Empty){
                    distance = Math.sqrt(Math.pow(player.x - rayx, 2) + Math.pow(player.y - rayy, 2));
                    offset = Math.floor(rayx % 64);
                    if(Math.floor(rayx % 64) == 0 || Math.floor((rayx + 1) % 64) == 0){
                        offset = Math.floor(rayy % 64);
                    }
                    if(rayx % 64 > rayy % 64){
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
            }while(!hit);
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
