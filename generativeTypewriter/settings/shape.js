SETTINGS.shapeFunctions = {
  drawRectangle: function(target){
    t = target;
    rect((t.x*t.offSetX)+t.xStart,
         (t.y*t.offSetY)+t.yStart,
          t.xs,
          t.ys);
  },
  drawEllipse: function(target){
    t = target;
    ellipse((t.x*t.offSetX)+t.xStart,
            (t.y*t.offSetY)+t.yStart,
             t.xs,
             t.ys);
  },
  drawLine: function(target){
    t = target;
    push();
    stroke(color(settings.color[0],settings.color[1],
    settings.color[2]));
    translate((t.x*t.offSetX)+t.xStart,(t.y*t.offSetY)+t.yStart);
    settingData = SETTINGS.shapeStorage.drawLine
    if (settingData.lineHoverFollow){
      mousePos = createVector(mouseX-((t.x*t.offSetX)+t.xStart),mouseY-(t.y*t.offSetY)+t.yStart);
      baseVector = createVector(1,0);
      if(mouseY <= (t.y*t.offSetY)+t.yStart){
        settings.rotate = - baseVector.angleBetween(mousePos)
      }
      else{
        settings.rotate = baseVector.angleBetween(mousePos) - 360
      }
    }
    if (settingData.lineMagnet){
      distance = dist((t.x*t.offSetX)+t.xStart,(t.y*t.offSetY)+t.yStart,mouseX,mouseY);
      if (distance < 100){
        settings.shapeXSize = 100 - distance;
        settings.shapeYSize = 100 - distance;
      }
      else{
        //this updates it for all the following subLetters
        //fix it
        settings.shapeXSize = settingData.oldX
        settings.shapeYSize = settingData.oldY
      }
    }
    strokeWeight(settings.strokeWeight);
    rotate(settings.rotate);
    line(0,0,t.xs,t.ys);
    pop();
  },
  drawLineSpikes: function(target){
    t = target;
    push();
    stroke(color(settings.color[0],
                 settings.color[1],
                 settings.color[2]));
    translate((t.x*t.offSetX)+t.xStart,(t.y*t.offSetY)+t.yStart);
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
    data.counter = (data.counter +1) % 60;
    vector2Draw = cur.lerp(next,0.04);
    data.curX = vector2Draw.x;
    data.curY = vector2Draw.y;

    strokeWeight(settings.strokeWeight);
    line(0,0,vector2Draw.x,vector2Draw.y);
    rotate(settings.rotate);
    line(0,0,);
    pop();
  },
  drawCurvedLines: function(target){
    t = target;
    push();
    stroke(color(settings.color[0],
                 settings.color[1],
                 settings.color[2]));
    translate((t.x*t.offSetX)+t.xStart,(t.y*t.offSetY)+t.yStart);
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
    // ROTATE HERE if needed
    rotate(settings.rotate);
    pop();
  }
}
SETTINGS.shapeStorage = {
  drawRectangle : {
    createGUI : function(){
      clearAll();
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
    oldX : SETTINGS.shapeXSize,
    oldY : SETTINGS.shapeYSize,
    createGUI : function(){
      clearAll();
      lineFolder = gui.addFolder("Line");
      lineFolderRotate = lineFolder.add(settings,"rotate",-360,360).listen();
      data = settings.shapeStorage.drawLine
      lineFolder.add(data,"strokeWeight",0,50).listen();
      lineFolder.add(data,"lineHoverFollow");
      lineFolder.add(data,"lineMagnet");
      lineFolder.open();
    }
  },
  drawLineSpikes : {
    length : 10,
    lengthMin : 0,
    lengthMax : 100,
    mouseActionLengthIncrease : true,
    mouseActionMagnet : true,
    createGUI : function(){
      clearAll();
      spikeLineFolder = gui.addFolder("Spike Line");
      data = settings.shapeStorage.drawLineSpikes
      spikeLineFolder.add(data,"length",data.lengthMin,data.lengthMax).listen();
      spikeLineFolder.add(data,"mouseActionLengthIncrease");
      gui.remove(shapeXSize);
      gui.remove(shapeYSize);
      spikeLineFolder.open();
    }
  },
  drawCurvedLines : {
    lengthMin : 0,
    lengthMax : 400,
    curveMin : 0,
    curveMax : 400,
    createGUI : function(){
      clearAll();
      curvedLineFolder = gui.addFolder("Curved Line");
      data = settings.shapeStorage.drawCurvedLines
      curvedLineFolder.add(data,"curveMagnitude",data.curveMin,data.curveMax).listen();
      curvedLineFolder.add(data,"lengthMagnitude",data.lengthMin,data.lengthMax).listen();
      gui.remove(shapeXSize);
      gui.remove(shapeYSize);
      curvedLineFolder.open();
    },
    curveMagnitude : 30,
    lengthMagnitude : 30
  }
}
SETTINGS.shapeOptions = Object.keys(SETTINGS.shapeFunctions);
SETTINGS.shape = SETTINGS.shapeOptions[0];
SETTINGS.shapeRep = SETTINGS.shapeFunctions[SETTINGS.shape];
