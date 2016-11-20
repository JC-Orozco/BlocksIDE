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
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

goog.provide('Blockly.Blocks.mm');

goog.require('Blockly.Blocks');

// TODO: JCOA Add drop down list with operator options
Blockly.Blocks['bi_assignment'] = {
  init: function() {
    this.appendValueInput("left")
        .setCheck(null)
        .appendField("");
    this.appendValueInput("right")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("="), "operator");
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
    this.appendValueInput("left")
        .setCheck(null)
        .appendField("");
    this.appendValueInput("right")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("="), "operator");
    this.setInputsInline(true);
    this.setOutput(true);    
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_try_catch'] = {
  init: function() {
    this.appendStatementInput("try")
        .setCheck(null)
        .appendField("try");
    this.appendStatementInput("catch")
        .setCheck(null)
        .appendField("catch")
        .appendField(new Blockly.FieldTextInput(""), "parameter");    
    this.appendStatementInput("finally")
        .setCheck(null)
        .appendField("finally");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_catch'] = {
  init: function() {
    this.appendStatementInput("catch")
        .setCheck(null)
        .appendField("catch")
        .appendField(new Blockly.FieldTextInput(""), "parameter");    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_throw'] = {
  init: function() {
    this.appendValueInput("throw")
        .setCheck(null)
        .appendField("throw");
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
    this.appendValueInput("yield")
        .setCheck(null)
        .appendField("yield")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "delegate");
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
    this.appendValueInput("yield")
        .setCheck(null)
        .appendField("yield")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "delegate");
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
    this.appendStatementInput("export")
        .setCheck(null)
        .appendField("export");
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
        .appendField("import");
//    this.appendValueInput("import")
//        .setCheck(null)
//        .appendField("import");
    this.appendAddSubGroup("", 'items',null,
                           "");
    this.itemCount_ = 2;
    this.updateShape_();    
    this.appendValueInput("from")
        .setCheck(null)
        .appendField("from");
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
        .appendField(new Blockly.FieldTextInput(""), "input");
    this.appendDummyInput()
        .appendField("as")
        .appendField(new Blockly.FieldTextInput(""), "as");
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
        .appendField("Code part")
        .appendField(new Blockly.FieldTextInput(""), "code");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_code_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Code line")
        .appendField(new Blockly.FieldTextInput(""), "code");
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
        .appendField("set")
        .appendField(new Blockly.FieldVariable("item"), "variable");
    this.appendDummyInput()
        .appendField(".")
        .appendField(new Blockly.FieldTextInput(""), "field");
    this.appendValueInput("input")
        .appendField("to");
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
        .appendField("set")
        .appendField(new Blockly.FieldTextInput(""), "code");
    this.appendValueInput("input")
        .appendField("to");
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
    //        .appendField("for");
    this.appendStatementInput("init")
        .appendField("for init");
    this.appendValueInput("test")
        .appendField("test");
    this.appendStatementInput("update")
        .appendField("update");
    this.appendStatementInput("chain")
        .appendField("loop")
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
    this.appendValueInput("array")
        .appendField("for")
        .appendField(new Blockly.FieldTextInput("i"), "var")
        .appendField("in");
    this.appendStatementInput("chain")
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
    this.appendValueInput("switch")
        .setCheck(null)
        .appendField("switch");
    this.appendAddSubGroup("", 'items',null,
                           "");
    this.itemCount_ = 1;
    this.updateShape_();
    this.appendStatementInput("default")
        .setCheck(null)
        .appendField("default");
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
    this.appendValueInput("case")
        .setCheck(null)
        .appendField("case");
    this.appendStatementInput("statement")
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
        .appendField("continue");
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
        .appendField("break");
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks['bi_call_statement'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("call1"), "NAME")
        .appendField("(");
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendAddSubNamed("", 'items',
                           null,
                           "");
    this.itemCount_ = 1;
    this.updateShape_();
    this.appendValueInput("chain")
        .appendField(")")
        .setCheck(null);  // (["Method", "Field"]);
    this.setInputsInline(true);
    //this.setOutput(true, null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
  }
};

