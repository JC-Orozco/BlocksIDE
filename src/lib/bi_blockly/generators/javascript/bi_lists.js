// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

module.exports = function(Blockly){
          //var goog = Blockly.goog;
          var goog = window.goog;
          //Blockly.Blocks={};
  
goog.provide('Blockly.JavaScript.bi_lists');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['bi_lists_create'] = function(block) {
  // Create a list with any number of elements of any type.
  let code = new Array(block.itemCount_);
  //const MAX_ITEM_COUNT = 999; // A large number to avoid infinite loops
  let itemCount = 0;
  
  //console.log('list inputs')
  for(let i in block.inputList){
    let input1 = block.inputList[i].name
    if(input1.substring(0,3) === 'ADD'){
      code[itemCount] = Blockly.JavaScript.valueToCode(block, input1, Blockly.JavaScript.ORDER_COMMA) || 'null';
      itemCount += 1;
    }
  }  
  
  var code_text = '[' + code.join(', ') + ']';
  return [code_text, Blockly.JavaScript.ORDER_ATOMIC];
};
  

return Blockly.JavaScript;
}