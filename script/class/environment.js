class Environmemt {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.block = 50;
        this.transform = 10000;
        this.grid = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ];
        this.sprite = [
            new Sprite(100, 100, Texture.Sprite.Armor),
            new Sprite(100, 200, Texture.Sprite.Table)
        ];
    }
}
