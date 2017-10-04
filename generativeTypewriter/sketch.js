var currentLetter;
p5.disableFriendlyErrors = true;
var IMAGE_WIDTH = 50;
var IMAGE_HEIGHT = 150;
var currentWord = [];
var currentWordLiteral = [];
var maxLength = 8;
var offsetPos;
var offsetStart;
var charWidth;
var gui;
var lineFolder;
var spikeLineFolder;
var curvedLineFolder;

function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight,P2D);
  angleMode(DEGREES);
  SETTINGS.frameRate = frameRate();
  settings = SETTINGS;
  settings.clearWord = function(){
    currentWord = [];
    offsetPos = offsetStart;
    return;
  }

  //Set letter spacing
  charWidth = 25*(settings.shapeXSize+settings.xSpace);
  offsetStart = (window.innerWidth/2) - (charWidth/2);
  offsetPos = offsetStart;

  //Create GUI
  createGUI();
  background(color(settings.backgroundColor[0],
                   settings.backgroundColor[1],
                   settings.backgroundColor[2]));
}

function draw(){
  settings.frameRate = frameRate();
  if (keyIsDown(SHIFT) && !capital){
    capital = true;
  }
  else if (!keyIsDown(SHIFT)){
    capital = false;
  }
  background(color(settings.backgroundColor[0],
                   settings.backgroundColor[1],
                   settings.backgroundColor[2]));
  fill(255);
  if (settings.stroke){
    ret =  stroke(color(0,0,0));
  }
  else if (settings.stroke == false){
    noStroke();
  }
  currentWord.map((cur)=>{
    cur.draw();
  });
  currentWord.map((cur)=>{
    cur.update();
  });
  // Listener code
  shapeListener.onChange((v)=>{
    settings.shapeXSize = v;
    settings.shapeYSize = v;
  });
  hoverFunctionListener.onChange((v)=>{
    s = settings;
    if(v == "Bubble"){
      s.hoverFunctionRep = s.hoverFunctions.bubble;
    }
    else if(v == "Shiver"){
      s.hoverFunctionRep = s.hoverFunctions.shiver;
    }
  })
  shapeFunctionListener.onChange((v)=>{
      settings.shapeStorage[v].createGUI();
      settings.shapeRep = settings.shapeFunctions[v];
    });
  fontChangeListener.onChange((v)=>{
    // change all the letters to whatever
    updateFont();
    currentWord = [];
    offsetPos = offsetStart;
    currentWordLiteral.map((character)=>{
      currentWord.push(new ShellLetter(font[character].slice(0)));
      offsetPos += charWidth*0.45;
      currentWord.map((cur)=>{
        cur.children.map((curChild)=>{
          curChild.updateXOffset(charWidth*.375);
        });
      });
    })
  })
}

//GUI FUNCTIONS
function createGUI(){
  gui = new dat.GUI();
  fontChangeListener = gui.add(settings, "font",["Menlo","Akkurat Mono","VT323","Roboto Mono"]).listen();
  shapeFunctionListener = gui.add(settings, "shape",settings.shapeOptions);
  hoverFunctionListener = gui.add(settings, "hoverFunction",settings.hoverFunctionsString);
  gui.addColor(settings,"color").listen();
  gui.addColor(settings,"backgroundColor").listen();
  gui.add(settings, "stroke");
  gui.add(settings, "sampling",1,8).step(1).listen();
  shapeListener = gui.add(settings, "shapeSize",0,200).listen();
  shapeXSize = gui.add(settings, "shapeXSize",0,200).listen();
  shapeYSize = gui.add(settings, "shapeYSize",0,200).listen();
  gui.add(settings, "yStart",0,window.innerHeight);
  gui.add(settings, "frameRate",0,60).listen();
  gui.add(settings, "clearWord");
}

function clearAll(){
  if (lineFolder != undefined){
    lineFolder.close();
    removeFolder(lineFolder,"Line")
    lineFolder = undefined;
  }
  if (spikeLineFolder != undefined){
    spikeLineFolder.close();
    removeFolder(spikeLineFolder,"Spike Line");
    spikeLineFolder = undefined;
  }
  if (curvedLineFolder != undefined){
    curvedLineFolder.close();
    removeFolder(curvedLineFolder,"Curved Line");
    curvedLineFolder = undefined;
  }
  resetGUI();
}

function removeFolder(folder,name) {
  if (!folder) {
    return;
  }
  folder.close();
  gui.__ul.removeChild(folder.domElement.parentNode);
  delete gui.__folders[name];
  gui.onResize();
}

function resetGUI(){
  gui.domElement.remove();
  createGUI();
}

function addCharacter(character,type){
  ///FINISH THIS
}

function updateFont(){
  if (settings.font == "Menlo"){
    font = menlo;
  }
  else if (settings.font == "Akkurat Mono"){
    font = akkuratMono;
  }
  else if (settings.font == "VT323"){
    font = VT323;
  }
  else if (settings.font == "Roboto Mono"){
    font = robotoMono;
  }
}
function keyPressed(){
  chare = String.fromCharCode(keyCode).toLowerCase();
  updateFont();
  if(keyCode == BACKSPACE && currentWord.length > 0){
    currentWord.pop();
    currentWordLiteral.pop();
    offsetPos += -(charWidth*0.45);
    currentWord.map((cur)=>{
      cur.children.map((curChild)=>{
        curChild.updateXOffset(-charWidth*.375);
      });
    });

  }
  if((Object.keys(font).indexOf(chare) !== -1) &&
      currentWord.length <= maxLength){
      settings.sampling = 1
      character = String.fromCharCode(keyCode).toLowerCase()
      data = font[character].slice(0)
      currentWord.push(new ShellLetter(data));
      currentWordLiteral.push(character);
      offsetPos += charWidth*0.45;
      currentWord.map((cur)=>{
        cur.children.map((curChild)=>{
          curChild.updateXOffset(charWidth*.375);
        });
      });
  }
}
