(function(){
  var cover;

  Crafty
    .init()
    .background('gray');

  Crafty.e('Color, 2D, Canvas')
    .color('#505050')
    .attr({w: 20000, h: 20000, x:0, y: 300});

  Crafty.sprite(48, 82, "img/sprite.png", {
    playerR: [0, 0],
    playerL: [1, 0],
    playerWaitingR: [2, 0],
    playerWaitingL: [3, 0],
    playerFlyingR: [4, 0],
    playerFlyingL: [5, 0],
  });

  Crafty.c('Fly', {
    fly: function(){

      this.bind('EnterFrame', function(){
	this.w *=0.997;
	this.h *= 0.997;
	this.y--;
	this.x+= 0.01;
      });
    }
  });

  var player = Crafty.e('2D, Canvas, Keyboard, playerR, SpriteAnimation, Fly')
    .attr({y: 250, x: 200})
    .animate('walk_right', 0, 0, 3)
    .animate('walk_left', 0, 1, 3)
    .animate('waiting_right', 0, 2, 3)
    .animate('waiting_left', 0, 3, 3)
    .animate('fly_right', 0, 4, 1)
    .animate('fly_left', 0, 4, 1)

    .bind('EnterFrame', function(){

      if(!this.playerDisable){

	if(this.isDown('LEFT_ARROW')){
	  this.x -= 2;
	  this.playerDirection = 'left';

	  if(!this.isPlaying('walk_left'))
	    this.animate('walk_left', 10);

	}else if(this.isDown('RIGHT_ARROW')){

	  this.x += 2;
	  this.playerDirection = 'right';

	  if(!this.isPlaying('walk_right'))
	    this.animate('walk_right', 10);

	}else{
	  this.stop();
	}
      }
    })

  player.playerDirection = 'right';

  setTimeout(function foo(){

    player.stop();
    player.playerDisable = true;
    if(player.playerDirection === 'left'){
      player.animate('waiting_left', 100);

    }else{
      player.animate('waiting_right', 100)
    }


    var spot = Crafty.e('2D, DOM, Image, Tween')
      .attr({alpha: 0, x: player.x - 32, y: -30})
      .image('img/spot.png')
      .tween({alpha: 1}, 20)



    setTimeout(function(){

      player.fly();

      if(player.playerDirection === 'left'){
	player.animate('fly_left', 100, -1);

      }else{
	player.animate('fly_right', 100, -1)
      }

      setTimeout(function(){


	cover = Crafty.e('2D, DOM, Color, Tween')
	  .color('#000')
	  .attr({w: 10000, h: 10000, alpha: 0})
	  .tween({alpha: 1}, 50)
	  .bind('TweenEnd', function(){

	    TinyGame.init();
	    Player.init(TinyGame.level);

	    spot.destroy();

	  });

      }, 3500);

    }, 2000);

  }, 5000);

  window.doTheOutro = function(){

    cover.tween({alpha: 0}, 50);

    Crafty.e('2D, Collider')
      .attr({x: player.x, y: 334, w: 20, h: 1})

    Crafty.e('2D, Canvas, playerR, Gravity')
      .attr({x: player.x, y: -80})
      .gravityConst(1.5)
      .gravity('Collider');

    Crafty.e('2D, Text, DOM')
      .attr({x: 100, y: 100, w: 600})
      .text('Congratulations, you survived this tiny pixel madness !')
      .css({
	'font-family': "'Press Start 2P', sans-serif",
	color : 'white'
      });

    player.destroy();
  };

}())
