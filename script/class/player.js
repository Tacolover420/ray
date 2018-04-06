class Player {
    constructor(x, y, pod) {
        this.x = x;
        this.y = y;
        this.pod = pod;
        this.speed = 1;
        this.fov = 90;
        this.fat = 15;
    }

    turn(speed) {
        /*turn around*/
        player.pod += speed;

        /*reset pod*/
        if (this.pod >= 360) {
            this.pod -= 360;
        }
        if (this.pod < 0) {
            this.pod += 360;
        }

        update();
    }

    move(deg) {
        /*new calculated x, y coordinates*/
        this.x += Math.sin((this.pod + deg) * Math.PI / 180) * this.speed;
        this.y -= Math.cos((this.pod + deg) * Math.PI / 180) * this.speed;

        /*if player walks inside a block, walk back*/
        if (this.collide()) {
            this.move(deg + 180);
        }

        update();
    }

    collide() {
        /*block player early*/
        let deviation = this.fat / 2;

        /*how big a block is, to calculate current standing block*/
        let block = environment.block;

        return environment.grid[Math.floor((this.y + deviation) / block)][Math.floor((this.x + deviation) / block)] != Texture.Wall.Empty.Material ||
        environment.grid[Math.floor((this.y - deviation) / block)][Math.floor((this.x - deviation) / block)] != Texture.Wall.Empty.Material ||
        environment.grid[Math.floor((this.y + deviation) / block)][Math.floor((this.x - deviation) / block)] != Texture.Wall.Empty.Material ||
        environment.grid[Math.floor((this.y - deviation) / block)][Math.floor((this.x + deviation) / block)] != Texture.Wall.Empty.Material ||
        environment.grid[Math.floor(this.y / block)][Math.floor(this.x / block)] != Texture.Wall.Empty.Material
    }

    crosshair() {
        ctx.fillRect(canvas.width / 2 - 3, canvas.height / 2 - 30, 3 * 2, 30 * 2);
        ctx.fillRect(canvas.width / 2 - 30, canvas.height / 2 - 3, 30 * 2, 3 * 2);
    }
}
