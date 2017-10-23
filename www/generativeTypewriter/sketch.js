var currentLetter;
p5.disableFriendlyErrors = true;
SETTINGS.currentWord = [];
SETTINGS.currentWordLiteral = [];
var maxLength = 8;
var offsetPos;
var offsetStart;
var charWidth;
var gui;
var lineFolder;
var spikeLineFolder;
var curvedLineFolder;
var bubbleHoverFolder;
var bounceHoverFolder;
var connectVerticesFolder;
var testFont;
var EXPORTS = {};

//Everything in the settings that we can change
//Everything in initSettings;


function preload(){
  Object.keys(SETTINGS.fontPaths).forEach((cur)=>{
    SETTINGS.fontsLoaded[cur] = loadFont(`fonts/${SETTINGS.fontPaths[cur]}`);
  })
}

function setup(){
  canvas = createCanvas(window.innerWidth, window.innerHeight,P2D);
  angleMode(DEGREES);
  SETTINGS.frameRate = frameRate();
  settings = SETTINGS;
  settings.currentFont = SETTINGS.fontsLoaded["Roboto Mono Regular"];
  settings.clearWord = function(){
    SETTINGS.currentWord = [];
    offsetPos = offsetStart;
    return;
  }

  //Set letter spacing
  charWidth = 42*(settings.shapeXSize+settings.xSpace);
  offsetStart = (window.innerWidth/2) - (charWidth/2)+80;
  offsetPos = offsetStart;

  //Create GUI
  createGUI();
  background(color(settings.backgroundColor[0],
                   settings.backgroundColor[1],
                   settings.backgroundColor[2]));

  //load data from db
  var id = window.location.search.split("=")[1];
  currentData = database.ref('generativeTypewriter/creations/'+id);
  currentData.on('value',retrieveDrawing);
}

function retrieveDrawing(data){
  var obj = data.val();
  data = obj.EXPORTS;
  console.log(data);
  Object.keys(data).map((val)=>{
    if (typeof(data[val]) != "object" || data[val] instanceof Array){
      settings[val] = data[val];
    }
    else{
      obj = data[val];
      Object.keys(obj).map((innerStorage)=>{
        storage = obj[innerStorage];
        Object.keys(storage).map((innerVal)=>{
          settings[val][innerStorage][innerVal] = storage[innerVal];
        });
      });
    }
  });
  updateFont(SETTINGS.font);
  updateWord();
  settings.shapeRep = SETTINGS.shapeFunctions[data.shape];
  settings.hoverRep = SETTINGS.hoverFunctions[data.hoverFunction];

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
  SETTINGS.currentWord.map((cur)=>{
    cur.draw();
  });
  SETTINGS.currentWord.map((cur)=>{
    cur.update();
  });
  // Listener code
  shapeListener.onChange((v)=>{
    settings.shapeXSize = v;
    settings.shapeYSize = v;
  });
  shapeFunctionListener.onChange((v)=>{
    settings.shapeStorage[v].createGUI();
    settings.shapeRep = settings.shapeFunctions[v];
  });
  hoverFunctionListener.onChange((v)=>{
    settings.hoverStorage[v].createGUI();
    settings.hoverRep = settings.hoverFunctions[v];
  });
  fontChangeListener.onChange((v)=>{
    updateFont(v);
    updateWord();
  });
  fontSizeListener.onChange(updateWord);
  sampleFactorListener.onChange(updateWord);
}

