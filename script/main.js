let environment = new Environmemt(6, 6);
let minimap = new Minimap(300);
let player = new Player(70, 70, 0);

setTimeout(function() {
    update();
}, 500);

function update(){
    ctx.clearRect(0, 0,canvas.width, canvas.height);
    minimap.render();
}
