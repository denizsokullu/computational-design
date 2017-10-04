var SubLetter = function(x,y,offsetX,offsetY){
  this.offSetX = settings.xSpace
  this.offSetY = settings.ySpace
  this.xStart = settings.xStart + offsetPos;
  this.yStart = settings.yStart;
  dividerX = 0
  dividerY = 0
  if (settings.sampling != 1){
    dividerX = 1*x/settings.sampling
    dividerY = 1*y/settings.sampling
  }
  this.x = x - dividerX;
  this.y = y - dividerY;
  this.sSize = settings.shapeSize;
  this.xs = settings.shapeXSize
  this.ys = settings.shapeYSize;
  this.randomX = (Math.random()*20) -10;
  this.checkSampling = function(){
    return (!(this.x % settings.sampling)) && (!(this.y % settings.sampling))
  }
  this.draw = function(){
      this.x = x - dividerX;
      this.y = y - dividerY;
      if(this.checkSampling()){
        fill(color(settings.color[0],settings.color[1],settings.color[2]))
        settings.shapeRep(this);
      }
    }
  this.checkHover = function(){
    offset = 30
    return(mouseX > (this.x*this.offSetX) + this.xStart - offset &&
           mouseX < (this.x*this.offSetX) + this.xStart + this.sSize + offset&&
           mouseY > (this.y*this.offSetY) + this.yStart - offset &&
           mouseY < (this.y*this.offSetY) + this.yStart + this.sSize + offset)
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
    }
  }
}
