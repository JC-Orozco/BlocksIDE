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
 * @fileoverview Generating Pseudo for list blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Pseudo.lists');

goog.require('Blockly.Pseudo');


Blockly.Pseudo['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['a new empty list', Blockly.Pseudo.ORDER_ATOMIC];
};

Blockly.Pseudo['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var code;
  if (block.itemCount_ > 0) {
      code = new Array(block.itemCount_);
      for (var n = 0; n < block.itemCount_; n++) {
        code[n] = Blockly.Pseudo.valueToCode(block, 'ADD' + n,
            Blockly.Pseudo.ORDER_NONE) || '___';
      }
      code = 'a new list of these elements: ' + code.join(', ') + '';
  } else {
      code = 'a new empty list';
  }
  return [code, Blockly.Pseudo.ORDER_ATOMIC];
};

Blockly.Pseudo['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var argument0 = Blockly.Pseudo.valueToCode(block, 'ITEM',
      Blockly.Pseudo.ORDER_NONE) || '___';
  var argument1 = Blockly.Pseudo.valueToCode(block, 'NUM',
      Blockly.Pseudo.ORDER_MULTIPLICATIVE) || '___';
  var code = '[' + argument0 + '] * ' + argument1;
  return [code, Blockly.Pseudo.ORDER_MULTIPLICATIVE];
};

Blockly.Pseudo['lists_length'] = function(block) {
  // String or array length.
  var argument0 = Blockly.Pseudo.valueToCode(block, 'VALUE',
      Blockly.Pseudo.ORDER_NONE) || '___';
  return ['the length of ' + argument0, Blockly.Pseudo.ORDER_FUNCTION_CALL];
};

Blockly.Pseudo['lists_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var argument0 = Blockly.Pseudo.valueToCode(block, 'VALUE',
      Blockly.Pseudo.ORDER_NONE) || '___';
  var code = 'not len(' + argument0 + ')';
  return [code, Blockly.Pseudo.ORDER_LOGICAL_NOT];
};

Blockly.Pseudo['lists_indexOf'] = function(block) {
  // Find an item in the list.
  var argument0 = Blockly.Pseudo.valueToCode(block, 'FIND',
      Blockly.Pseudo.ORDER_NONE) || '___';
  var argument1 = Blockly.Pseudo.valueToCode(block, 'VALUE',
      Blockly.Pseudo.ORDER_MEMBER) || '___';
  var code;
  if (block.getFieldValue('END') == 'FIRST') {
    var functionName = Blockly.Pseudo.provideFunction_(
        'first_index',
        ['def ' + Blockly.Pseudo.FUNCTION_NAME_PLACEHOLDER_ + '(myList, elem):',
         '  try: theIndex = myList.index(elem) + 1',
         '  except: theIndex = 0',
         '  return theIndex']);
    code = functionName + '(' + argument1 + ', ' + argument0 + ')';
    return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
  } else {
    var functionName = Blockly.Pseudo.provideFunction_(
        'last_index',
        ['def ' + Blockly.Pseudo.FUNCTION_NAME_PLACEHOLDER_ + '(myList, elem):',
         '  try: theIndex = len(myList) - myList[::-1].index(elem)',
         '  except: theIndex = 0',
         '  return theIndex']);
    code = functionName + '(' + argument1 + ', ' + argument0 + ')';
    return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
  }
};

Blockly.Pseudo['lists_index'] = function(block) {
    var at = Blockly.Pseudo.valueToCode(block, 'ITEM',
      Blockly.Pseudo.ORDER_UNARY_SIGN) || '___';
    var list = Blockly.Pseudo.valueToCode(block, 'LIST',
      Blockly.Pseudo.ORDER_MEMBER) || '___';
    var code = list + '[' + at + ']';
    return [code, Blockly.Pseudo.ORDER_MEMBER];
}

