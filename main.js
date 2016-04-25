

var mainState = {
  preload: function() {
    game.load.image('player', 'assets/bird.png');
    game.load.image('ground', 'assets/pipe.png');
    game.load.image('box', 'assets/pipe.png');
    game.load.image('coin', 'assets/coin_01.png');
  },
  create: function() {

    if (game.device.desktop === false) {
      // set the scaling mode to SHOW_ALL to show all the game
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      // set a minimum and maximum size for the game
      // here the minimum is half the game size
      // and the maximum is the original game size
      game.scale.setMinMax(game.width/2, game.height/2, game.width, game.height);

    }

    // center the game horizontally and vertically
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;



    game.stage.backgroundColor = '#27d9d3';
    game.physics.startSystem(Phaser.Physics.ARCADE);


    this.player = game.add.sprite(50, 100, 'player');
    this.player.width = 50;
    this.player.height = 50;

    this.score = 0;
    this.labelScore = game.add.text(20, 20, '0', {font: "30px Arial", fill: 'white'})


    game.physics.arcade.enable(this.player);

    this.player.body.gravity.y = 800;
    this.player.anchor.setTo(0.5, 0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    spaceKey.onDown.add(this.jump, this);
    downKey.onDown.add(this.flip, this);

    this.game.world.width = 50000;

      this.ground = this.add.tileSprite(0, this.game.height- 240, this.game.world.width, 50, 'ground');
    this.game.world.bringToTop(this.ground);

    this.game.physics.arcade.enable(this.ground);

    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    this.timer = game.time.events.loop(100, this.addBoxes, this);
    // this.bottomTimer = game.time.events.loop(100, this.addBottomBoxes, this);

    this.boxes = game.add.group();
    this.coins = game.add.group();

  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.ground, null, null, this);
    this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
    // game.physics.arcade.overlap(this.player, this.boxes, this.playerHit, null, this);

  },
  playerHit: function() {
   game.time.events.remove(this.timer);
   this.boxes.forEach(function(box) {
     box.body.velocity.x = 0;
   }, this);
   this.restartGame();
  },
  jump: function() {
    var animation = game.add.tween(this.player);

    animation.to({angle: this.player.angle + 180}, 300);

    if (this.player.body.touching.down) {
      this.player.body.velocity.y = -500;
      animation.start();
    } else if ( this.player.body.touching.up) {
      this.player.body.velocity.y = 400;
      animation.start();
    }
  },
  flip: function() {
    if ( this.player.body.touching.down ){
      this.player.x = 50;
      this.player.y = 315;
      this.player.body.gravity.y = -800;
    } else if ( this.player.body.touching.up ){
      this.player.x = 50;
      this.player.y = 215;
      this.player.body.gravity.y = 800;
    }
  },
  addBox: function(x, y) {
    var box = game.add.sprite(x, y, 'box');

    this.boxes.add(box);

    game.physics.arcade.enable(box);

    box.body.velocity.x = -200;

    box.checkWorldBounds = true;
    box.outOfBoundsKill = true;
  },
  incrementer: 0,
  addBoxes: function() {
    this.incrementer++;
    var rand = Math.floor(Math.random() * 10);
    if ( rand > 7 && this.incrementer > 5){
      this.incrementer = 0;
      var randHeight = Math.floor(Math.random() * 3)
      this.addBox(650, this.game.height-this.heights[randHeight]);

      //Add Coin Functionality
      if (rand > 8 ){
        switch (this.heights[randHeight]){
          case 130:
            this.addCoin(650, this.game.height-this.heights[randHeight] - 55);
          break;
          case 190:
            this.addCoin(650, this.game.height-this.heights[randHeight] + 75);
          break;
          case 290:
            this.addCoin(650, this.game.height-this.heights[randHeight] - 75);
          break;
          case 350:
            this.addCoin(650, this.game.height-this.heights[randHeight] + 55);
          break;
        }
      }
      //End Add Coint Functionality
    }
  },
  addCoin: function(x, y){
    var coin = game.add.sprite(x, y, 'coin');
    coin.height = 50;
    coin.width = 50;
    this.coins.add(coin);
    game.physics.arcade.enable(coin);
    coin.body.velocity.x = -200;
    coin.checkWorldBounds = true;
    coin.outOfBoundsKill = true;
  },
  collectCoin: function(){
    //Below is the function to destroy the coin.
    this.coins.getFirstAlive().destroy();
    this.score += 1;
    this.labelScore.text = this.score;
    console.log("Get Money!");
  },
  heights: [290, 190, 350, 130],
  restartGame: function() {
    game.state.start('main');
  },
};

var game = new Phaser.Game(640, 480, 'gameArea');

game.state.add('main', mainState, true);
