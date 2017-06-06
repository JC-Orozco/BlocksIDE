//foo.split(/\d/)

var workspace = Blockly.mainWorkspace

var xmlDom = Blockly.Xml.workspaceToDom(workspace);
var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
console.log(xmlText);