
var Rooms = {

  '4832': {

    update: _.once(function(){

      TinyGame.setMessage('Where am I?');
      TinyGame.setMessage('Everyting is so tiny');
      TinyGame.setMessage('Oh no ...');
      TinyGame.setMessage('... it\'s a tab!');
      TinyGame.setMessage('I need to find a way,');
      TinyGame.setMessage('to get out of here.');
      TinyGame.setMessage('`')



    }),

    draw: function(){}
  },

  '3232':{ // first checkpoint


    update: function(){
      var resetPoint = Player.resetPoint;

      if(resetPoint.value < 1){

	resetPoint.value = 1;
	resetPoint.x = 32;
	resetPoint.y = 32;
      }
    },

    draw: function(){}

  },

  '3216':{ // piston room

    piston1: 0,
    piston2: 0,

    update: function(){

      this.piston1 = Math.abs(Math.sin(TinyGame.frame/50)*12);
      this.piston2 = 12 - this.piston1;

      y = Player.y%16;
      x = Player.x%16;

      if((y >= 3 && y <= 5 && this.piston1+2 > x) || (y >= 9 && y <= 11 && this.piston2+2 > x)){

	Player.reset();
      }
    },

    draw: function(ctx){

      ctx.save()
      ctx.translate(TinyGame.viewport.x, TinyGame.viewport.y)
      ctx.fillStyle = 'red';
      ctx.fillRect(2, 4, this.piston1, 2);
      ctx.fillRect(2, 10, this.piston2, 2);
      ctx.restore();
    }
  },

  '320': { // 2nd checkpoint

    update: function(){
      var resetPoint = Player.resetPoint;

      if(resetPoint.value < 2){

	resetPoint.value = 2;
	resetPoint.x = 32;
	resetPoint.y = 0;
      }
    },

    draw: function(){}
  },


  '160': { // lava

    platform: 3,

    tip: _.once(function(){

      TinyGame.setMessage('Don\'t want to take')
      TinyGame.setMessage('another dip in the lava')
      TinyGame.setMessage('`');

    }),

    update: function(){
      var old, speed,
      save = false,
      x = Player.x%16,
      y = Player.y%16;

      old = this.platform;
      this.platform = Math.round(7 + (Math.sin(TinyGame.frame/70)*3));

      speed = this.platform - old;

      if((old == x || old == x-1 || old == x+1) && y == 7){

	save = true;
	Player.x += speed;
      }

      if(!save && x > 2 && x < 12){
	Player.reset();

	this.tip();
      }
    },

    draw: function(ctx){

      ctx.save()
      ctx.translate(TinyGame.viewport.x, TinyGame.viewport.y);
      ctx.fillStyle = 'red';
      ctx.fillRect(4, 2, 8, 12);
      ctx.clearRect(this.platform, 7, 2, 2);
      ctx.restore();
    }
  },

  '00': { // third checkpoint

    update: function(){
      var resetPoint = Player.resetPoint;

      if(resetPoint.value < 3){

	resetPoint.value = 3;
	resetPoint.x = 0;
	resetPoint.y = 0;
      }
    },

    draw: function(){}

  },

  '016': { // bridge

    bridge: false,

    update: function(){

      var x = Player.x%16,
      y = Player.y%16;

      if(x === 3 && y === 3){

	this.bridge = true;
      }

      else if((!this.bridge && y >= 5 && y <= 9) ||
	      (this.bridge && y >= 5 && y <= 9 && (x < 6 || x > 8))){

	Player.reset();
      }

    },

    draw: function(ctx){

      ctx.save()
      ctx.translate(TinyGame.viewport.x, TinyGame.viewport.y);
      ctx.fillStyle =  'red';
      ctx.fillRect(2, 6, 12, 4);
      ctx.fillStyle = this.bridge ? 'yellow':'blue';
      ctx.fillRect(3, 3, 1, 1);
      this.bridge && ctx.clearRect(6, 6, 4, 4);

      ctx.restore();
    }
  },

  '032': { // 4. checkpoint

    update: function(){
      var resetPoint = Player.resetPoint;

      if(resetPoint.value < 4){

	resetPoint.value = 4;
	resetPoint.x = 0;
	resetPoint.y = 32;
      }
    },

    draw: function(){}
  },

  '048': { //

    speed: [60, 60, 60, 60, 60, 60],
    position: [],
    move: [true, true, true, true, true, true],

    update: function(){
      var i, l,
      save = false,
      speed = this.speed,
      position = this.position,
      move = this.move,
      x = Player.x%16,
      y = Player.y%16;

      for(i = 0; i < 6; i++){

	if(move[i]){
	  position[i]  = i%2 ?
	    Math.round(Math.sin(TinyGame.frame/speed[i])*4+6)
	    : Math.round(Math.cos(TinyGame.frame/speed[i])*4+6);
	}

	if(((position[i] === x) || (x-1 === position[i])) && ((i*2+2) === y || (i*2+1) === y)){
	  move[i] = false;
	  save = true;
	}

      }

      if(!save && y > 0 && y < 12){


	this.move = [true, true, true, true, true, true];
	Player.reset();
      }
    },

    draw: function(ctx){
      var i, l
      position = this.position;

      ctx.save()
      ctx.translate(TinyGame.viewport.x, TinyGame.viewport.y);
      ctx.fillStyle = 'red';
      ctx.fillRect(2, 2, 12, 12);


      for(i = 0; i < 6; i++){

	ctx.clearRect(position[i], 2+i*2, 3, 2);
      }

      ctx.restore();
    }


  }
};
