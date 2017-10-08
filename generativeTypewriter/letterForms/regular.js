var RegularLetter = function(mapping){
  this.locations = mapping;
  this.children = []
  this.getClosestPoints = function(x,y){
    closestPoints = []
    this.locations.map((cur)=>{
      d = dist(cur.x,cur.y,x,y)
        closestPoints.push({"x":cur.x,"y":cur.y,"d":d})
    })
    return closestPoints;
  }
  this.locations.map((cur)=>{
    closestPoints = this.getClosestPoints(cur.x,cur.y,50);
    curShape = new SubLetter(cur.x,cur.y,cur.alpha,settings.xSpace,settings.ySpace,closestPoints)
    this.children.push(curShape);
  });

  this.draw = function(){
    this.children.forEach((child)=>{child.draw()});
  }
  this.update = function(){
    this.children.forEach((child)=>{child.update()});
  }
}
