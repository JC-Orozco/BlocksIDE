function* idMaker(){
  var index = 0;
  while(true){
    index++;
    yield index;
  }
}

function* idMaker(){
  var index = 0;
  while(true){
    var x = yield* index++;
  }
}