Blockly.Blocks['bi_call'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("call1"), "NAME")
        .appendField("(");
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendAddSubNamed("n1", 'items',
                           null,
                           "n1");
    this.itemCount_ = 1;
    this.updateShape_();
    this.appendValueInput("chain")
        .appendField(")")
        .setCheck(null); // (["Method", "Field"]);
    this.setInputsInline(true);
    this.setOutput(true, null); // "Method");
//    this.setPreviousStatement(true, null);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
  }
};

Blockly.Blocks['bi_function_call'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("method1"), "NAME")
        .appendField("()");
    // this.appendValueInput("NAME")
    //  .setCheck("String")
    //  .appendField("function name:");
    // this.appendDummyInput()
    //  .appendField("____");
    //this.setInputsInline(false);
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    if (this.workspace.options.useMutators) {
      this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    } else {
      this.appendAddSubGroup("         args", 'items',
                             null,
                             "         args");
    }
    this.appendStatementInput("chain")
        .setCheck(null); // (["Method", "Field"]);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setPreviousStatement(true, null); // "Method");
    //this.setOutput(true, 'Array');
    this.setTooltip('');
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Blockly.Blocks['bi_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["function", "function"], ["generator", "function*"]]), "function_type")
        .appendField("(")
        .appendField(new Blockly.FieldTextInput("arg1, arg2, etc"), "args")
        .appendField(")");
    this.appendStatementInput("chain")
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
        .appendField(new Blockly.FieldDropdown([["function", "function "], ["generator", "function* "], ["method", ""]]), "function_type")
        .appendField(new Blockly.FieldTextInput("name"), "name")
        .appendField("(")
        .appendField(new Blockly.FieldTextInput("arg1, arg2, etc"), "args")
        .appendField(")");
    this.appendStatementInput("chain")
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
    this.appendValueInput("ret")
        .setCheck(null)
        .appendField("return")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_var'] = {
  init: function() {
    this.appendValueInput("val")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["var", "var"], ["let", "let"], ["const", "const"]]), "var_type")
        .appendField(new Blockly.FieldTextInput("var1"), "var");
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
        .appendField("")
        .appendField(new Blockly.FieldTextInput("var1"), "NAME");
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_new'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("new");
    this.appendStatementInput("chain")
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
        .appendField("class")
        .appendField(new Blockly.FieldTextInput(""), "NAME");
    this.appendDummyInput()
        .appendField("extends")
        .appendField(new Blockly.FieldTextInput(""), "extends");
    this.appendStatementInput("chain")
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
        .appendField("class")
        .appendField(new Blockly.FieldTextInput("Name"), "NAME");
    this.appendDummyInput()
        .appendField("extends")
        .appendField(new Blockly.FieldTextInput(""), "extends");
    this.appendStatementInput("chain")
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
    this.appendStatementInput("static")
        .setCheck(null)
        .appendField("static");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_get'] = {
  init: function() {
    this.appendStatementInput("get")
        .setCheck(null)
        .appendField("get");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_set'] = {
  init: function() {
    this.appendStatementInput("set")
        .setCheck(null)
        .appendField("set");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_field'] = {
  init: function() {
    this.appendValueInput("chain")
        .appendField("")
        .appendField(new Blockly.FieldTextInput("field1"), "NAME")
        .setCheck(null); // (["Field","Method"]);
    this.setOutput(true, null); // "Field");
    //this.setPreviousStatement(true, "Field");
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_field_statement'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("")
        .appendField(new Blockly.FieldTextInput("field1"), "NAME");
    this.appendValueInput("chain")
        .setCheck(null); // (["Field","Method"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_adaptor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("");
    this.appendStatementInput("chain")
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
        .appendField("");
    this.appendStatementInput("chain")
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
    this.appendValueInput("expression")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("++"), "operator");
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
    this.appendValueInput("expression")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput("++"), "operator");
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
    this.appendValueInput("arg_array")
        .setCheck(null)
        .appendField("...");
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['bi_parenthesis'] = {
  init: function() {
    this.appendValueInput("expression")
        .setCheck(null)
        .appendField("(_)");
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
