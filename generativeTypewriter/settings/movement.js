SETTINGS.movementFunctions = {
  blinking : function(){

  },
  glide : function(){

  }
}
SETTINGS.movementFunctionsString = Object.keys(SETTINGS.movementFunctions);
SETTINGS.movementFunction = SETTINGS.movementFunctionsString[0];
SETTINGS.movementFunctionRep = SETTINGS.movementFunctions[SETTINGS.movementFunction]
console.log(SETTINGS.movementFunctionRep);
