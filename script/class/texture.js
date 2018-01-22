let Texture = {
    Wall: {
        Empty: { Material: 0, Load: new Image() },
        Stone: { Material: 1, Load: new Image() },
        Wood: { Material: 2, Load: new Image() },
        Brick: { Material: 3, Load: new Image() },
        Cobble: { Material: 4, Load: new Image() },
        Colorstone: { Material: 5, Load: new Image() },
        Purplestone: { Material: 6, Load: new Image() },
        Bluestone: { Material: 7, Load: new Image() },
        Mossy: { Material: 8, Load: new Image() }
    },
    Sprite: {
        Empty: { Material: 0, Load: new Image() },
        Table: { Material: 1, Load: new Image() },
        Armor: { Material: 2, Load: new Image() },
        Light: { Material: 3, Load: new Image() },
        Plant: { Material: 4, Load: new Image() },
        Barrel: { Material: 5, Load: new Image() },
        Pillar: { Material: 6, Load: new Image() }
    },
    Material: {
        Default: "#16142e",
        Ground: "#eae0c8",
        Sky: new Image()
    }
};

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

function getWallSource(type) {
    switch (type) {
        case Texture.Wall.Wood.Material:
            return Texture.Wall.Wood.Load;
            break;
        case Texture.Wall.Brick.Material:
            return Texture.Wall.Brick.Load;
            break;
        case Texture.Wall.Cobble.Material:
            return Texture.Wall.Cobble.Load;
            break;
        case Texture.Wall.Colorstone.Material:
            return Texture.Wall.Colorstone.Load;
            break;
        case Texture.Wall.Purplestone.Material:
            return Texture.Wall.Purplestone.Load;
            break;
        case Texture.Wall.Bluestone.Material:
            return Texture.Wall.Bluestone.Load;
            break;
        case Texture.Wall.Mossy.Material:
            return Texture.Wall.Mossy.Load;
            break;
        default:
            return Texture.Wall.Stone.Load;
    }
}
