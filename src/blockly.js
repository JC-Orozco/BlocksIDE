// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

let Blockly;
if (typeof window !== 'undefined') {
  Blockly = require('../node_modules/node-blockly/browser-raw.js');
} else {
  Blockly = require('../node_modules/node-blockly/_blockly.js');
}
const biBlocks = require('./lib/bi_blockly/blocks/bi_blockly.js')
biBlocks(Blockly);

//import('../node_modules/blockpy/blockly/blocks/dicts.js')
//import('../node_modules/blockpy/blockly/blocks/corgis.js')
//import('../node_modules/blockpy/blockly/blocks/plot.js')

const blocklyJS = require('node-blockly/lib/javascript_compressed');
blocklyJS(Blockly);

const blocklyPy = require('node-blockly/lib/python_compressed');
blocklyPy(Blockly);

const biBlocksJS = require('./lib/bi_blockly/generators/javascript/bi_blockly.js')
biBlocksJS(Blockly);


import('../node_modules/blockpy/src/blockly_blocks/class.js')
import('../node_modules/blockpy/src/blockly_blocks/comment.js')
import('../node_modules/blockpy/src/blockly_blocks/comprehensions.js')
import('../node_modules/blockpy/src/blockly_blocks/decorator.js')
import('../node_modules/blockpy/src/blockly_blocks/dict.js')
import('../node_modules/blockpy/src/blockly_blocks/if.js')
import('../node_modules/blockpy/src/blockly_blocks/io.js')
import('../node_modules/blockpy/src/blockly_blocks/lists.js')
import('../node_modules/blockpy/src/blockly_blocks/loops.js')
import('../node_modules/blockpy/src/blockly_blocks/parking.js')
import('../node_modules/blockpy/src/blockly_blocks/sets.js')
import('../node_modules/blockpy/src/blockly_blocks/tuple.js')
import('../node_modules/blockpy/src/blockly_blocks/turtles.js')

//const biBlocksJS = require('../node_modules/blockpy/lib/  lib/bi_blockly/generators/javascript/bi_blockly.js')
//biBlocksJS(Blockly);
//
//const biBlocksJS = require('./lib/bi_blockly/generators/javascript/bi_blockly.js')
//biBlocksJS(Blockly);

// Set global function
window.PLUS_MINUS_updateShape = function(listItemName, startMessage) {
    return function() {
        var that = this;
        function addField(field, block, e) {
// JCOA: The new blockly does not send e information of the click up to this handler.
//  We are assumming add function for now:
          var input = that.appendValueInput(listItemName + that.itemCount_);
          that.itemCount_ += 1;

//            var rect = field.fieldGroup_.getBoundingClientRect();
//            var yPosition = e.clientY;
//            if (yPosition < rect.top+rect.height/2) {
//                var input = that.appendValueInput(listItemName + that.itemCount_);
//                that.itemCount_ += 1;
//            } else {
//                if (that.itemCount_ > 0) {
//                    that.itemCount_ -= 1;
//                    that.removeInput(listItemName + that.itemCount_)
//                }
//            }
        }
        function removeField(field, block, e) {
// JCOA: The new blockly does not send e information of the click up to this handler.
//  We are assumming remove function for now:
                if (that.itemCount_ > 0) {
                    that.itemCount_ -= 1;
                    that.removeInput(listItemName + that.itemCount_)
                }

//            var rect = field.fieldGroup_.getBoundingClientRect();
//            var yPosition = e.clientY;
//            if (yPosition < rect.top+rect.height/2) {
//                var input = that.appendValueInput(listItemName + that.itemCount_);
//                that.itemCount_ += 1;
//            } else {
//                if (that.itemCount_ > 0) {
//                    that.itemCount_ -= 1;
//                    that.removeInput(listItemName + that.itemCount_)
//                }
//            }
        }
        if (!this.getInput('REMOVE')) {
            var clickableMinus = new Blockly.FieldClickImage("images/minus-button.svg", 12, 24, '+', removeField, '-2px');
            //clickablePlusMinus.imageElement_.style.y = '-2px';
            this.appendDummyInput('REMOVE')
                .appendField(startMessage)
                .appendField(clickableMinus);
        }
        if (!this.getInput('START')) {
            var clickablePlus = new Blockly.FieldClickImage("images/plus-button.svg", 12, 24, '+', addField, '-2px');
            //clickablePlusMinus.imageElement_.style.y = '-2px';
            this.appendDummyInput('START')
                .appendField(clickablePlus);
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
          if (!this.getInput(listItemName + i)) {
            var input = this.appendValueInput(listItemName + i);
          }
        }
        // Remove deleted inputs.
        while (this.getInput(listItemName + i)) {
          this.removeInput(listItemName + i);
          i++;
        }
    }
}

window.PythonToBlocks = {
  KNOWN_MODULES:'',
  KNOWN_ATTR_FUNCTIONS:''
}

console.log("Blockly")

module.exports = Blockly;