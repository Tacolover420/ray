class Sprite {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.source = this.getSource();
    }

    getSource() {
        switch (this.type) {
            case Texture.Sprite.Armor.Material:
                return Texture.Sprite.Armor.Load;
                break;
            case Texture.Sprite.Light.Material:
                return Texture.Sprite.Light.Load;
                break;
            case Texture.Sprite.Plant.Material:
                return Texture.Sprite.Plant.Load;
                break;
            case Texture.Sprite.Barrel.Material:
                return Texture.Sprite.Barrel.Load;
                break;
            case Texture.Sprite.Pillar.Material:
                return Texture.Sprite.Pillar.Load;
                break;
            default:
                return Texture.Sprite.Table.Load;
        }
    }
}

function getDistance(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}
