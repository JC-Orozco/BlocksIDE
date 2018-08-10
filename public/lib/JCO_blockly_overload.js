// Copyright Juan Carlos Orozco 2018

Blockly.FieldImage.prototype.EDITABLE = true

Blockly.Msg["MAPS_HUE"] = 345;

// https://groups.google.com/forum/#!topic/blockly/Bf6mp2vBTUc
/**
 * Computes the height and widths for each row and field.
 * @param {number} iconWidth Offset of first row due to icons.
 * @return {!Array.<!Array.<!Object>>} 2D array of objects, each containing
 *     position information.
 * @private
 */
Blockly.BlockSvg.prototype.renderCompute_ = function(iconWidth) {
  var inputList = this.inputList;
  var inputRows = [];
  inputRows.rightEdge = iconWidth + Blockly.BlockSvg.SEP_SPACE_X * 2;
  if (this.previousConnection || this.nextConnection) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge,
        Blockly.BlockSvg.NOTCH_WIDTH + Blockly.BlockSvg.SEP_SPACE_X);
  }
  var fieldValueWidth = 0;  // Width of longest external value field.
  var fieldStatementWidth = 0;  // Width of longest statement field.
  var hasValue = false;
  var hasStatement = false;
  var hasDummy = false;
  var lastType = undefined;
  
  var lastName = ''; // Modified

  // JCOA: Allows HIDE_MExxx tags on the statement input name to hide it.
  var isInline = this.getInputsInline() && !this.isCollapsed();
  for (var i = 0, input; input = inputList[i]; i++) {
    if (!input.isVisible() || input.name.substring(0,7) == 'HIDE_ME') {
      lastName = input.name;
      continue;
    }
    var row;
    if (!isInline || !lastType ||
        lastType == Blockly.NEXT_STATEMENT ||
        input.type == Blockly.NEXT_STATEMENT || lastName.substring(0,7) == 'HIDE_ME') {
      // Create new row.
      lastType = input.type;
      
      lastName = input.name;
      
      row = [];
      if (isInline && input.type != Blockly.NEXT_STATEMENT) {
        row.type = Blockly.BlockSvg.INLINE;
      } else {
        row.type = input.type;
      }
      row.height = 0;
      inputRows.push(row);
    } else {
      row = inputRows[inputRows.length - 1];
    }
    row.push(input);

    // Compute minimum input size.
    input.renderHeight = Blockly.BlockSvg.MIN_BLOCK_Y;
    // The width is currently only needed for inline value inputs.
    if (isInline && input.type == Blockly.INPUT_VALUE) {
      input.renderWidth = Blockly.BlockSvg.TAB_WIDTH +
          Blockly.BlockSvg.SEP_SPACE_X * 1.25;
    } else {
      input.renderWidth = 0;
    }
    // Expand input size if there is a connection.
    if (input.connection && input.connection.isConnected()) {
      var linkedBlock = input.connection.targetBlock();
      var bBox = linkedBlock.getHeightWidth();
      input.renderHeight = Math.max(input.renderHeight, bBox.height);
      input.renderWidth = Math.max(input.renderWidth, bBox.width);
    }
    // Blocks have a one pixel shadow that should sometimes overhang.
    if (!isInline && i == inputList.length - 1) {
      // Last value input should overhang.
      input.renderHeight--;
    } else if (!isInline && input.type == Blockly.INPUT_VALUE &&
        inputList[i + 1] && inputList[i + 1].type == Blockly.NEXT_STATEMENT) {
      // Value input above statement input should overhang.
      input.renderHeight--;
    }

    row.height = Math.max(row.height, input.renderHeight);
    input.fieldWidth = 0;
    if (inputRows.length == 1) {
      // The first row gets shifted to accommodate any icons.
      input.fieldWidth += this.RTL ? -iconWidth : iconWidth;
    }
    var previousFieldEditable = false;
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      if (j != 0) {
        input.fieldWidth += Blockly.BlockSvg.SEP_SPACE_X;
      }
      // Get the dimensions of the field.
      var fieldSize = field.getSize();
      field.renderWidth = fieldSize.width;
      field.renderSep = (previousFieldEditable && field.EDITABLE) ?
          Blockly.BlockSvg.SEP_SPACE_X : 0;
      input.fieldWidth += field.renderWidth + field.renderSep;
      row.height = Math.max(row.height, fieldSize.height);
      previousFieldEditable = field.EDITABLE;
    }

    if (row.type != Blockly.BlockSvg.INLINE) {
      if (row.type == Blockly.NEXT_STATEMENT) {
        hasStatement = true;
        fieldStatementWidth = Math.max(fieldStatementWidth, input.fieldWidth);
      } else {
        if (row.type == Blockly.INPUT_VALUE) {
          hasValue = true;
        } else if (row.type == Blockly.DUMMY_INPUT) {
          hasDummy = true;
        }
        fieldValueWidth = Math.max(fieldValueWidth, input.fieldWidth);
      }
    }
  }

  // Make inline rows a bit thicker in order to enclose the values.
  for (var y = 0, row; row = inputRows[y]; y++) {
    row.thicker = false;
    if (row.type == Blockly.BlockSvg.INLINE) {
      for (var z = 0, input; input = row[z]; z++) {
        if (input.type == Blockly.INPUT_VALUE) {
          row.height += 2 * Blockly.BlockSvg.INLINE_PADDING_Y;
          row.thicker = true;
          break;
        }
      }
    }
  }

  // Compute the statement edge.
  // This is the width of a block where statements are nested.
  inputRows.statementEdge = 2 * Blockly.BlockSvg.SEP_SPACE_X +
      fieldStatementWidth;
  // Compute the preferred right edge.  Inline blocks may extend beyond.
  // This is the width of the block where external inputs connect.
  if (hasStatement) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge,
        inputRows.statementEdge + Blockly.BlockSvg.NOTCH_WIDTH);
  }
  if (hasValue) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth +
        Blockly.BlockSvg.SEP_SPACE_X * 2 + Blockly.BlockSvg.TAB_WIDTH);
  } else if (hasDummy) {
    inputRows.rightEdge = Math.max(inputRows.rightEdge, fieldValueWidth +
        Blockly.BlockSvg.SEP_SPACE_X * 2);
  }

  inputRows.hasValue = hasValue;
  inputRows.hasStatement = hasStatement;
  inputRows.hasDummy = hasDummy;
  return inputRows;
};

