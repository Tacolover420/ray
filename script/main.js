let environment = new Environmemt(6, 6);
let minimap = new Minimap(300);
let player = new Player(60, 60, 0);

setTimeout(function() {
    update();
}, 500);

function update(){
    ctx.clearRect(0, 0,canvas.width, canvas.height);
    environment.renderSkyBox();
    minimap.render();
    environment.sprite.forEach(function(value, i) {
        environment.renderSprite(environment.sprite[i]);
    });
}
