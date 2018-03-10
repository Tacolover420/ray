class Sprite {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.source = this.getSource();
    }

    getSource() {
        /*returns sprite image to render it*/
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