/*
// JCO Note: Attempt to extract the common parts of the 
// PLUS_MINUS_updateShapeXXX functions
var jco_blockly_utils = {
  removeField: function(e, that){
      // e is the FieldImage block.
      //alert("Clicked. Check console for more info")
      console.log(e)
      if (that.itemCount_ > 0) {
          that.itemCount_ -= 1;
          that.removeInput("HIDE_ME" + that.itemCount_);
          that.removeInput(listItemName + that.itemCount_);
      }
    },
  clickablePlus: function(){
      return new Blockly.FieldImage("./images/plus.png", 18, 18, '+', addField);
    },
  clickableMinus: function(){
      return new Blockly.FieldImage("./images/minus.png",18, 18, '-', removeField);
    },

  // Common for all except the EDx type does not have a clickableMinus field.
  // TODO, how do I get the variables used here?
  // Maybe this common functions create more problems than it solves
  start: function(that){
      if (!that.getInput('START')) {
        that.appendDummyInput('START')
            .appendField(startMessage)
            .appendField(clickablePlus)
            //.appendField(clickableMinus);
        //that.appendStatementInput("HIDE_ME")
        //    .setCheck(null);
      }
    }

  // Remove deleted inputs.
  remove: function(that){
      while (that.getInput(listItemName + i)) {
        that.removeInput("HIDE_ME" + i);
        that.removeInput(listItemName + i);
        i++;
        console.log(that);
      }
    }
}
*/

const PLUS_MINUS_updateShape_types = {
  PLAIN: 1,
  PLAIN_X: 2,
  NAMES: 3,
  NAMES_EDITABLE: 4,
  NAMES_EDITABLE_X: 5
}

window.PLUS_MINUS_updateShape_types = PLUS_MINUS_updateShape_types

