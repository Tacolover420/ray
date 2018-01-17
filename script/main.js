let environment = new Environmemt(6, 6);
let minimap = new Minimap(200);
let player = new Player(100, 100, 0);

setTimeout(function() {
    update();
}, 500);

function update() {
    ctx.clearRect(0, 0,canvas.width, canvas.height);
    environment.renderSkyBox();
    environment.renderBlock();
    minimap.render();
    environment.sprite.forEach(function(value, i) {
        minimap.renderSprite(environment.sprite[i]);
        environment.renderSprite(environment.sprite[i]);
    });
}
