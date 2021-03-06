
//function preload() {//Load the tilemap file    platform.game.load.tilemap('myGame', 'assets/tmx1.json', null, Phaser.Tilemap.TILED_JSON);//Load the spritesheet for the tilemap    platform.game.load.image('tiles', 'assets/main.png');//Load other assets, the playerplatform.game.load.spritesheet('player', 'assets/sprites/male_hero_1.png', 16, 16, 4);}var map;var layer;function create() {    map = platform.game.add.tilemap('myGame');//'main' is the name of the spritesheet inside of Tiled Map Editor    map.addTilesetImage('main', 'tiles');//'Grass 1' is the name of a layer inside of Tiled Map Editor    layer = map.createLayer('Grass 1');    layer.resizeWorld();//Add playerplatform.game.add.sprite(300, 200, 'player');}function update() {}

var platform = platform || {};

platform.Game = function(){};


platform.Game.prototype = {
  velocity: -300,
  gravity: 1000,
  jumpHeight: 400,
  create: function() {

    if (platform.game.device.desktop === false) {
      // set the scaling mode to SHOW_ALL to show all the platform.game
      platform.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      // set a minimum and maximum size for the platform.game
      // here the minimum is half the platform.game size
      // and the maximum is the original platform.game size
      platform.game.scale.setMinMax(platform.game.width/2, platform.game.height/2, platform.game.width, platform.game.height);

    }

    // center the platform.game horizontally and vertically
    platform.game.scale.pageAlignHorizontally = true;
    platform.game.scale.pageAlignVertically = true;



    platform.game.stage.backgroundColor = '#27d9d3';
    platform.game.physics.startSystem(Phaser.Physics.ARCADE);

    // mymap = platform.game.add.tilemap('jsonFile');
    // mymap.addTilesetImage('buildings');
    // layermain = mymap.createLayer('Tile Layer 1');
    // mymap.setCollisionByExclusion([0], true, 'Tile Layer 1');

    this.player = platform.game.add.sprite(50, 100, 'player');
    this.player.width = 50;
    this.player.height = 50;

    this.score = 0;
    this.labelScore = platform.game.add.text(20, 20, '0', {font: "30px Arial", fill: 'white'});


    platform.game.physics.arcade.enable(this.player);

    this.player.body.gravity.y = this.gravity;
    this.player.anchor.setTo(0.5, 0.5);

    var spaceKey = platform.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var downKey = platform.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    spaceKey.onDown.add(this.jump, this);
    downKey.onDown.add(this.flip, this);

    this.game.world.width = 50000;

    this.ground = this.add.tileSprite(0, this.game.height- 240, this.game.world.width, 50, 'ground');
    this.game.world.bringToTop(this.ground);

    this.game.physics.arcade.enable(this.ground);

    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    this.timer = platform.game.time.events.loop(100, this.addBoxes, this);
    // this.bottomTimer = platform.game.time.events.loop(100, this.addBottomBoxes, this);

    this.boxes = platform.game.add.group();
    this.coins = platform.game.add.group();
    this.increaseTimer = platform.game.time.events.loop(15000, this.increaseVelocity, this);

  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.ground, null, null, this);
     this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
    // platform.game.physics.arcade.overlap(this.player, this.boxes, this.playerHit, null, this);

  },
  playerHit: function() {
   platform.game.time.events.remove(this.timer);
   this.boxes.forEach(function(box) {
     box.body.velocity.x = 0;
   }, this);
   this.restartGame();
  },
  jump: function() {
    var animation = platform.game.add.tween(this.player);

    animation.to({angle: this.player.angle + 180}, 300);

    if (this.player.body.touching.down) {
      this.player.body.velocity.y = -(this.jumpHeight);
      animation.start();
    } else if ( this.player.body.touching.up) {
      this.player.body.velocity.y = this.jumpHeight;
      animation.start();
    }
  },
  flip: function() {
    if ( this.player.body.touching.down ){
      this.player.x = 50;
      this.player.y = 315;
      this.player.body.gravity.y = -(this.gravity);
    } else if ( this.player.body.touching.up ){
      this.player.x = 50;
      this.player.y = 215;
      this.player.body.gravity.y = this.gravity;
    }
  },
  addBox: function(x, y, velocity) {
    var box = platform.game.add.sprite(x, y, 'box');

    this.boxes.add(box);

    platform.game.physics.arcade.enable(box);

    box.body.velocity.x = this.velocity;

    box.checkWorldBounds = true;
    box.outOfBoundsKill = true;
  },
  incrementer: 0,
  increaseVelocity: function() {
    this.velocity -= 100;
    console.log('Velocity', this.velocity);
    this.gravity += 200;
    console.log('Gravity', this.gravity);
    this.jumpHeight += 50;
    console.log('jumpHeight', this.jumpHeight);
  },
  addBoxes: function() {
    this.incrementer++;
    var rand = Math.floor(Math.random() * 10);
    if ( rand > 7 && this.incrementer > 5){
      this.incrementer = 0;
      var randHeight = Math.floor(Math.random() * 3);
      this.addBox(650, this.game.height-this.heights[randHeight], this.velocity);
      if (rand > 8 ){
         switch (this.heights[randHeight]){
           case 130:
             this.addCoin(650, this.game.height-this.heights[randHeight] - 55, this.velocity);
           break;
           case 190:
             this.addCoin(650, this.game.height-this.heights[randHeight] + 75, this.velocity);
           break;
           case 290:
             this.addCoin(650, this.game.height-this.heights[randHeight] - 75, this.velocity);
           break;
           case 350:
             this.addCoin(650, this.game.height-this.heights[randHeight] + 55, this.velocity);
           break;
         }
       }
       //End Add Coint Functionality
    }
  },
  addCoin: function(x, y, velocity){
     var coin = platform.game.add.sprite(x, y, 'coin');
     coin.height = 50;
     coin.width = 50;
     this.coins.add(coin);
     platform.game.physics.arcade.enable(coin);
     coin.body.velocity.x = this.velocity;
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
    platform.game.state.start('main');
  },
};

//

// platform.game.state.add('main', mainState, true);
