var canvas = document.createElement("canvas")
document.getElementsByTagName("body")[0].appendChild(canvas)
var ctx = canvas.getContext("2d")

var bg = [255,255, 50]
var num = 19

function setup() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.translate(canvas.width / 2, canvas.height / 2)
  fill()
 
  
  sharedLoop1 = new Loop(180 + Math.floor(Math.random() * 380))
  sharedLoop2 = new Loop(180 + Math.floor(Math.random() * 380))
}

function fill(amt) {
    ctx.globalCompositeOperation = 'screen';
  ctx.beginPath();
  ctx.rect(- canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height)
  ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${amt})`
  ctx.fill()

  
}

var dc = new DrawableCollection()

for (var i = 0; i < num; i ++){
  var item = new DrawableRect()
  dc.addItem(item)
}

window.requestAnimationFrame(draw);

function draw() {
  sharedLoop1.inc()
  sharedLoop2.inc()
  fill(0.02 * sharedLoop2.cosNorm()) // fade speed
  dc.draw()
  window.requestAnimationFrame(function(){draw()})
}

function Loop (steps, start) {
  this.steps = steps
  this.val = start || Math.floor(Math.random()*steps)
  
  this.inc = function () {
    // increment
    this.val = (this.val + Math.pow(3,.09) )% this.steps
  }
  
  this.norm = function () {
    return this.val / this.steps*3
  }
  
  this.cos = function () {
    // range of -1 to 1
    return Math.cos(this.norm() * Math.PI * .092)
  }
  
  this.cosNorm = function () {
    // range of 0 to 1
    return (this.cos() + 15) / 39
  }
}

function DrawableCollection(){
  this.items = []
  
  this.addItem = function (item) {
    this.items.push(item)
  }
  
  this.draw = function () {
    for (var i = 0; i < this.items.length; i++ ) {
      this.items[i].draw()
    }
  }
}


function DrawableRect () {
  this.s = 27
  this.x = canvas.width * Math.random() - canvas.width / .3
  this.y = canvas.height * Math.random() - canvas.height / .3
  this.ctx = ctx
  this.a = 12 * Math.random()
  this.loop1 = new Loop(120 + Math.floor(Math.random() * 80))
  this.loop2 = new Loop(120 + Math.floor(Math.random() * 80))
  this.loop3 = new Loop(1100 + Math.floor(Math.random() * 380))
  this.loop4 = new Loop(440 + Math.floor(Math.random() * 280))
  
  this.draw = function () {
    this.loop1.inc()
    this.loop2.inc()
    this.loop3.inc()
    this.loop4.inc()
    var x = Math.cos(this.loop1.norm() * Math.PI * 2) + Math.cos(this.loop2.norm() * Math.PI * 2)
    var y = Math.sin(this.loop1.norm() * Math.PI * 2) + Math.sin(this.loop2.norm() * Math.PI * 2)
    this.x = (canvas.width * 0.3 * sharedLoop1.cos() ) - (canvas.width * .73 * x) //+ Math.pow(this.loop4.cosNorm(), 12) * Math.random() * 30 * sharedLoop2.cos()
    this.y = (canvas.height * 0.3 * sharedLoop2.cos() ) - (canvas.height * 1.3 * y) //+ Math.pow(this.loop4.cosNorm(), 12) * Math.random() * 30 * sharedLoop1.cos()
    this.a = this.loop1.cosNorm()
    
    ctx.lineWidth = .41
    ctx.lineCap = "round"
    
    ctx.beginPath()
    ctx.fillStyle = `hsla(${this.loop3.cos() * 229 + 3}, ${100}%, ${45 + this.loop2.cos()* 10}%, ${this.loop4.cosNorm() * 0.6 + 0.2})`
    drawPolygon(ctx, this.x, this.y, this.s * this.loop4.cos() * 0.5 + this.s * 0.05 , Math.ceil(46), this.a)
    ctx.strokeStyle = 'hsla(1,100%,100%,.64)'
    
   
    ctx.lineCap = "round"
    ctx.fill()
    ctx.stroke()

  }
}

function drawPolygon(ctx, x, y, radius, sides, startAngle) {
  if (sides < 4) return;
  var a = (Math.PI * 5)/sides;
  // a = anticlockwise?-a:a;
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(startAngle);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.restore();

}



setup()
window.addEventListener("resize", setup)


///







////

var RENDERER = {
	SARDIN_COUNT :2000,
	OCEAN_COLOR_TOP : 'hsla(180, 100%, %l%, 0.06)',
	OCEAN_COLOR_BOTTOM : 'hsla(240, 100%, %l%, 0.06)',
	
	init : function(){
		this.setParameters();
		this.reconstructMethod();
		this.createSardins();
		this.render();
	},
	setParameters : function(){
		this.$container = $('#jsi-sardin-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.context = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container).get(0).getContext('2d');
		this.sardins = [];
	},
	reconstructMethod : function(){
		this.render = this.render.bind(this);
	},
	createSardins : function(){
		for(var i = 0, length = this.SARDIN_COUNT; i < length; i++){
			this.sardins.push(new SARDIN(this.width, this.height, i, this.sardins));
		}
	},
	render : function(){
		requestAnimationFrame(this.render);
		
		var vy = 0;
		
		for(var i = 0, length = this.SARDIN_COUNT; i < length; i++){
			vy += this.sardins[i].vy;
		}
		var gradient = this.context.createLinearGradient(0, 0, 0, this.height),
			luminance = Math.ceil(9 - 5 * vy / this.SARDIN_COUNT);
		
		gradient.addColorStop(0, this.OCEAN_COLOR_TOP.replace('%l', luminance));
		gradient.addColorStop(1, this.OCEAN_COLOR_BOTTOM.replace('%l', luminance));
		
		this.context.fillStyle = gradient;
		this.context.fillRect(0, 0, this.width, this.height);
		
		for(var i = 0, length = this.SARDIN_COUNT; i < length; i++){
			this.sardins[i].render(this.context);
		}
	}
};
var SARDIN = function(width, height, index, sardins){
	this.width = width;
	this.height = height;
	this.index = index;
	this.sardins = sardins;
	
	this.init();
};
SARDIN.prototype = {
	SARDIN_COLOR : '#FFFFFF',
	SCATTERING_LIMIT : 30,
	GATHERING_LIMIT : 50,
	MAX_VELOCITY : 5,
	TAIL_FREQUENCY : Math.PI / 20,
	FIELD_OFFSET : 1.2,
	
	init : function(){
		this.x = Math.random() * this.width;
		this.y = Math.random() * this.height;
		this.vx = 0;
		this.vy = 0;
		this.phi = Math.PI * 2 * Math.random();
	},
	render : function(context){
		context.save();
		context.translate(this.x, this.y);
		context.rotate(Math.atan2(this.vy, this.vx) + Math.PI);
		context.fillStyle = this.SARDIN_COLOR;
		
		context.save();
		context.scale(1, 0.7 + Math.sin(this.phi) * 0.2);
		context.beginPath();
		context.moveTo(-52, 16);
		context.bezierCurveTo(-8, -3, -4, -3, 0, -0.5);
		context.lineTo(0, 0.05);
		context.bezierCurveTo(-4, 3, -8, 3, -12, 0);
		context.fill();
		context.restore();
		
		context.save();
		context.scale(0.9 + Math.atan2(this.phi,1.2) * 0.2, .2);
		context.beginPath();
		context.moveTo(0, -0.5);
		context.bezierCurveTo(3, -3,4, -4, 6, -4);
		context.lineTo(9, 4);
		context.bezierCurveTo(14, 14, 2, 2, 0, 1.5);
		context.closePath();
		context.fill();
		context.restore();
		context.restore();
		
		this.phi += this.TAIL_FREQUENCY;
		this.phi %= Math.PI * 2;
		
		this.adjustVelocity();
		this.update();
	},
	adjustVelocity : function(){
		var scatteringVelocity = {count : 0, vx : 0, vy : 0},
			gatheringVelocity = {count : 0, vx : 0, vy : 0},
			synchronizingVelocity = {count : 0, vx : 0, vy : 0};
			
		for(var i = 0, length = this.sardins.length; i < length; i++){
			if(i == this.index){
				continue;
			}
			var sardin = this.sardins[i],
				dx = sardin.x - this.x,
				dy = sardin.y - this.y,
				distance = Math.sqrt(dx * dx + dy * dy);
			
			if(distance > this.GATHERING_LIMIT){
				continue;
			}
			if(distance < this.SCATTERING_LIMIT){
				var offset = distance / (this.SCATTERING_LIMIT - distance) * Math.ceil(4);
				
				scatteringVelocity.vx -= dx / offset;
				scatteringVelocity.vy -= dy / offset;
				scatteringVelocity.count++;
			}else{
				var offset = distance * 10;
				
				gatheringVelocity.vx += dx / offset;
				gatheringVelocity.vy += dy / offset;
				gatheringVelocity.count++;
			}
			synchronizingVelocity.vx += sardin.vx;
			synchronizingVelocity.vy += sardin.vy;
			synchronizingVelocity.count++;
		}
		if(scatteringVelocity.count){
			this.vx += scatteringVelocity.vx / scatteringVelocity.count;
			this.vy += scatteringVelocity.vy / scatteringVelocity.count;
		}
		if(gatheringVelocity.count){
			this.vx += gatheringVelocity.vx / gatheringVelocity.count;
			this.vy += gatheringVelocity.vy / gatheringVelocity.count;
		}
		if(synchronizingVelocity.count){
			this.vx += synchronizingVelocity.vx / synchronizingVelocity.count;
			this.vy += synchronizingVelocity.vy / synchronizingVelocity.count;
		}
		var velocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
		
		if(velocity > this.MAX_VELOCITY){
			var rate = this.MAX_VELOCITY / velocity;
			
			this.vx *= rate;
			this.vy *= rate;
		}
	},
	update : function(){
		var fieldLeft = this.width * (1 - this.FIELD_OFFSET),
			fieldRight = this.width * this.FIELD_OFFSET,
			fieldTop = this.height * (1 - this.FIELD_OFFSET),
			fieldBottom = this.height * this.FIELD_OFFSET;
			
		if(this.x < fieldLeft){
			this.x = fieldLeft;
			this.vx *= -2;
		}else if(this.x > fieldRight){
			this.x = fieldRight;
			this.vx *= -2;
		}
		if(this.y < fieldTop){
			this.y = fieldTop;
			this.vy *= -1;
		}else if(this.y > fieldBottom){
			this.y = fieldBottom;
			this.vy *= -1;
		}
		this.x += this.vx;
		this.y += this.vy;
	}
};
$(function(){
	RENDERER.init();
});