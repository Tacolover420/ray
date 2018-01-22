class Sprite {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.source = this.getSource();
    }

    getSource() {
        switch (this.type) {
            case Texture.Sprite.Armor:
                return Load.Armor
                break;
            case Texture.Sprite.Light:
                return Load.Light
                break;
            case Texture.Sprite.Plant:
                return Load.Plant
                break;
            case Texture.Sprite.Barrel:
                return Load.Barrel
                break;
            case Texture.Sprite.Pillar:
                return Load.Pillar
                break;
            default:
                return Load.Table
        }
    }
}

function getDistance(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}
