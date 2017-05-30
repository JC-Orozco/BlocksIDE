//var pi = 3.141593
//var str1 = "Hello"
//
//var a = function(x,y,z){
//  var b = function(u,v){
//  };
//};
//
//var str1 = "Hello"
//
//function sum (x, y) { return x + y }
//
//function a(x,y,z){
//  function b(u,v){
//    return u*v
//  }
//}

// This works for now as anonymous function
var f1 = (a,b,c) => {
  var x = a;
  var y = b;
  return x+y+c;
}

var args = [1,2,3];
f1(...args);

f1({a:2, b:3});