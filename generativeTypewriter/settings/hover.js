//Hover Functions
SETTINGS.hoverFunctions = {
  bubble: function(target){
    target.xs = 30;
    target.ys = 30;
    dY = Math.round((Math.random()*4) - 2);
    dX = Math.round((Math.random()*4) - 2);
    target.y += dY
    target.x += dX
  },
  shiver: function(target){
    target.x = lerp(target.x,target.x+target.randomX,0.1);
  }
}
SETTINGS.hoverFunctionsString = Object.keys(SETTINGS.hoverFunctions);
SETTINGS.hoverFunctionRep = SETTINGS.hoverFunctions.bubble;
SETTINGS.hoverFunction = SETTINGS.hoverFunctionsString[0];
