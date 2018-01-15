class Sprite {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.source = this.getSource();
    }
    getSource() {
        switch(this.type) {
            case Texture.Sprite.Armor:
                return Load.Armor
                break;
            case Texture.Sprite.Light:
                return Load.Armor
                break;
            case Texture.Sprite.Plant:
                return Load.Armor
                break;
            case Texture.Sprite.Barrel:
                return Load.Armor
                break;
            case Texture.Sprite.Pillar:
                return Load.Armor
                break;
            default:
                return Load.Table
        }
    }
}
