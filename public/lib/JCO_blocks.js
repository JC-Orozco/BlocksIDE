// Copyright Juan Carlos Orozco 2018

'use strict';
goog.provide('Blockly.Blocks.lists');
goog.require('Blockly.Blocks');

Blockly.Blocks.lists.HUE = 30;

var types = PLUS_MINUS_updateShape_types;

Blockly.Blocks['block_click1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("Profile1.png", 15, 15, "*", 
          function(e){
            // e is the FieldImage block.
            alert("Clicked. Check console for more info")
            console.log(e)
          }
         ));
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//{
//  "type": "test_block",
//  "message0": "some text %1 more text %2 %3 a new line %4 with a second input %5",
//  "args0": [
//    {
//      "type": "input_value",
//      "name": "FIRST"
//    },
//    {
//      "type": "input_value",
//      "name": "SECOND"
//    },
//    {
//      "type": "input_statement",
//      "name": "HIDE_ME"
//    },
//    {
//      "type": "input_value",
//      "name": "THIRD"
//    },
//    {
//      "type": "input_value",
//      "name": "FOURT"
//    }
//  ],
//  "inputsInline": true,
//  "previousStatement": null,
//  "nextStatement": null,
//  "tooltip": "",
//  "helpUrl": ""
//}
Blockly.Blocks['test_block'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("some text");
    this.appendValueInput("SECOND")
        .setCheck(null)
        .appendField("more text");
    this.appendStatementInput("HIDE_ME")
        .setCheck(null);
    this.appendValueInput("THIRD")
        .setCheck(null)
        .appendField("a new line");
    this.appendValueInput("FOURT")
        .setCheck(null)
        .appendField("with a second input");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

//{
//  "type": "test2_block",
//  "message0": "Block Name %1 %2 some text %3 more text %4 %5 a new line %6 with a second input %7 %8 a new line %9 with a second input %10",
//  "args0": [
//    {
//      "type": "input_dummy"
//    },
//    {
//      "type": "input_statement",
//      "name": "HIDE_ME"
//    },
//    {
//      "type": "input_value",
//      "name": "FIRST"
//    },
//    {
//      "type": "input_value",
//      "name": "SECOND"
//    },
//    {
//      "type": "input_statement",
//      "name": "HIDE_ME1"
//    },
//    {
//      "type": "input_value",
//      "name": "THIRD"
//    },
//    {
//      "type": "input_value",
//      "name": "FOURT"
//    },
//    {
//      "type": "input_statement",
//      "name": "HIDE_ME2"
//    },
//    {
//      "type": "input_value",
//      "name": "Fourth"
//    },
//    {
//      "type": "input_value",
//      "name": "Fifth"
//    }
//  ],
//  "inputsInline": true,
//  "previousStatement": null,
//  "nextStatement": null,
//  "tooltip": "",
//  "helpUrl": ""
//}
Blockly.Blocks['test2_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Block Name");
    this.appendStatementInput("HIDE_ME")
        .setCheck(null);
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("some text");
    this.appendValueInput("SECOND")
        .setCheck(null)
        .appendField("more text");
    this.appendStatementInput("HIDE_ME1")
        .setCheck(null);
    this.appendValueInput("THIRD")
        .setCheck(null)
        .appendField("a new line");
    this.appendValueInput("FOURT")
        .setCheck(null)
        .appendField("with a second input");
    this.appendStatementInput("HIDE_ME2")
        .setCheck(null);
    this.appendValueInput("Fourth")
        .setCheck(null)
        .appendField("line");
    this.appendValueInput("Fifth")
        .setCheck(null)
        .appendField("with a second input");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['lists_create'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.itemCount_ = 1;
    this.updateShape_();
    this.setOutput(true, 'Array');
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
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
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: PLUS_MINUS_updateShape_(types.PLAIN, 'ADD', "create list of")
};

Blockly.Blocks['named_list_create'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.itemCount_ = 1;
    this.itemNames_ = ["a", "b", "c"];
    this.updateShape_();
    this.setOutput(true, 'Array');
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    container.setAttribute('itemNames', this.itemNames_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.itemNames_ = xmlElement.getAttribute('itemNames').split(",");
    this.updateShape_();
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: PLUS_MINUS_updateShape_(types.NAMES, 'ADD', "create named list of")
};

Blockly.Blocks['named_list_create_ed'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.itemCount_ = 1;
    this.itemNames_ = ["a", "b", "c"];
    this.updateShape_();
    this.setOutput(true, 'Array');
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
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
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: PLUS_MINUS_updateShape_(types.NAMES_EDITABLE, 'ADD', "create named ed list of")
};

Blockly.Blocks['named_list_create_edx'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.itemCount_ = 1;
    this.itemNames_ = ["a", "b", "c"];
    this.updateShape_();
    this.setOutput(true, 'Array');
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
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
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: PLUS_MINUS_updateShape_(types.NAMES_EDITABLE_X, 'ADD', 'create named edx list of')
};

Blockly.Blocks['block_A1'] = {
  init: function() {
    //var clickImageField1 = 
    
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("A1")
        .appendField(new Blockly.FieldImage("Profile1.png", 15, 15, "*",
          function(e){
            // e is the FieldImage block.
            //alert("Clicked. Check console for more info")
            console.log(e)
            var text = prompt("Type block to insert (B1 or B2). Defaults to B1.")
      
            var name = 'B1'
            if(text == 'B2'){
              name = 'B2'
            }
            var workspace = Blockly.mainWorkspace
            var block1 = workspace.newBlock("block_"+name)
            block1.initSvg()
            block1.render()
            e.sourceBlock_.inputList[0].connection.connect(block1.outputConnection)
            
            // Remove the click image field when connected. Recreate when disconnected 
            // e.dispose()
      
            //e.sourceBlock_.inputList[0]
          }));
    this.setColour(315);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Removes clickimage when a new connection is created. Problem is that id does not regain the click image field when the connection is removed. It does have an onchange callback. But it is too costly because it gets called on any change on the workspace.
Blockly.Blocks['block_A2'] = {
  init: function() {
    //var clickImageField1 = 
    
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("A2")
        .appendField(new Blockly.FieldImage("Profile1.png", 15, 15, "*",
          function(e){
            // e is the FieldImage block.
            //alert("Clicked. Check console for more info")
            console.log(e)
            var text = prompt("Type block to insert (B1 or B2). Defaults to B1.")
      
            var name = 'B1'
            if(text == 'B2'){
              name = 'B2'
            }
            var workspace = Blockly.mainWorkspace
            var block1 = workspace.newBlock("block_"+name)
            block1.initSvg()
            block1.render()
            e.sourceBlock_.inputList[0].connection.connect(block1.outputConnection)
            
            // Remove the click image field when connected. Recreate when disconnected 
            e.dispose()
      
            //e.sourceBlock_.inputList[0]
          }));
    this.setColour(315);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOnChange(
      function(e){
        console.log("Block Changed")
        console.log(e)
      })
  }
};

// Click image gets disabled when a connection exists
Blockly.Blocks['block_A3'] = {
  init: function() {
    //var clickImageField1 = 
    
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("A3")
        .appendField(new Blockly.FieldImage("Profile1.png", 15, 15, "*",
          function(e){
            // e is the FieldImage block.
            //alert("Clicked. Check console for more info")
            console.log(e)
      //console.log(e.sourceBlock_.inputList[0].connection.targetConnection)
            if(e.sourceBlock_.inputList[0].connection.targetConnection){
              // It already has a connection
            } else {
      
              var text = prompt("Type block to insert (B1 or B2). Defaults to B1.")

              var name = 'B1'
              if(text == 'B2'){
                name = 'B2'
              }
              var workspace = Blockly.mainWorkspace
              var block1 = workspace.newBlock("block_"+name)
              block1.initSvg()
              block1.render()
              e.sourceBlock_.inputList[0].connection.connect(block1.outputConnection)
            }
            // Remove the click image field when connected. Recreate when disconnected 
            // e.dispose()
      
            //e.sourceBlock_.inputList[0]
          }));
    this.setColour(315);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['block_A4'] = {
  
  
  init: function() {
    function dynamicOptions() {
      var options = [];
      options.push(["none", "NONE"]);
      options.push(["B1", "B1"]);
      options.push(["B2", "B2"]);
      return options
    }

    function onChange(e) {
      console.log(e)
      //console.log(this) // FieldDropdown
      if(e=="NONE"){
        this.sourceBlock_.inputList[0].connection.disconnect()
          // dispose() // Message: disconnect before dispose
      } else {
        var workspace = Blockly.mainWorkspace
        var block1 = workspace.newBlock("block_"+e)
        block1.initSvg()
        block1.render()
        this.sourceBlock_.inputList[0].connection.connect(block1.outputConnection)
      }
    }

    var dropdown1 = new Blockly.FieldDropdown(dynamicOptions, onChange);
    
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("A4")
        .appendField(dropdown1, "DROPDOWN1");
    this.setColour(315);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['block_B1'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("B1");
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['block_B2'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("B2");
    this.setOutput(true, null);
    this.setColour(315);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};