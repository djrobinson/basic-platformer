var platform = platform || {};

platform.Preload = function() {};

platform.Preload.prototype = {
    preload: function() {
        this.load.image('ground', 'app/assets/gray.png');
        this.load.image('box', 'app/assets/RTS_Crate.png');
        this.load.image('coin', 'app/assets/coin_01.png');
        this.load.image('menu', 'app/assets/lazy_menu.png');
        this.load.spritesheet('hero', 'app/assets/Run.png', 33.6, 50, 8);
        this.load.image('jump-button', 'app/assets/jump-Button.png');
        this.load.image('flip-button', 'app/assets/flip-Button.png');
        this.load.image('background', 'app/assets/pirate.jpg');
        this.load.image('game-over', 'app/assets/game_over.jpg');
      },
    create: function() {
        this.state.start('Menu');
    }
};


// 67 by 100 high
