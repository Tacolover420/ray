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

function insidefov(line1, line2) {
    let  angle1 = Math.atan2(line1.y1 - line1.y2, line1.x1 - line1.x2);
    let  angle2 = Math.atan2(line2.y1 - line2.y2, line2.x1 - line2.x2);
    let angle =  (angle1 - angle2) * 180 / Math.PI;
    if (angle <= 45 && angle >= - 45) {
        return true;
    }
    else {
        return false;
    }
}
