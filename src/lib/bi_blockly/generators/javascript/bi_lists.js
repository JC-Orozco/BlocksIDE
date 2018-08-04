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
  var code = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var code_text = '[' + code.join(', ') + ']';
  return [code_text, Blockly.JavaScript.ORDER_ATOMIC];
};
  

return Blockly.JavaScript;
}