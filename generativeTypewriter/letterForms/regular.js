var RegularLetter = function(mapping){
  this.locations = mapping;
  this.children = []
  this.locations.map((cur)=>{
    curShape = new SubLetter(cur[0],cur[1],settings.xSpace,settings.ySpace)
    this.children.push(curShape);
  })
  this.draw = function(){
    this.children.forEach((child)=>{child.draw()});
  }
  this.update = function(){
    this.children.forEach((child)=>{child.update()});
  }
}
