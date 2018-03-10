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
        if (this.pod >= 360) {
            this.pod -= 360;
        }
        if (this.pod < 0) {
            this.pod += 360;
        }
        player.pod += speed;
        update();
    }

    move(deg) {
        /*block player early*/
        let deviation = this.fat / 2;

        /*how big a block is, to calculate current standing block*/
        let block = environment.block

        /*new calculated x, y coordinates*/
        this.x += Math.sin((this.pod + deg) * Math.PI / 180) * this.speed;
        this.y -= Math.cos((this.pod + deg) * Math.PI / 180) * this.speed;

        /*if player walks inside a block, walk back*/
        if (environment.grid[Math.floor((this.y + deviation) / block)][Math.floor((this.x + deviation) / block)] != Texture.Wall.Empty.Material ||
            environment.grid[Math.floor((this.y - deviation) / block)][Math.floor((this.x - deviation) / block)] != Texture.Wall.Empty.Material ||
            environment.grid[Math.floor((this.y + deviation) / block)][Math.floor((this.x - deviation) / block)] != Texture.Wall.Empty.Material ||
            environment.grid[Math.floor((this.y - deviation) / block)][Math.floor((this.x + deviation) / block)] != Texture.Wall.Empty.Material ||
            environment.grid[Math.floor(this.y / block)][Math.floor(this.x / block)] != Texture.Wall.Empty.Material) {
            this.move(deg + 180);
        }
        update();
    }
}
