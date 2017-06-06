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

bigCircle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 5
});

// Now lets create another small circle:
var smallCircle = s.circle(100, 150, 70);
// Lets put this small circle and another one into a group:
var discs = s.group(smallCircle, s.circle(200, 150, 70));