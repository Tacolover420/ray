class Player {
    constructor(x, y, pod) {
        this.x = x;
        this.y = y;
        this.pod = pod;
        this.speed = 1;
        this.fov = 90;
        this.fat = 15;
        this.view = 0;
        this.gun = {x: 50, y: 50, xmove: 2, ymove: 4};
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

        this.moveGun(speed / 2, 0);

        update();
    }

    look(speed) {
        /*look around*/
        player.view += speed;

        /*lower view*/
        if (this.view > 150) {
            this.view = 150;
        }

        /*upper view*/
        if (this.view < -100) {
            this.view = -100;
        }

        this.moveGun(0, speed / 2);

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

        this.moveGun(this.gun.xmove, this.gun.ymove);

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
        /*draw a crosshair*/
        ctx.fillStyle = "#000";
        ctx.fillRect(canvas.width / 2 - 3, canvas.height / 2 - 30, 3 * 2, 30 * 2);
        ctx.fillRect(canvas.width / 2 - 30, canvas.height / 2 - 3, 30 * 2, 3 * 2);
    }

    ego() {
        this.crosshair();

        /*draw ego gun*/
        let texture = Texture.Ego.Ak.Load;
        let offset = 20;
        ctx.drawImage(texture, (canvas.width / 2 + canvas.width / 100 * offset) - texture.width / 2 + this.gun.x, canvas.height - texture.height + this.gun.y, texture.width, texture.height);
    }

    moveGun(x, y) {
        /*add movement trough breathing!*/

        /*move gun while walking*/
        this.gun.x += x;
        this.gun.y += y;

        /*check x*/
        if (this.gun.x < 0) {
            this.gun.x = 0;
            this.gun.xmove *= -1;
        }
        else if (this.gun.x > 120) {
            this.gun.x = 120;
            this.gun.xmove *= -1;
        }

        /*check y*/
        if (this.gun.y < 0) {
            this.gun.y = 0;
            this.gun.ymove *= -1;
        }
        else if (this.gun.y > 150) {
            this.gun.y = 150;
            this.gun.ymove *= -1;
        }
    }
}