//GUI FUNCTIONS
function createGUI(){
  gui = new dat.GUI();
  fontChangeListener = gui.add(settings, "font",Object.keys(settings.fontsLoaded)).listen();
  shapeFunctionListener = gui.add(settings, "shape",settings.shapeOptions).listen();
  hoverFunctionListener = gui.add(settings, "hoverFunction",Object.keys(settings.hoverFunctions)).listen();
  sampleFactorListener = gui.add(settings, "sampleFactor",0,1).step(.01).listen();
  fontSizeListener = gui.add(settings, "fontSize",12,500).step(1).listen();
  gui.addColor(settings,"color").listen();
  gui.addColor(settings,"strokeColor").listen();
  gui.addColor(settings,"backgroundColor").listen();
  gui.add(settings, "stroke").listen();
  shapeListener = gui.add(settings, "shapeSize",0,200).listen();
  shapeXSize = gui.add(settings, "shapeXSize",0,200).listen();
  shapeYSize = gui.add(settings, "shapeYSize",0,200).listen();
  gui.add(settings,"strokeWeight",0,500).listen();
  gui.add(settings, "yStart",0,window.innerHeight).listen();
  gui.add(settings, "frameRate",0,60).listen();
  gui.add(settings, "clearWord");
}

function clearAll(target){
  if (lineFolder != undefined && target == "shape"){
    lineFolder.close();
    removeFolder(lineFolder,"Line")
    lineFolder = undefined;
  }
  if (spikeLineFolder != undefined && target == "shape"){
    spikeLineFolder.close();
    removeFolder(spikeLineFolder,"Spike Line");
    spikeLineFolder = undefined;
  }
  if (connectVerticesFolder != undefined && target == "shape"){
    connectVerticesFolder.close();
    removeFolder(connectVerticesFolder,"Connected Vertices");
    connectVerticesFolder = undefined;
  }
  if (curvedLineFolder != undefined && target == "shape"){
    curvedLineFolder.close();
    removeFolder(curvedLineFolder,"Curved Line");
    curvedLineFolder = undefined;
  }
  if (bubbleHoverFolder != undefined && target == "hover"){
    bubbleHoverFolder.close();
    removeFolder(bubbleHoverFolder,"Bubble Behaviour");
    bubbleHoverFolder = undefined;
  }
  if (bounceHoverFolder != undefined && target == "hover"){
    bounceHoverFolder.close();
    removeFolder(bounceHoverFolder,"Bounce Behaviour");
    bounceHoverFolder = undefined;
  }
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

function updateFont(newFont){
  settings.currentFont = settings.fontsLoaded[newFont];
}
function updateWord(){
  SETTINGS.currentWord = [];
  offsetPos = offsetStart;
  SETTINGS.currentWordLiteral.map((character)=>{
    letter = createLetter(character);
    SETTINGS.currentWord.push(new RegularLetter(letter));
    offsetPos += charWidth*0.24;
    SETTINGS.currentWord.map((cur)=>{
      cur.children.map((curChild)=>{
        curChild.updateXOffset(charWidth*.16);
      });
    });
  })
}
function createLetter(character){
  return settings.currentFont.textToPoints(
    character,
    0,
    settings.yStart,
    settings.fontSize,
    {"sampleFactor":settings.sampleFactor,
     "simplifyThreshold":settings.simplifyThreshold}
   )
}
function keyPressed(){
  fill(255);
  character = String.fromCharCode(keyCode).toLowerCase();

  if(keyCode == BACKSPACE ){
    if(SETTINGS.currentWord.length > 0){
    SETTINGS.currentWord.pop();
    SETTINGS.currentWordLiteral.pop();
    offsetPos += -(charWidth*0.24);
    SETTINGS.currentWord.map((cur)=>{
      cur.children.map((curChild)=>{
        curChild.updateXOffset(-charWidth*.18);
      });
    });
    return;
    }
    else{
      return;
    }
  }

  else if (SETTINGS.currentWord.length <= maxLength){
    letter = createLetter(character);
    SETTINGS.currentWord.push(new RegularLetter(letter));
    SETTINGS.currentWordLiteral.push(character);
    offsetPos += charWidth*0.24;
    SETTINGS.currentWord.map((cur)=>{
      cur.children.map((curChild)=>{
        curChild.updateXOffset(charWidth*.18);
      });
    });
  }
}