// nextInput is the name of the input that should go 
// before this list of items or null if this items are 
// the last inputs of the block
// flush: boolean inputs are placed flush or not on the block
function PLUS_MINUS_updateShape_(type, flush, listItemName, startMessage, nextInput) {
    // JCOA: We should use itemCount_ and lastItem_ in this context
    return function() {
        let types = PLUS_MINUS_updateShape_types
        this.lastItem = 0;
        var that = this;
      
        var clickablePlus = new Blockly.FieldImage("./images/plus.png", 18, 18, '+', addField);
        var clickableMinus = new Blockly.FieldImage("./images/minus.png",18, 18, '-', removeField);
        //clickablePlusMinus.imageElement_.style.y = '-2px';
      
        function removeField_i(i){
          // e is the FieldImage block.
          //alert("Clicked. Check console for more info")
          return function(e){
            console.log(e)
            console.log(i)
            that.itemCount_ -= 1;
            if(!flush){
              that.removeInput("HIDE_ME" + i);
            }
            that.removeInput(listItemName + i);
          }
        }
      
        function removeField(e){
          // e is the FieldImage block.
          //alert("Clicked. Check console for more info")
          console.log(e)
          if (that.itemCount_ > 0) {
              that.itemCount_ -= 1;
              if(!flush){
                that.removeInput("HIDE_ME" + that.itemCount_);
              }
              that.removeInput(listItemName + that.itemCount_);
          }
        }
 
        function addField(e){
          // e is the FieldImage block.
          //alert("Clicked. Check console for more info")
          console.log(e)
          let itemId
          if((type === types.NAMES_EDITABLE_X)|| (type === types.PLAIN_X)){
            itemId = that.lastItem
          } else {
            itemId = that.itemCount_
          }
          if(!flush){
            that.appendStatementInput("HIDE_ME" + itemId)
                .setCheck(null);
          }
          let input = that.appendValueInput(listItemName + itemId)
          if(nextInput){
            that.moveInputBefore(listItemName + itemId, nextInput)
          }
          switch (type) {
            case types.PLAIN_X:
              input.appendField(new Blockly.FieldImage("./images/minus.png",18, 18, '-', removeField_i(that.lastItem)))
              that.lastItem += 1;
              break
            case types.NAMES:
              that.itemNames_.push(that.itemCount_.toString())
              input.appendField(that.itemNames_[that.itemCount_])
              break
            case types.NAMES_EDITABLE:
              input.appendField(new Blockly.FieldTextInput(that.itemCount_.toString()), "NAME"+that.itemCount_)
              break
            case types.NAMES_EDITABLE_X:  
              input.appendField(new Blockly.FieldImage("./images/minus.png",18, 18, '-', removeField_i(that.lastItem)))
              .appendField(new Blockly.FieldTextInput(that.lastItem.toString()), "NAME"+that.lastItem);
              that.lastItem += 1;
              break
            default:
          }
          that.itemCount_ += 1;
        }
      
        if (!this.getInput('START')) {
          var dummyInput1 = 
            this.appendDummyInput('START')
                .appendField(startMessage)
                .appendField(clickablePlus)
          if((type !== types.PLAIN_X)&&(type !== types.NAMES_EDITABLE_X)){
            dummyInput1.appendField(clickableMinus)
          }
            //this.appendStatementInput("HIDE_ME")
            //    .setCheck(null);
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
          this.lastItem += 1;
          if (!this.getInput(listItemName + i)) {
            if(!flush){
              this.appendStatementInput("HIDE_ME" + i)
                .setCheck(null);
            }
            let input = this.appendValueInput(listItemName + i)
            switch(type){
              case types.PLAIN_X:
                input.appendField(new Blockly.FieldImage("./images/minus.png",18, 18, '-', removeField_i(i)))
                break
              case types.NAMES:
                input.appendField(this.itemNames_[i])
                break
              case types.NAMES_EDITABLE:
                input.appendField(new Blockly.FieldTextInput(i.toString()), "NAME"+i)
                break
              case types.NAMES_EDITABLE_X:
                input.appendField(new Blockly.FieldImage("./images/minus.png",18, 18, '-', removeField_i(i)))
                  .appendField(new Blockly.FieldTextInput(i.toString()), "NAME"+i)
                break
              default:
            }
            console.log(this)
          }
        }
        // Remove deleted inputs.
        while (this.getInput(listItemName + i)) {
          if(!flush){
            this.removeInput("HIDE_ME" + i);
          }
          this.removeInput(listItemName + i);
          i++;
          console.log(this);
        }
    }
}
