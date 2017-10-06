var RegularLetter = function(mapping){
  this.locations = mapping;
  this.children = []
  this.locations.map((cur)=>{
    curShape = new SubLetter(cur.x,cur.y,cur.alpha,settings.xSpace,settings.ySpace)
    this.children.push(curShape);
  })
  this.draw = function(){
    this.children.forEach((child)=>{child.draw()});
  }
  this.update = function(){
    this.children.forEach((child)=>{child.update()});
  }
}
