/*the world*/
let environment = new Environmemt([
    [1, 1, 4, 1, 1, 1, 1, 1, 4, 4, 4],
    [1, 0, 0, 0, 0, 1, 0, 13, 0, 0, 1],
    [2, 0, 0, 0, 0, 7, 0, 12, 0, 0, 6],
    [4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 6],
    [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 2, 6, 0, 0, 0, 4],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4],
    [1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 8],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [1, 0, 0, 0, 0, 0, 9, 9, 0, 0, 4],
    [3, 0, 4, 0, 0, 0, 10, 0, 0, 0, 1],
    [2, 0, 2, 0, 0, 0, 6, 0, 0, 0, 1],
    [1, 1, 2, 3, 11, 11, 6, 7, 8, 1, 1]
]);

/*the minimap*/
let minimap = new Minimap(350);

/*the player*/
let player = new Player(100, 100, 45);

/*future game loop*/
function update() {
    ctx.clearRect(0, 0,canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

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

    /*draw player interface / his ego*/
    player.ego();

    environment.wallIndex = [];
}

/*scale window*/
scaleCanvas();