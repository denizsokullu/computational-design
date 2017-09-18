var currentLetter;

var Letter = function(mapping){
  this.map = mapping;
  this.draw = function(){
    console.log(settings);
    curX = settings.xStart;
    curY = settings.yStart;
    console.log(curX);
    for(var i = 0; i < this.map.length; i++){
      for (var j = 0; j < this.map[i].length; j++){
        if(this.map[i][j]){
          sSize = settings.shapeSize;
          if(settings.shape == "rect"){
            rect(curX,curY,sSize,sSize);
          }
          else if(settings.shape == "ellipse"){
            ellipse(curX,curY,sSize,sSize);
          }
        }
        curX += settings.xSpace;;
      }
      curY += settings.ySpace;;
      curX = settings.xStart;
    }
  }
}
var Settings = function(){
  this.shape="rect";
  this.xStart=100;
  this.yStart = 100;
  this.shapeSize = 50;
  this.xSpace = 50;
  this.ySpace = 50;
  this.rotate = 0.2;
}
function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  settings = new Settings();
  var gui = new dat.GUI();
  gui.add(settings, "shape",["rect","ellipse"]);
  gui.add(settings, "shapeSize",0,100);
  gui.add(settings, "xSpace",0,100);
  gui.add(settings, "ySpace",0,100);
  gui.add(settings, "xStart",0,window.innerWidth);
  gui.add(settings, "yStart",0,window.innerHeight);
  gui.add(settings, "rotate",0,360);
}

function draw(){
  background(51);
  fill(255);
  if (keyIsDown(SHIFT) && !capital){
    capital = true;
  }
  else if (!keyIsDown(SHIFT)){
    capital = false;
  }
  if(currentLetter){
    currentLetter.draw();
  }
}

window.onresize = function(){
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.resize(w,h);
  width = w;
  height = h;
}

function keyPressed(){
  char = String.fromCharCode(keyCode).toLowerCase();
  if(Object.keys(fonts).indexOf(char) !== -1){
    currentLetter = new Letter(fonts[String.fromCharCode(keyCode).toLowerCase()]);
  }
}
