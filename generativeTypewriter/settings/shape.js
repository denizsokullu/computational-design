SETTINGS.shapeFunctions = {
  drawRectangle: function(target){
    t = target;
    push();
    stroke(color(settings.strokeColor[0],
                 settings.strokeColor[1],
                 settings.strokeColor[2]));
    if(!settings.stroke){
      noStroke();
    }
    strokeWeight(settings.strokeWeight);
    translate(t.xStart,t.yStart);
    rect(t.x,t.y,t.xs,t.ys);
    pop();
  },
  drawEllipse: function(target){
    t = target;
    push();
    stroke(color(settings.strokeColor[0],
                 settings.strokeColor[1],
                 settings.strokeColor[2]));
    if(!settings.stroke){
      noStroke();
    }
    translate(t.xStart,t.yStart);
    ellipse(t.x,t.y,t.xs,t.ys);
    pop();
  },
  drawLine: function(target){
    t = target;
    push();
    stroke(color(settings.strokeColor[0],
                 settings.strokeColor[1],
                 settings.strokeColor[2]));
    translate(t.x+t.xStart,t.y+t.yStart);
    data = target.data.drawLine
    settingData = SETTINGS.shapeStorage.drawLine;
    var angle;
    if (settingData.lineMagnet){
      distance = dist((t.x)+t.xStart,(t.y)+t.yStart,mouseX,mouseY);
      angle = settings.rotate;

      if (distance < settingData.maxDistance){
          data.shapeXSize = settingData.maxDistance - distance;
          data.shapeYSize = settingData.maxDistance - distance;
      }
      else{
        data.shapeXSize = settingData.oldX
        data.shapeYSize = settingData.oldY
      }
    }
    if (settingData.randomDirection){
      data.shapeXSize *= (Math.random()*2)-1;
      data.shapeYSize *= (Math.random()*2)-1;
    }
    if (settingData.randomSize){
      r = Math.random();
      data.shapeXSize += (r*settingData.randomSizeDelta)- (settingData.randomSizeDelta/2);
      data.shapeYSize += (r*settingData.randomSizeDelta) - (settingData.randomSizeDelta/2);
    }
    if (settingData.lineHoverFollow){
      mousePos = createVector(mouseX-(t.x+t.xStart),mouseY-(t.y+t.yStart)).normalize();
      baseVector = createVector(t.x+t.xStart+1,t.y+t.yStart).normalize();
      angle = baseVector.angleBetween(mousePos);
      if(mouseY <= t.y+t.yStart){
        angle = -angle;
      }
    }
    strokeWeight(settings.strokeWeight);
    rotate(angle);
    line(0,0,data.shapeXSize,data.shapeYSize);
    pop();
  },
  drawLineSpikes: function(target){
    t = target;
    push();
    stroke(color(settings.strokeColor[0],
                 settings.strokeColor[1],
                 settings.strokeColor[2]));
    strokeWeight(settings.strokeWeight);
    translate(t.x+t.xStart,t.y+t.yStart);
    data = t.data.drawLineSpikes;
    settingData = SETTINGS.shapeStorage.drawLineSpikes
    if (settingData.mouseActionLengthIncrease){
      settingData.length = map(mouseY,0,window.innerHeight,settingData.lengthMin,settingData.lengthMax);
    }
    if(data.counter == 0){
      data.curX = data.nextX;
      data.curY = data.nextY;
      data.nextX = Math.floor((Math.random()*settingData.length)-(settingData.length/2))
      data.nextY = Math.floor((Math.random()*settingData.length)-(settingData.length/2))
    }
    next = createVector(data.nextX,data.nextY);
    cur = createVector(data.curX,data.curY);
    data.counter = (data.counter +1) % Math.floor(240 / settingData.spikeSpeed);

    vector2Draw = cur.lerp(next,0.01*settingData.spikeSpeed);
    data.curX = vector2Draw.x;
    data.curY = vector2Draw.y;

    line(0,0,vector2Draw.x,vector2Draw.y);
    pop();
  },
  drawCurvedLines: function(target){
    t = target;
    push();
    stroke(color(settings.strokeColor[0],
                 settings.strokeColor[1],
                 settings.strokeColor[2]));
    translate(t.x+t.xStart,t.y+t.yStart);
    data = t.data.drawCurvedLines;
    settingData = SETTINGS.shapeStorage.drawCurvedLines;

    // do calculation here
    // convert these to vectors!
    if(data.counter == 0){
      data.curB1x = data.bezier1x;
      data.curB1y = data.bezier1y;
      data.curB2x = data.bezier2x;
      data.curB2y = data.bezier2y;


      data.pos1 = data.newPos1;
      data.pos2 = data.newPos2;
      data.newPos1 = p5.Vector.random2D().mult((Math.random()*settingData.lengthMagnitude) - (settingData.lengthMagnitude/2));
      data.newPos2 = p5.Vector.random2D().mult((Math.random()*settingData.lengthMagnitude) - (settingData.lengthMagnitude/2));


      data.bezier1x = (Math.random()*settingData.curveMagnitude) - (settingData.curveMagnitude/2);
      data.bezier1y = (Math.random()*settingData.curveMagnitude) - (settingData.curveMagnitude/2);
      data.bezier2x = (Math.random()*settingData.curveMagnitude) - (settingData.curveMagnitude/2);
      data.bezier2y = (Math.random()*settingData.curveMagnitude) - (settingData.curveMagnitude/2);
    }
    else{
      speed = 0.05;
      data.curB1x = lerp(data.curB1x,data.bezier1x,speed);
      data.curB2x = lerp(data.curB2x,data.bezier2x,speed);
      data.curB1y = lerp(data.curB1y,data.bezier1y,speed);
      data.curB2y = lerp(data.curB2y,data.bezier2y,speed);

      data.pos1 = data.pos1.lerp(data.newPos1,speed);
      data.pos2 = data.pos2.lerp(data.newPos2,speed);
    }
    data.counter = (data.counter +1) % 60;
    strokeWeight(settings.strokeWeight);
    // DRAW HERE
    bezier(data.pos1.x,data.pos1.y,data.curB1x,data.curB1y,data.curB2x,data.curB2y,data.pos2.x,data.pos2.y);
    pop();
  }
}
SETTINGS.shapeStorage = {
  drawRectangle : {
    createGUI : function(){
      clearAll("shape");
    }
  },
  drawEllipse : {
    createGUI : function(){
      clearAll();
    }
  },
  drawLine : {
    lineHoverFollow : false,
    lineMagnet : true,
    strokeWeight : 1,
    maxDistance : 100,
    randomDirection : false,
    randomSize : false,
    randomSizeDelta : 0,
    oldX : SETTINGS.shapeXSize,
    oldY : SETTINGS.shapeYSize,
    createGUI : function(){
      clearAll("shape");
      lineFolder = gui.addFolder("Line");
      data = settings.shapeStorage.drawLine;
      lineFolderRotate = lineFolder.add(settings,"rotate",-360,360).listen();
      lineFolderRotate = lineFolder.add(data,"maxDistance",0,Math.min(window.innerHeight,window.innerWidth));
      lineFolder.add(data,"randomDirection");
      lineFolder.add(data,"randomSize");
      lineFolder.add(data,"randomSizeDelta",0,200);
      lineFolder.add(data,"lineHoverFollow");
      lineFolder.add(data,"lineMagnet");
      lineFolder.open();
    }
  },
  drawLineSpikes : {
    length : 10,
    lengthMin : 0,
    lengthMax : 100,
    spikeSpeed : 4,
    mouseActionLengthIncrease : true,
    mouseActionMagnet : true,
    createGUI : function(){
      clearAll("shape");
      spikeLineFolder = gui.addFolder("Spike Line");
      data = settings.shapeStorage.drawLineSpikes

      spikeLineFolder.add(data,"spikeSpeed",1,10).step(1);
      spikeLineFolder.add(data,"length",data.lengthMin,data.lengthMax).listen();
      spikeLineFolder.add(data,"mouseActionLengthIncrease");
      // gui.remove(shapeXSize);
      // gui.remove(shapeYSize);
      spikeLineFolder.open();
    }
  },
  drawCurvedLines : {
    lengthMin : 0,
    lengthMax : 400,
    curveMin : 0,
    curveMax : 400,
    createGUI : function(){
      clearAll("shape");
      curvedLineFolder = gui.addFolder("Curved Line");
      data = settings.shapeStorage.drawCurvedLines
      curvedLineFolder.add(data,"curveMagnitude",data.curveMin,data.curveMax).listen();
      curvedLineFolder.add(data,"lengthMagnitude",data.lengthMin,data.lengthMax).listen();
      // gui.remove(shapeListener);
      // gui.remove(shapeXSize);
      // gui.remove(shapeYSize);
      curvedLineFolder.open();
    },
    curveMagnitude : 30,
    lengthMagnitude : 30
  }
}
SETTINGS.shapeOptions = Object.keys(SETTINGS.shapeFunctions);
SETTINGS.shape = SETTINGS.shapeOptions[0];
SETTINGS.shapeRep = SETTINGS.shapeFunctions[SETTINGS.shape];
