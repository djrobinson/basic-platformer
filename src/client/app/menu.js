var platform = platform || {};

platform.Menu = function() {};

platform.Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#707070';
        this.game.add.text(220,50, 'Welcome to ze Game!!!', {font:'20px Arial', fill: '#fff'});

        button = this.game.add.button(200,256, 'box', this.startGame, this, 2, 1, 0);
        var frame3 = this.game.add.sprite(384, 256, 'box');
        frame3.scale.setTo(1.25, 1.25);
    },
    update: function() {

    },
    startGame: function() {
        console.log("Click registered");
        platform.game.state.start('Game');
    }
};