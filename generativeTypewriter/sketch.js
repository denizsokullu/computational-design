var currentLetter;

var Letter = function(mapping){
  this.map = mapping;
  this.draw = function(){
    curX = settings.xStart;
    curY = settings.yStart;
    for(var i = 0; i < this.map.length; i++){
        sSize = settings.shapeSize;
        offSetX = settings.xSpace
        offSetY = settings.ySpace
        if(settings.shape == "rect"){
          rect(curX+(this.map[i][0]*offSetX),curY+(this.map[i][1]*offSetY),sSize,sSize);
        }
        else if(settings.shape == "ellipse"){
          ellipse(curX+(map[i][0]*offSetX),curY+(map[i][1]*offSetY),sSize,sSize);
        }
        // else if(settings.shape == "triangle"){
        //   triangle(curX,curY+sSize,curX+sSize,curY+sSize,curX+(sSize/2),curY+(sSize/2));
        // }
    }
  }
}
var MotherLetter = function(mapping){
  this.locations = mapping;
  this.children = []
  this.locations.map((cur)=>{
    curShape = new SubLetter(cur[0],cur[1],settings.xSpace,settings.ySpace)
    this.children.push(curShape);
  })
  console.log(this.children)
  this.draw = function(){
    this.children.forEach((child)=>{child.draw()});
  }
}
var SubLetter = function(x,y,offsetX,offsetY){
  this.offSetX = offsetX;
  this.offSetY = offsetY;
  dividerX = 0
  dividerY = 0
  if (settings.sampling != 1){
    dividerX = 1*x/settings.sampling
    dividerY = 1*y/settings.sampling
  }
  this.x = x - dividerX;
  this.y = y - dividerY;
  this.sSize = settings.shapeSize;
  this.draw = function(){
      if (this.checkHover()){
        this.sSize = 30
        dY = Math.round((Math.random()*4) - 2);
        dX = Math.round((Math.random()*4) - 2);
        this.y += dY
        this.x += dX
      }
      else{
        this.sSize = settings.shapeSize;
        this.x = x - dividerX;
        this.y = y - dividerY;
      }
      if(settings.shape == "rect" && this.x % settings.sampling == 0 && this.y % settings.sampling == 0){
        rect((this.x*this.offSetX),(this.y*this.offSetY),this.sSize,this.sSize);
      }
      else if(settings.shape == "ellipse"){
        ellipse((this.x*this.offSetX),(this.y*this.offSetY),this.sSize,this.sSize);
      }
      // else if(settings.shape == "triangle"){
      //   triangle(curX,curY+sSize,curX+sSize,curY+sSize,curX+(sSize/2),curY+(sSize/2));
      // }
    }
  this.checkHover = function(){
    offset = 30
    return(mouseX > (this.x*this.offSetX) - offset &&
           mouseX < (this.x*this.offSetX) + this.sSize + offset&&
           mouseY > (this.y*this.offSetY) - offset &&
           mouseY < (this.y*this.offSetY) + this.sSize + offset)
  }
}

var Settings = function(){
  this.shape="rect";
  this.sampling = 1
  this.xStart=100;
  this.yStart = 100;
  this.shapeSize = 2;
  this.xSpace = 5;
  this.ySpace = 5;
  this.rotate = 0.2;
  this.frameRate = frameRate();
}
function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  settings = new Settings();
  var gui = new dat.GUI();
  gui.add(settings, "shape",["rect","ellipse","triangle"]);
  gui.add(settings, "sampling",1,8).step(1);
  gui.add(settings, "shapeSize",0,100);
  gui.add(settings, "xSpace",0,100);
  gui.add(settings, "ySpace",0,100);
  gui.add(settings, "xStart",0,window.innerWidth);
  gui.add(settings, "yStart",0,window.innerHeight);
  gui.add(settings, "rotate",0,360);
  gui.add(settings, "frameRate",0,60).listen();
}

function draw(){
  downSampler(0,10);
  background(51);
  fill(255);
  settings.frameRate = frameRate();
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
function downSampler(base,threshold,factor){
  //Creating the new host for the font.
  // downSampled = new Array(newSize);
  // downSampled.fill(new Array(newSize).fill(0));
  //go through the base, average out dependant on the factor amount
  //each average is pushed onto the array, if value is > threshold => 1 else 0.
}
function upSampler(base,factor){
  //Create factor*base.lenght array
  //for each 0/1 create Math.round(factor^2) many 0/1s and replace them in the
  //new array.
}
function spreadValues(base,indices,factor){
  //look at the values around the factor, if they are zeroes, and spread the value
  //on the indices
}
//TODO
//Design an object that represents the shape and how it interacts relative to
//location in the array and make it customizable.


window.onresize = function(){
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.resize(w,h);
  width = w;
  height = h;
}

function keyPressed(){
  chare = String.fromCharCode(keyCode).toLowerCase();
  if(Object.keys(font).indexOf(chare) !== -1){
    console.log(font[String.fromCharCode(keyCode).toLowerCase()]);
    currentLetter = new MotherLetter(font[String.fromCharCode(keyCode).toLowerCase()]);
  }
}
