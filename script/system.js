/*canvas and contex*/
let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");

/*disable image blur*/
ctx.imageSmoothingEnabled = false;

Texture.Material.Sky.src = "texture/sky0.jpg";

/*wall texture sources*/
Texture.Wall.Stone.Load.src = "texture/wall/stone.jpg";
Texture.Wall.Wood.Load.src = "texture/wall/wood.jpg";
Texture.Wall.Brick.Load.src = "texture/wall/brick.jpg";
Texture.Wall.Cobble.Load.src = "texture/wall/cobble.png";
Texture.Wall.Colorstone.Load.src = "texture/wall/colorstone.png";
Texture.Wall.Purplestone.Load.src = "texture/wall/purplestone.png";
Texture.Wall.Bluestone.Load.src = "texture/wall/bluestone.png";
Texture.Wall.Mossy.Load.src = "texture/wall/mossy.png";
Texture.Wall.Castle.Load.src = "texture/wall/castle.jpg";
Texture.Wall.Wall.Load.src = "texture/wall/wall.jpg";
Texture.Wall.Whitestone.Load.src = "texture/wall/whitestone.jpg";
Texture.Wall.Swastika.Load.src = "texture/wall/swastika.png";
Texture.Wall.Diamond.Load.src = "texture/wall/diamond.png";

/*sprite texture sources*/
Texture.Sprite.Table.Load.src = "texture/sprite/table.png";
Texture.Sprite.Armor.Load.src = "texture/sprite/armor.png";
Texture.Sprite.Light.Load.src = "texture/sprite/light.png";
Texture.Sprite.Plant.Load.src = "texture/sprite/plant.png";
Texture.Sprite.Barrel.Load.src = "texture/sprite/barrel.png";
Texture.Sprite.Pillar.Load.src = "texture/sprite/pillar.png";

/*ego texture sources*/
Texture.Ego.Ak.Load.src = "texture/ego/ak.png";
Texture.Ego.M4a1.Load.src = "texture/ego/m4a1.png";

/*load sky texture*/
Texture.Material.Sky.onload = function() {
    update();
    console.log("Skybox loaded!");
};

/*load textures*/
let load = [Texture.Wall, Texture.Sprite, Texture.Ego];
for (let i = 0; i < load.length; i++) {
    let text = load[i];
    for (let key in text) {
        if (text.hasOwnProperty(key)) {
            text[key].Load.onload = function() {
                update();
                console.log(key + " loaded!");
            }
        }
    }
}