let environment = new Environmemt([
    [1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
    [1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1],
    [3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 2, 3, 4, 5, 6, 7, 8, 1, 1]
]);
let minimap = new Minimap(350);
let player = new Player(100, 100, 45);

/*future game loop*/
function update() {
    ctx.clearRect(0, 0,canvas.width, canvas.height);

    /*draw pseudo 3d*/
    environment.render();

    /*draw minimap*/
    //minimap.renderMap();
    minimap.renderMinimap();

    /*sort sprite array*/
    let sort = [];
    for (let i = 0; i < environment.sprite.length; i++) {
        sort[i] = {distance: getDistance(player.x, player.y, environment.sprite[i].x, environment.sprite[i].y), sprite: environment.sprite[i]};
    }
    sort.sort(compareDistance);

    /*render sprites 3d and minimap*/
    for (let i = 0; i < environment.sprite.length; i++) {
        minimap.renderSpriteMinimap(environment.sprite[i]);
        environment.renderSprite(sort[i].sprite);
    }

    /*draw crosshair*/
    player.crosshair();

    environment.wallIndex = [];
}
