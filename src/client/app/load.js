var platform = platform || {};

platform.game = new Phaser.Game(1334, 750, Phaser.AUTO, 'gameArea');

// var game = new Phaser.Game(640, 480, 'gameArea');

var gameWorld = [];
var timer = 0;
var frame = "";
var color = "";
var gameState = { color: "", position: 0 };
var Score = 0;


platform.game.state.add('Preload', platform.Preload);
platform.game.state.add('Menu', platform.Menu);
platform.game.state.add('Game', platform.Game);

platform.game.state.start('Preload');
