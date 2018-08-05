/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for maps blocks.
 * @author toebes@extremenetworks.com (John Toebes)
 */
//'use strict';


module.exports = function(Blockly){
          //var goog = Blockly.goog;
          var goog = window.goog;
          //Blockly.Blocks={};
  
goog.provide('Blockly.JavaScript.bi_maps');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['maps_create_empty'] = function(block) {
  // Create an empty map.
  return ['{}', Blockly.JavaScript.ORDER_ATOMIC];
};

// Blockly.JavaScript['maps_create_with'] = function(block) {
//   // Create a map with any number of elements of any type.
//   var declVar = Blockly.JavaScript.variableDB_.getDistinctName(
//       'hashMap', Blockly.Variables.NAME_TYPE);
//   var declCode = 'var ' + declVar + ' = {};\n';
//   Blockly.JavaScript.stashStatement(declCode);
//   for (var n = 0; n < block.itemCount_; n++) {
//     var inputName = 'ADD' + n;
//     // var inputName = 'items' + n;
//     var inputBlock = block.getInputTargetBlock(inputName);
//     if (inputBlock) {
//       if (inputBlock.type === 'maps_create') {
//         var val = Blockly.JavaScript.valueToCode(inputBlock, 'VAL',
//             Blockly.JavaScript.ORDER_NONE) || 'null';
//         var key = Blockly.JavaScript.valueToCode(inputBlock, 'KEY',
//             Blockly.JavaScript.ORDER_NONE) || '""';
//         declCode = declVar + "[" + key + "] = " + val + ";\n";
//         Blockly.JavaScript.stashStatement(declCode);
//       } else {
//         var itemCode = Blockly.JavaScript.valueToCode(block, inputName,
//             Blockly.JavaScript.ORDER_NONE);
//         if (itemCode) { //this is assuming jquery is available
//           declCode = '$.extend({}, '+declVar + ', ' + itemCode + ');\n';
//           Blockly.JavaScript.stashStatement(declCode);
//         }
//       }
//     }
//   }
//   return [declVar, Blockly.JavaScript.ORDER_ATOMIC];
// };

Blockly.JavaScript['bi_maps_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  let code = new Array(block.itemCount_);
  //const MAX_ITEM_COUNT = 999; // A large number to avoid infinite loops
  let itemCount = 0;
  
  //console.log('bi_maps_create_with generator')
  //console.log(block)
  //console.log('list inputs')
  for(let i in block.inputList){
    let input1 = block.inputList[i].name
    if(input1.substring(0,3) === 'ADD'){
      // JCOA Hack: Removes ADD from input1 to get the item number to getFieldValue name.
      ///let name = block.getFieldValue('NAME'+input1.slice(3))
      let value = Blockly.JavaScript.valueToCode(block, input1, Blockly.JavaScript.ORDER_COMMA) || 'null'
      code[itemCount] = value ///name+':'+value;
      itemCount += 1;
    }
  }  
  
  var code_text = '{' + code.join(', ') + '}';
  return [code_text, Blockly.JavaScript.ORDER_ATOMIC];
};
  
Blockly.JavaScript['maps_create_with'] = function(block) {
  // Create a map with any number of elements of any type.
  //var text_name = block.getFieldValue('NAME');
  //var code_text = 'var '+text_name+' = {\n'
  var code = new Array(block.itemCount_-1);
  //for (var n = 0; n < block.itemCount_; n++) { // TODO: JCOA Go back to this line and delete -1 above and below when AddSubGroup item count is fixed to represent the real number of items and not items+1
  for (var n = 1; n < block.itemCount_; n++) {
    code[n-1] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    // code[n] = Blockly.JavaScript.valueToCode(block, 'items' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';

    // var inputName = 'ADD' + n;
    // // var inputName = 'items' + n;
    // var inputBlock = block.getInputTargetBlock(inputName);
    // if (inputBlock) {
    //   if (inputBlock.type === 'maps_create') {
    //     var val = Blockly.JavaScript.valueToCode(inputBlock, 'VAL',
    //         Blockly.JavaScript.ORDER_NONE) || 'null';
    //     var key = Blockly.JavaScript.valueToCode(inputBlock, 'KEY',
    //         Blockly.JavaScript.ORDER_NONE) || '""';
    //     // TODO: JCOA, why do we need to do this again if maps_create already does this. Maybe only use the value from that block.
    //     if(n < block.itemCount_-1){
    //       code += "  " + key + ": " + val + ",\n";
    //     }else{
    //       code += "  " + key + ": " + val + "\n";
    //     }
    //   }
    // }
  }
  var code_text = '{' + code.join(', ') + '}';
  //return code_text;
  return [code_text, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['maps_length'] = function(block) {
  // List length.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'MAP',
      Blockly.JavaScript.ORDER_NONE) || '{}';
  return [argument0 + '.length', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['maps_isempty'] = function(block) {
  // Is the list empty?
  var argument0 = Blockly.JavaScript.valueToCode(block, 'MAP',
      Blockly.JavaScript.ORDER_NONE) || '';
  var code = argument0 + '.length == 0';
  if (argument0 === '') {
    code = 'true';
  }
  return [code, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

Blockly.JavaScript['maps_create'] = function(block) {
  var val = Blockly.JavaScript.valueToCode(block, 'VAL',
      Blockly.JavaScript.ORDER_NONE) || 'null';
  var key = Blockly.JavaScript.valueToCode(block, 'KEY',
      Blockly.JavaScript.ORDER_NONE) || '""';
  //var declVar = Blockly.JavaScript.variableDB_.getDistinctName(
  //    'hashMap', Blockly.Variables.NAME_TYPE);

  //var declCode = declVar + ' = {};\n' +
  //    declVar + '[' + key + '] = ' + val + ';\n';
  //Blockly.JavaScript.stashStatement(declCode);
  //return [declVar, Blockly.JavaScript.ORDER_LOGICAL_NOT];
  var code = key + ": " + val;
  //return [code, Blockly.JavaScript.ORDER_LOGICAL_NOT];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['maps_getIndex'] = function(block) {
  var mode = block.getFieldValue('MODE') || 'GET';
  var key = Blockly.JavaScript.valueToCode(block, 'KEY',
      Blockly.JavaScript.ORDER_NONE) || '""';
  var map = Blockly.JavaScript.valueToCode(block, 'MAP',
      Blockly.JavaScript.ORDER_MEMBER) || '';
  var code;
  
  if (mode === 'GET') {
    code = map + '[' + key + ']';
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  } else {
    if (mode === 'GET_REMOVE') {
      code = map + '[' + key + '];\n';
      code += 'delete ' + map + '[' + key + ']';
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    } else if (mode === 'REMOVE') {
      code = 'delete ' + map + '[' + key + ']';
      return code + ';\n';
    }
  }
  throw new Error('Unhandled combination (maps_getIndex).');
};

Blockly.JavaScript['maps_setIndex'] = function(block) {
  // Is the list empty?
  var map = Blockly.JavaScript.valueToCode(block, 'MAP',
      Blockly.JavaScript.ORDER_MEMBER) || '{}';
  var val = Blockly.JavaScript.valueToCode(block, 'VAL',
      Blockly.JavaScript.ORDER_NONE) || 'null';
  var key = Blockly.JavaScript.valueToCode(block, 'KEY',
      Blockly.JavaScript.ORDER_NONE) || '""';
  var code = map + '[' + key + '] = '+ val + ';\n';
  return code;
};

Blockly.JavaScript['maps_keys'] = function(block) {
  // Is the list empty?
  var argument0 = Blockly.JavaScript.valueToCode(block, 'MAP',
      Blockly.JavaScript.ORDER_NONE) || '{}';
  var code = 'Object.keys(' + argument0 + ')';
  return [code, Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

Blockly.JavaScript['controls_forEachKey'] = Blockly.JavaScript['controls_forEach']
  
return Blockly.JavaScript;
}