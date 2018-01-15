let environment = new Environmemt(6, 6);
let minimap = new Minimap(300);
let player = new Player(70, 70, 10);

setTimeout(function() {
    update();
}, 500);

function update(){
    ctx.clearRect(0, 0,canvas.width, canvas.height);
    minimap.render();
}

let swag = insidefov({
    x1: player.x,
    y1: player.y,
    x2: player.x + 20 * Math.cos(player.pod * Math.PI / 180),
    y2: player.y + 20 * Math.sin(player.pod * Math.PI / 180)
}, {
    x1: player.x,
    y1: player.y,
    x2: environment.sprite[0].x,
    y2: environment.sprite[0].y
});

let skudistance = Math.sqrt(Math.pow(player.x - environment.sprite[0].x, 2) +Math.pow(player.y - environment.sprite[0].y, 2));
console.log(skudistance);

let disttemp = environment.transform /  skudistance;
console.log(disttemp);