class Player {
    constructor(x, y, pod) {
        this.x = x;
        this.y = y;
        this.pod = pod;
        this.speed = 1;
        this.fov = 90;
        this.fat = 15;
    }
    move(deg) {
        let deviation = this.fat / 2;
        let block = environment.block;

        this.x += Math.sin((this.pod + deg) * Math.PI / 180) * this.speed;
        this.y -= Math.cos((this.pod + deg) * Math.PI / 180) * this.speed;

        if(environment.grid[Math.floor((this.y + deviation) / block)][Math.floor((this.x + deviation) / block)] != Texture.Wall.Empty ||
            environment.grid[Math.floor((this.y - deviation) / block)][Math.floor((this.x - deviation) / block)] != Texture.Wall.Empty ||
            environment.grid[Math.floor((this.y + deviation) / block)][Math.floor((this.x - deviation) / block)] != Texture.Wall.Empty ||
            environment.grid[Math.floor((this.y - deviation) / block)][Math.floor((this.x + deviation) / block)] != Texture.Wall.Empty ||
            environment.grid[Math.floor(this.y/ block)][Math.floor(this.x / block)] != Texture.Wall.Empty) {
            this.move(deg + 180);
        }
        update();
    }
}
