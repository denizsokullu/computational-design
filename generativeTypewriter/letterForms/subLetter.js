var SubLetter = function(x,y,angle,offsetX,offsetY){
  this.offSetX = settings.xSpace
  this.offSetY = settings.ySpace
  this.xStart = settings.xStart + offsetPos;
  this.yStart = settings.yStart;
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.sSize = settings.shapeSize;
  this.xs = settings.shapeXSize
  this.ys = settings.shapeYSize;
  this.randomX = (Math.random()*20) -10;
  this.checkSampling = function(){
    return (!(this.x % settings.sampling)) && (!(this.y % settings.sampling))
  }
  this.draw = function(){
      settings.hoverRep(this);
      fill(color(settings.color[0],settings.color[1],settings.color[2]))
      settings.shapeRep(this);
    }
  this.updateXOffset = function(val){
    this.xStart -= val;
  }
  this.update = function(){
    this.offSetX = settings.xSpace;
    this.offSetY = settings.ySpace;
    this.yStart =  settings.yStart;
    this.sSize = settings.shapeSize;
    this.xs = settings.shapeXSize
    this.ys = settings.shapeYSize
    this.counter = ((this.counter + 1) % 1000);
    if(!this.counter % 200){
      this.randomX = (Math.random()*50) -25;
    }
  }
  this.counter = 0;
  this.data = {
    drawLine: {
      counter : 0,
      shapeXSize : SETTINGS.shapeXSize,
      shapeYSize : SETTINGS.shapeYSize
    },
    drawLineSpikes: {
      counter : 0,
      x : Math.floor((Math.random()*SETTINGS.shapeStorage.drawLineSpikes.length)
      -(SETTINGS.shapeStorage.drawLineSpikes.length/2)),
      y : Math.floor((Math.random()*SETTINGS.shapeStorage.drawLineSpikes.length)
      -(SETTINGS.shapeStorage.drawLineSpikes.length/2)),
      curX :  Math.floor((Math.random()*SETTINGS.shapeStorage.drawLineSpikes.length)
      -(SETTINGS.shapeStorage.drawLineSpikes.length/2)),
      curY :  Math.floor((Math.random()*SETTINGS.shapeStorage.drawLineSpikes.length)
      -(SETTINGS.shapeStorage.drawLineSpikes.length/2)),
    },
    drawCurvedLines : {
      counter : 0,
      bezier1x : (Math.random()*SETTINGS.shapeStorage.drawCurvedLines.curveMagnitude) -(SETTINGS.shapeStorage.drawCurvedLines.curveMagnitude/2),
      bezier2x : (Math.random()*SETTINGS.shapeStorage.drawCurvedLines.curveMagnitude) -(SETTINGS.shapeStorage.drawCurvedLines.curveMagnitude/2),
      bezier1y : (Math.random()*SETTINGS.shapeStorage.drawCurvedLines.curveMagnitude) -(SETTINGS.shapeStorage.drawCurvedLines.curveMagnitude/2),
      bezier2y : (Math.random()*SETTINGS.shapeStorage.drawCurvedLines.curveMagnitude) -(SETTINGS.shapeStorage.drawCurvedLines.curveMagnitude/2),
      curB1x : 10,
      curB2x : 10,
      curB1y : 10,
      curB2y : 10,
      pos1: p5.Vector.random2D().mult(Math.random()*SETTINGS.shapeStorage.drawCurvedLines.lengthMagnitude - (SETTINGS.shapeStorage.drawCurvedLines.lengthMagnitude)),
      pos2: p5.Vector.random2D().mult(Math.random()*SETTINGS.shapeStorage.drawCurvedLines.lengthMagnitude - (SETTINGS.shapeStorage.drawCurvedLines.lengthMagnitude)),
      newPos1: p5.Vector.random2D().mult(Math.random()*SETTINGS.shapeStorage.drawCurvedLines.lengthMagnitude - (SETTINGS.shapeStorage.drawCurvedLines.lengthMagnitude)),
      newPos2: p5.Vector.random2D().mult(Math.random()*SETTINGS.shapeStorage.drawCurvedLines.lengthMagnitude - (SETTINGS.shapeStorage.drawCurvedLines.lengthMagnitude)),
    },
    hoverBounce : {
      position : createVector(this.x,this.y),
      target : createVector(this.x,this.y),
      acceleration : createVector(),
      velocity : p5.Vector.random2D()
    }
  }
}
