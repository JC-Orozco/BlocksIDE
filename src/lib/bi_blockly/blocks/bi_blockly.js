// BlocksIDE is a project to create a complete js Blocks Development Platform
//
// Copyright 2016 Juan Carlos Orozco
//
// BlocksIDE was written by Juan Carlos Orozco and released under an Apache version 2 license.
//
// Git repositories for BlocksIDE are available at
//
// https://github.com/JC-Orozco/BlocksIDE
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

module.exports = function(Blockly){
          var goog = Blockly.goog;
          //Blockly.Blocks={};

//'use strict';

goog.provide('Blockly.Blocks.mm');

goog.require('Blockly.Blocks');
  
// TODO: JCOA Add drop down list with operator options
Blockly.Blocks['bi_assignment'] = {
  init: function() {
    this.appendValueInput('left')
        .setCheck(null)
        .appendField('');
    this.appendValueInput('right')
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput('='), 'operator');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

// TODO: JCOA Add drop down list with operator options
Blockly.Blocks['bi_assignment_return'] = {
  init: function() {
    this.appendValueInput('left')
        .setCheck(null)
        .appendField('');
    this.appendValueInput('right')
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput('='), 'operator');
    this.setInputsInline(true);
    this.setOutput(true);    
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_math_arithmetic'] = {
    /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
         [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
         [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
         [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE'],
         [Blockly.Msg.MATH_POWER_SYMBOL, 'POWER']];
    this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, 'Number');
    this.appendValueInput('A')
        .setCheck(null); // .setCheck('Number');
    this.appendValueInput('B')
        .setCheck(null) // .setCheck('Number')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['bi_try_catch'] = {
  init: function() {
    this.appendStatementInput('try')
        .setCheck(null)
        .appendField('try');
    this.appendStatementInput('catch')
        .setCheck(null)
        .appendField('catch')
        .appendField(new Blockly.FieldTextInput(''), 'parameter');    
    this.appendStatementInput('finally')
        .setCheck(null)
        .appendField('finally');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_catch'] = {
  init: function() {
    this.appendStatementInput('catch')
        .setCheck(null)
        .appendField('catch')
        .appendField(new Blockly.FieldTextInput(''), 'parameter');    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_throw'] = {
  init: function() {
    this.appendValueInput('throw')
        .setCheck(null)
        .appendField('throw');
    // this.setOutput(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_yield'] = {
  init: function() {
    this.appendValueInput('yield')
        .setCheck(null)
        .appendField('yield')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'delegate');
    //this.setOutput(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_yield_return'] = {
  init: function() {
    this.appendValueInput('yield')
        .setCheck(null)
        .appendField('yield')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'delegate');
    this.setOutput(true);
//    this.setPreviousStatement(true, null);
//    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_export'] = {
  init: function() {
    this.appendStatementInput('export')
        .setCheck(null)
        .appendField('export');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_import'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('import');
//    this.appendValueInput('import')
//        .setCheck(null)
//        .appendField('import');
    this.appendAddSubGroup('', 'items',null,
                           '');
    this.itemCount_ = 2;
    this.updateShape_();    
    this.appendValueInput('from')
        .setCheck(null)
        .appendField('from');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_import_as'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(''), 'input');
    this.appendDummyInput()
        .appendField('as')
        .appendField(new Blockly.FieldTextInput(''), 'as');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_code_part'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Code part')
        .appendField(new Blockly.FieldTextInput(''), 'code');
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_code_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Code line')
        .appendField(new Blockly.FieldTextInput(''), 'code');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_access_field'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('set')
        .appendField(new Blockly.FieldVariable('item'), 'variable');
    this.appendDummyInput()
        .appendField('.')
        .appendField(new Blockly.FieldTextInput(''), 'field');
    this.appendValueInput('input')
        .appendField('to');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_set_to'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('set')
        .appendField(new Blockly.FieldTextInput(''), 'code');
    this.appendValueInput('input')
        .appendField('to');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_for'] = {
  init: function() {
    //    this.appendDummyInput()
    //        .appendField('for');
    this.appendStatementInput('init')
        .appendField('for init');
    this.appendValueInput('test')
        .appendField('test');
    this.appendStatementInput('update')
        .appendField('update');
    this.appendStatementInput('chain')
        .appendField('loop')
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setInputsInline(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

// Generate a let (variable name) instruction on the js generator.
Blockly.Blocks['bi_for_in'] = {
  init: function() {
    this.appendValueInput('array')
        .appendField('for')
        .appendField(new Blockly.FieldTextInput('i'), 'var')
        .appendField('in');
    this.appendStatementInput('chain')
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setInputsInline(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

// JCOA: Use bi_case on each switch row
Blockly.Blocks['bi_switch'] = {
  init: function() {
    this.appendValueInput('switch')
        .setCheck(null)
        .appendField('switch');
    this.appendAddSubGroup('', 'items',null,
                           '');
    this.itemCount_ = 1;
    this.updateShape_();
    this.appendStatementInput('default')
        .setCheck(null)
        .appendField('default');
    this.setInputsInline(false);
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //    this.setOutput(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_case'] = {
  init: function() {
    this.appendValueInput('case')
        .setCheck(null)
        .appendField('case');
    this.appendStatementInput('statement')
        .setCheck(null);
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.setOutput(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_continue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('continue');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('break');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_s1'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendAddSubStatement('for init', 'items',
                             null,
                             '');
    this.appendValueInput('test')
        .appendField('test')
        .setCheck(null);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setInputsInline(false);
    this.setPreviousStatement(true, null); // 'Method');
    this.setNextStatement(true, null); // 'Method');
    //this.setOutput(true, 'Array');
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_call'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('call1'), 'NAME')
        .appendField('(');
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendAddSubNamed('', 'items',
                           null,
                           '');
    this.itemCount_ = 1;
    this.updateShape_();
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null);  // (['Method', 'Field']);
    this.setInputsInline(true);
    //this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
  }
};

Blockly.Blocks['bi_call_return'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('fcall1'), 'NAME')
        .appendField('(');
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendAddSubNamed('n1', 'items',
                           null,
                           'n1');
    this.itemCount_ = 1;
    this.updateShape_();
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null); // (['Method', 'Field']);
    this.setInputsInline(true);
    this.setOutput(true, null); // 'Method');
//    this.setPreviousStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
  }
};

Blockly.Blocks['bi_call_editable'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('fcall1'), 'NAME')
        .appendField('(');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendAddSubGroup('', 'items',
                             null,
                             '');
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null); // (['Method', 'Field']);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); // 'Method');
    this.setNextStatement(true, null); // 'Method');
    //this.setOutput(true, 'Array');
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_call_editable_return'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('fcall1'), 'NAME')
        .appendField('(');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendAddSubGroup('', 'items',
                             null,
                             '');
    this.appendValueInput('chain')
        .appendField(')')
        .setCheck(null); // (['Method', 'Field']);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setInputsInline(true);
    //this.setPreviousStatement(true, null); // 'Method');
    //this.setNextStatement(true, null); // 'Method');
    this.setOutput(true, 'Array');
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['function', 'function'], ['generator', 'function*']]), 'function_type')
        .appendField('(')
        .appendField(new Blockly.FieldTextInput('arg1, arg2, etc'), 'args')
        .appendField(')');
    this.appendStatementInput('chain')
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_named_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['function', 'function '], ['generator', 'function* '], ['method', '']]), 'function_type')
        .appendField(new Blockly.FieldTextInput('name'), 'name')
        .appendField('(')
        .appendField(new Blockly.FieldTextInput('arg1, arg2, etc'), 'args')
        .appendField(')');
    this.appendStatementInput('chain')
        .setCheck(null);
    //this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_return'] = {
  init: function() {
    this.appendValueInput('ret')
        .setCheck(null)
        .appendField('return')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_var'] = {
  init: function() {
    this.appendValueInput('val')
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([['var', 'var'], ['let', 'let'], ['const', 'const']]), 'var_type')
        .appendField(new Blockly.FieldTextInput('var1'), 'var');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_var_name'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('')
        .appendField(new Blockly.FieldTextInput('var1'), 'NAME');
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_new'] = {
  init: function() {
    this.appendValueInput('chain')
        .appendField('new')
        .setCheck(null);
    //this.setPreviousStatement(true, null);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_anonymous_class'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('class')
        .appendField(new Blockly.FieldTextInput(''), 'NAME');
    this.appendDummyInput()
        .appendField('extends')
        .appendField(new Blockly.FieldTextInput(''), 'extends');
    this.appendStatementInput('chain')
        .setCheck(null);
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);
    this.setOutput(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_class'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('class')
        .appendField(new Blockly.FieldTextInput('Name'), 'NAME');
    this.appendDummyInput()
        .appendField('extends')
        .appendField(new Blockly.FieldTextInput(''), 'extends');
    this.appendStatementInput('chain')
        .setCheck(null);
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_static'] = {
  init: function() {
    this.appendStatementInput('static')
        .setCheck(null)
        .appendField('static');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_get'] = {
  init: function() {
    this.appendStatementInput('get')
        .setCheck(null)
        .appendField('get');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_set'] = {
  init: function() {
    this.appendStatementInput('set')
        .setCheck(null)
        .appendField('set');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_field'] = {
  init: function() {
    this.appendValueInput('chain')
        .appendField(new Blockly.FieldTextInput('field1'), 'NAME')
        .setCheck(null); // (['Field','Method']);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_field_return'] = {
  init: function() {
    this.appendValueInput('chain')
        .appendField('')
        .appendField(new Blockly.FieldTextInput('field1'), 'NAME')
        .setCheck(null); // (['Field','Method']);
    this.setOutput(true, null); // 'Field');
    //this.setPreviousStatement(true, 'Field');
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_string_return'] = {
  init: function() {
    this.appendValueInput('chain')
        .appendField('"')
        .appendField(new Blockly.FieldTextInput(''), 'NAME')
        .appendField('"')
        .setCheck(null); // (['Field','Method']);
    this.setOutput(true, null); // 'Field');
    //this.setPreviousStatement(true, 'Field');
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
  
Blockly.Blocks['bi_index'] = {
  init: function() {
    this.appendValueInput('index')
        .appendField('[')
        .setCheck(null); // (['Field','Method']);
    this.appendValueInput('chain')
        .appendField(']')
        .setCheck(null); // (['Field','Method']);
    this.setInputsInline(true);
    this.setOutput(true, null); // 'Field');
    //this.setPreviousStatement(true, 'Field');
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_adaptor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('');
    this.appendStatementInput('chain')
        .setCheck(null);
    //this.setPreviousStatement(true, null);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_statement'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('');
    this.appendStatementInput('chain')
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

// TODO: JCOA Make a drop down list of unary operators
Blockly.Blocks['bi_unary'] = {
  init: function() {
    this.appendValueInput('expression')
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput('++'), 'operator');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_unary_return'] = {
  init: function() {
    this.appendValueInput('expression')
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput('++'), 'operator');
//    this.setPreviousStatement(true, null);
//    this.setNextStatement(true, null);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_spread'] = {
  init: function() {
    this.appendValueInput('arg_array')
        .setCheck(null)
        .appendField('...');
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_parenthesis'] = {
  init: function() {
    this.appendValueInput('expression')
        .setCheck(null)
        .appendField('(_)');
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
return Blockly.Blocks;
}