var Player = {
  resetPoint: {
    value: 0,
    x: 57,
    y: 41
  },
  x: 57,
  y: 41,
  enabled: true,
  levelMap: document.getElementById('levelmap'),

  init: function(level){

    var ctx = this.levelMap.getContext('2d');
    ctx.drawImage(level, 0,0);

    addEventListener('keydown', _.bind(function(e){
      var colors, pixel,
      x = this.x;
      y = this.y;
      isTransparent = function(p){
	return (!p[3] && !p[7]);
      };

      if(this.enabled){

	switch(e.keyCode){
	case 37: // left

	  if(isTransparent(ctx.getImageData(x-1, y, 1, 2).data)){
	    this.x--;
	  }
	  break;
	case 39: // right

	  if(isTransparent(ctx.getImageData(x+2, y, 1, 2).data)){
	    this.x++;
	  }
	  break;
	case 38: // up
	  if(isTransparent(ctx.getImageData(x, y-1, 2, 1).data)){
	    this.y--;
	  }
	  break;
	case 40: // down

	  if(isTransparent(ctx.getImageData(x, y+2, 2, 1).data)){
	    this.y++;
	  }
	  break;
	}
      }

    }, this), false);
  },

  reset: function(){

    this.x = this.resetPoint.x + 9;
    this.y = this.resetPoint.y + 9;
  },

  render: function(ctx){

    if(!this.invisible){

      ctx.save();
      ctx.fillStyle = '#7fd700';
      ctx.fillRect(this.x, this.y, 2, 2);
      ctx.restore();

    }
  }
};