Blockly.Pseudo['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.Pseudo.valueToCode(block, 'AT',
      Blockly.Pseudo.ORDER_UNARY_SIGN) || '___';
  var list = Blockly.Pseudo.valueToCode(block, 'VALUE',
      Blockly.Pseudo.ORDER_MEMBER) || '___';

  if (where == 'FIRST') {
    if (mode == 'GET') {
      var code = list + '[0]';
      return [code, Blockly.Pseudo.ORDER_MEMBER];
    } else {
      var code = list + '.pop(0)';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  } else if (where == 'LAST') {
    if (mode == 'GET') {
      var code = list + '[-1]';
      return [code, Blockly.Pseudo.ORDER_MEMBER];
    } else {
      var code = list + '.pop()';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  } else if (where == 'FROM_START') {
    // Blockly uses one-based indicies.
    if (Blockly.isNumber(at)) {
      // If the index is a naked number, decrement it right now.
      at = parseInt(at, 10) - 1;
    } else {
      // If the index is dynamic, decrement it in code.
      at = 'int(' + at + ' - 1)';
    }
    if (mode == 'GET') {
      var code = list + '[' + at + ']';
      return [code, Blockly.Pseudo.ORDER_MEMBER];
    } else {
      var code = list + '.pop(' + at + ')';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  } else if (where == 'FROM_END') {
    if (mode == 'GET') {
      var code = list + '[-' + at + ']';
      return [code, Blockly.Pseudo.ORDER_MEMBER];
    } else {
      var code = list + '.pop(-' + at + ')';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  } else if (where == 'RANDOM') {
    Blockly.Pseudo.definitions_['import_random'] = 'import random';
    if (mode == 'GET') {
      code = 'random.choice(' + list + ')';
      return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
    } else {
      var functionName = Blockly.Pseudo.provideFunction_(
          'lists_remove_random_item',
          ['def ' + Blockly.Pseudo.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
           '  x = int(random.random() * len(myList))',
           '  return myList.pop(x)']);
      code = functionName + '(' + list + ')';
      if (mode == 'GET_REMOVE') {
        return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return code + '\n';
      }
    }
  }
  throw 'Unhandled combination (lists_getIndex).';
};

Blockly.Pseudo['lists_setIndex'] = function(block) {
  // Set element at index.
  // Note: Until February 2013 this block did not have MODE or WHERE inputs.
  var list = Blockly.Pseudo.valueToCode(block, 'LIST',
      Blockly.Pseudo.ORDER_MEMBER) || '___';
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.Pseudo.valueToCode(block, 'AT',
      Blockly.Pseudo.ORDER_NONE) || '___';
  var value = Blockly.Pseudo.valueToCode(block, 'TO',
      Blockly.Pseudo.ORDER_NONE) || '___';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  // Closure, which accesses and modifies 'list'.
  function cacheList() {
    if (list.match(/^\w+$/)) {
      return '';
    }
    var listVar = Blockly.Pseudo.variableDB_.getDistinctName(
        'tmp_list', Blockly.Variables.NAME_TYPE);
    var code = listVar + ' = ' + list + '\n';
    list = listVar;
    return code;
  }
  if (where == 'FIRST') {
    if (mode == 'SET') {
      return list + '[0] = ' + value + '\n';
    } else if (mode == 'INSERT') {
      return list + '.insert(0, ' + value + ')\n';
    }
  } else if (where == 'LAST') {
    if (mode == 'SET') {
      return list + '[-1] = ' + value + '\n';
    } else if (mode == 'INSERT') {
      return list + '.append(' + value + ')\n';
    }
  } else if (where == 'FROM_START') {
    // Blockly uses one-based indicies.
    if (Blockly.isNumber(at)) {
      // If the index is a naked number, decrement it right now.
      at = parseInt(at, 10) - 1;
    } else {
      // If the index is dynamic, decrement it in code.
      at = 'int(' + at + ' - 1)';
    }
    if (mode == 'SET') {
      return list + '[' + at + '] = ' + value + '\n';
    } else if (mode == 'INSERT') {
      return list + '.insert(' + at + ', ' + value + ')\n';
    }
  } else if (where == 'FROM_END') {
    if (mode == 'SET') {
      return list + '[-' + at + '] = ' + value + '\n';
    } else if (mode == 'INSERT') {
      return list + '.insert(-' + at + ', ' + value + ')\n';
    }
  } else if (where == 'RANDOM') {
    Blockly.Pseudo.definitions_['import_random'] = 'import random';
    var code = cacheList();
    var xVar = Blockly.Pseudo.variableDB_.getDistinctName(
        'tmp_x', Blockly.Variables.NAME_TYPE);
    code += xVar + ' = int(random.random() * len(' + list + '))\n';
    if (mode == 'SET') {
      code += list + '[' + xVar + '] = ' + value + '\n';
      return code;
    } else if (mode == 'INSERT') {
      code += list + '.insert(' + xVar + ', ' + value + ')\n';
      return code;
    }
  }
  throw 'Unhandled combination (lists_setIndex).';
};

Blockly.Pseudo['lists_getSublist'] = function(block) {
  // Get sublist.
  var list = Blockly.Pseudo.valueToCode(block, 'LIST',
      Blockly.Pseudo.ORDER_MEMBER) || '___';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var at1 = Blockly.Pseudo.valueToCode(block, 'AT1',
      Blockly.Pseudo.ORDER_ADDITIVE) || '___';
  var at2 = Blockly.Pseudo.valueToCode(block, 'AT2',
      Blockly.Pseudo.ORDER_ADDITIVE) || '___';
  if (where1 == 'FIRST' || (where1 == 'FROM_START' && at1 == '1')) {
    at1 = '';
  } else if (where1 == 'FROM_START') {
    // Blockly uses one-based indicies.
    if (Blockly.isNumber(at1)) {
      // If the index is a naked number, decrement it right now.
      at1 = parseInt(at1, 10) - 1;
    } else {
      // If the index is dynamic, decrement it in code.
      at1 = 'int(' + at1 + ' - 1)';
    }
  } else if (where1 == 'FROM_END') {
    if (Blockly.isNumber(at1)) {
      at1 = -parseInt(at1, 10);
    } else {
      at1 = '-int(' + at1 + ')';
    }
  }
  if (where2 == 'LAST' || (where2 == 'FROM_END' && at2 == '1')) {
    at2 = '';
  } else if (where1 == 'FROM_START') {
    if (Blockly.isNumber(at2)) {
      at2 = parseInt(at2, 10);
    } else {
      at2 = 'int(' + at2 + ')';
    }
  } else if (where1 == 'FROM_END') {
    if (Blockly.isNumber(at2)) {
      // If the index is a naked number, increment it right now.
      // Add special case for -0.
      at2 = 1 - parseInt(at2, 10);
      if (at2 == 0) {
        at2 = '';
      }
    } else {
      // If the index is dynamic, increment it in code.
      Blockly.Pseudo.definitions_['import_sys'] = 'import sys';
      at2 = 'int(1 - ' + at2 + ') or sys.maxsize';
    }
  }
  var code = list + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.Pseudo.ORDER_MEMBER];
};

Blockly.Pseudo['lists_split'] = function(block) {
  // Block for splitting text into a list, or joining a list into text.
  var mode = block.getFieldValue('MODE');
  if (mode == 'SPLIT') {
    var value_input = Blockly.Pseudo.valueToCode(block, 'INPUT',
        Blockly.Pseudo.ORDER_MEMBER) || '___';
    var value_delim = Blockly.Pseudo.valueToCode(block, 'DELIM',
        Blockly.Pseudo.ORDER_NONE);
    var code = value_input + '.split(' + value_delim + ')';
  } else if (mode == 'JOIN') {
    var value_input = Blockly.Pseudo.valueToCode(block, 'INPUT',
        Blockly.Pseudo.ORDER_NONE) || '___';
    var value_delim = Blockly.Pseudo.valueToCode(block, 'DELIM',
        Blockly.Pseudo.ORDER_MEMBER) || '___';
    var code = value_delim + '.join(' + value_input + ')';
  } else {
    throw 'Unknown mode: ' + mode;
  }
  return [code, Blockly.Pseudo.ORDER_FUNCTION_CALL];
};

Blockly.Pseudo['lists_append'] = function(block) {
  // Append
  var list = Blockly.Pseudo.valueToCode(block, 'LIST',
      Blockly.Pseudo.ORDER_MEMBER) || '___';
  var value = Blockly.Pseudo.valueToCode(block, 'ITEM',
      Blockly.Pseudo.ORDER_NONE) || '___';
  return 'Append ' +value + ' to ' + list + ' (which must be a list).\n';
};