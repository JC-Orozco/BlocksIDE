var xmlns = "http://www.w3.org/2000/svg";

var p1 = document.createElementNS(xmlns, 'svg')
p1.setAttribute('id', 'svg')
p1.style.height = '300px'
p1.style.width = '300px'

pane1.appendChild(p1)

//console1.log(p1)

//var currentDiv = document.getElementById("svg");

//console.log(currentDiv)

var s = Snap('#svg')   //svg1)  // p1) //"#svg")

console.log(s)

var bigCircle = s.circle(150, 150, 100);
