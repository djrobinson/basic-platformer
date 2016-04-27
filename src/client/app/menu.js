var platform = platform || {};

platform.Menu = function() {};

platform.Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#707070';
        this.game.add.text(220,50, 'Welcome to ze Game!!!', {font:'20px Arial', fill: '#fff'});

        this.game.add.button(200,256, 'box', this.startGame, this, 2, 1, 0);
        this.game.add.button(384,256, 'box', this.startGame, this, 2, 1, 0);
        this.game.debug.pointer(this.game.input.pointer1);
        this.game.debug.pointer(this.game.input.pointer2);

    },
    update: function() {

    },
    startGame: function() {
        console.log("Click registered");
        platform.game.state.start('Game');
    }
};