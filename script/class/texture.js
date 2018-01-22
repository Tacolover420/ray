let Texture = {
    Wall: {
        Empty: 0,
        Stone: 1,
        Wood: 2,
        Brick: 3,
        Cobble: 4,
        Colorstone: 5,
        Purplestone: 6,
        Bluestone: 7,
        Mossy: 8
    },
    Sprite: {
        Empty: 0,
        Table: 1,
        Armor: 2,
        Light: 3,
        Plant: 4,
        Barrel: 5,
        Pillar: 6
    },
    Color: {
        Default: "#16142e",
        Ground: "#eae0c8"
    }
};

let Load = {
    Sky: new Image(),
    Stone: new Image(),
    Wood: new Image(),
    Brick: new Image(),
    Cobble: new Image(),
    Colorstone: new Image(),
    Purplestone: new Image(),
    Bluestone: new Image(),
    Mossy: new Image(),
    Table: new Image(),
    Armor: new Image(),
    Light: new Image(),
    Plant: new Image(),
    Barrel: new Image(),
    Pillar: new Image()
};

Load.Sky.src = "texture/sky.jpg";
Load.Stone.src = "texture/wall/stone.jpg";
Load.Wood.src = "texture/wall/wood.jpg";
Load.Brick.src = "texture/wall/brick.jpg";
Load.Cobble.src = "texture/wall/cobble.png";
Load.Colorstone.src = "texture/wall/colorstone.png";
Load.Purplestone.src = "texture/wall/purplestone.png";
Load.Bluestone.src = "texture/wall/bluestone.png";
Load.Mossy.src = "texture/wall/mossy.png";
Load.Table.src = "texture/sprite/table.png";
Load.Armor.src = "texture/sprite/armor.png";
Load.Light.src = "texture/sprite/light.png";
Load.Plant.src = "texture/sprite/plant.png";
Load.Barrel.src = "texture/sprite/barrel.png";
Load.Pillar.src = "texture/sprite/pillar.png";

function getWallSource(type) {
    switch (type) {
        case Texture.Wall.Wood:
            return Load.Wood
            break;
        case Texture.Wall.Brick:
            return Load.Brick
            break;
        case Texture.Wall.Cobble:
            return Load.Cobble
            break;
        case Texture.Wall.Colorstone:
            return Load.Colorstone
            break;
        case Texture.Wall.Purplestone:
            return Load.Purplestone
            break;
        case Texture.Wall.Bluestone:
            return Load.Bluestone
            break;
        case Texture.Wall.Mossy:
            return Load.Mossy
            break;
        default:
            return Load.Stone
    }
}
