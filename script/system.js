/*canvas and contex*/
let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");

/*disable image blur*/
ctx.imageSmoothingEnabled = false;

/*wall and sprite texture sources*/
Texture.Material.Sky.src = "texture/sky.jpg";
Texture.Wall.Stone.Load.src = "texture/wall/stone.jpg";
Texture.Wall.Wood.Load.src = "texture/wall/wood.jpg";
Texture.Wall.Brick.Load.src = "texture/wall/brick.jpg";
Texture.Wall.Cobble.Load.src = "texture/wall/cobble.png";
Texture.Wall.Colorstone.Load.src = "texture/wall/colorstone.png";
Texture.Wall.Purplestone.Load.src = "texture/wall/purplestone.png";
Texture.Wall.Bluestone.Load.src = "texture/wall/bluestone.png";
Texture.Wall.Mossy.Load.src = "texture/wall/mossy.png";
Texture.Sprite.Table.Load.src = "texture/sprite/table.png";
Texture.Sprite.Armor.Load.src = "texture/sprite/armor.png";
Texture.Sprite.Light.Load.src = "texture/sprite/light.png";
Texture.Sprite.Plant.Load.src = "texture/sprite/plant.png";
Texture.Sprite.Barrel.Load.src = "texture/sprite/barrel.png";
Texture.Sprite.Pillar.Load.src = "texture/sprite/pillar.png";

/*last image loaded*/
Texture.Sprite.Pillar.Load.onload = function() {
    update();
}