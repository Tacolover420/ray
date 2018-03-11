let environment = new Environmemt([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]);
let minimap = new Minimap(250);
let player = new Player(100, 100, 45);

/*future game loop*/
function update() {
    ctx.clearRect(0, 0,canvas.width, canvas.height);

    /*draw pseudo 3d*/
    environment.renderSky();
    environment.renderBlock();

    /*draw minimap*/
    minimap.renderBlock();
    minimap.renderPlayer();

    /*sort sprite array*/
    let sort = [];
    for (let i = 0; i < environment.sprite.length; i++) {
        sort[i] = {distance: getDistance(player.x, player.y, environment.sprite[i].x, environment.sprite[i].y), sprite: environment.sprite[i]};
    }
    sort.sort(compareDistance);

    /*render sprites 3d and minimap*/
    for (let i = 0; i < environment.sprite.length; i++) {
        minimap.renderSprite(environment.sprite[i]);
        environment.renderSprite(sort[i].sprite);
    }
}
