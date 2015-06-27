'use strict';


var TinyGame = {
	
	messages: [],
	queued: false,
	
	
	viewport: {
		x: 48,
		y: 32,
		xTween: 0,
		yTween: 0,
		tweenSpeed: 0.5
	},
	
	delegateOutro: _.once(function(){
				
				Player.invisible = true;
				doTheOutro();
				
	}),
	
	canvas: document.getElementById('canvas'),
	level: document.getElementById('level'),
	icon: document.getElementById('icon'),
	frame: 0,
	
	init: function(canvas, icon, level){	
		this.ctx = this.canvas.getContext('2d');	
		this.render();
		
	},
	
	refresh: function(url){
		

		    $('link[rel$=icon]').replaceWith('');
		    $('<link rel="shortcut icon" type="image/x-icon"/>')
		      .appendTo('head')
		      .attr('href', url || this.canvas.toDataURL());
		  

	},
	
	setMessage: function(s){
		var interval, c, i=0;
		
		if(!this.queued){
			
			this.queued = true;
			
			interval = setInterval(_.bind(function(){
				
				
				
				document.title = s.slice(0, i++);
				
				if(i > s.length){
					
					clearInterval(interval);

					setTimeout(_.bind(function(){
					
						this.queued = false;
						
						if(this.messages.length){
							
							this.setMessage(this.messages.shift());	
						}
						
					}, this), 1000);
					
				}
				
				
			}, this), 150);
			
			
			
			
		}else{
			
			this.messages.push(s);
		}
		
	},
	
	render: function(){
		var room, xTween, yTween,
		ctx = this.ctx,
		viewport = this.viewport,
		tweenSpeed = viewport.tweenSpeed;
		
		if(viewport.y <= 48){
		
			if((xTween = viewport.xTween) !== 0){
				
				if(xTween > 0){
					
					viewport.x -= tweenSpeed;
					viewport.xTween -= tweenSpeed;
				}else{
					
					viewport.x += tweenSpeed;
					viewport.xTween += tweenSpeed;
				}
				
			}else if((yTween = viewport.yTween) !== 0){
				
				if(yTween > 0){
					
					viewport.y -= tweenSpeed;
					viewport.yTween -= tweenSpeed;
					
				}else{
					
					viewport.y += tweenSpeed;
					viewport.yTween += tweenSpeed;
				}
				
			}else {
				
				Player.enabled = true;
				
				if(Player.x <= viewport.x-1){
					viewport.xTween = 16;
					Player.enabled = false;
					Player.x-=2;
				}else if(Player.y <= viewport.y-1){
					viewport.yTween = 16;
					Player.enabled = false;
					Player.y-=2;
				} else if(Player.y >= viewport.y+15) {
					viewport.yTween = -16;
					Player.enabled = false;
					Player.y+=1;
				} else if(Player.x >= viewport.x+15){
					viewport.xTween = -16;
					Player.enabled = false;
					Player.x+=1;
				}
			}
		
		} else {
			
			this.delegateOutro();
		}
		
		ctx.clearRect(0,0,16,16);
		ctx.save();
		ctx.translate(-viewport.x, -viewport.y);
		ctx.drawImage(this.level, 0, 0);
		
		if(room = Rooms[viewport.x+''+viewport.y]){

			room.draw(ctx);
			room.update();
		}
		
		Player.render(ctx);
		ctx.restore();
		this.refresh();
		this.frame++;
		
		setTimeout(_.bind(this.render, this), 1000/60)
	}
}
	

