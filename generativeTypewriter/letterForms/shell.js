var ShellLetter = function(mapping){
  this.locations = mapping
  this.children = [];
  this.remove = function(element) {
    const index = this.locations.indexOf(element);
    if (index !== -1) {
      this.locations.splice(index, 1);
    }
  }
  this.hasNeighbor = function(x,y,dx,dy){
    neighborX = x+dx;
    neighborY = y+dy;
    if (neighborX <= 0 || neighborX >= IMAGE_WIDTH
     || neighborY <= 0 || neighborY >= IMAGE_HEIGHT){
       return -1;
     }
    found = (this.locations.find(function(element){
      return ((element[0] == neighborX) && (element[1] == neighborY))
    }))
    if(found){
      return 2;
    }
    return 1;
  }
  this.removeData = [];
  this.hasLongChain = function(arr,threshold,area){
    curMax = 0;
    for (var dx = -1; dx <= 1; dx++){
      for (var dy = -1; dy <= 1; dy++){
        res = this.howManyBlack(arr[0],arr[1],dx,dy,0,area)
        curMax += res;
      }
    }
    if(curMax >= threshold){
      this.removeData.push(arr);
    }
  }
  this.howManyBlack = function(x,y,dx,dy,sum = 0,area){
    counter = 1;
    curX = dx;
    curY = dy;
    while(counter < area){
      res = this.hasNeighbor(x,y,curX,curY)
      if(res==2){
        sum ++;
      }
      counter ++;
      curX = counter * dx;
      curY = counter * dy;
    }
    return sum;
  }
  for(var i = 0; i < this.locations.length; i++){
    this.hasLongChain(this.locations[i],13,3);
  }
  console.log(this.removeData.length/this.locations.length)
  this.removeData.map((cur)=>{
    this.remove(cur);
  })

  this.locations.map((cur)=>{
    curShape = new SubLetter(cur[0],cur[1],settings.xSpace,settings.ySpace)
    this.children.push(curShape);
  })
  this.draw = function(){
    this.children.forEach((child)=>{child.draw()});
  }
  this.update = function(){
    this.children.map((child)=>{child.update()});
  }
}
