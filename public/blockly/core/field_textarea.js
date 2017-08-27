/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
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
 * @fileoverview Text Area field.
 * @author fraser@google.com (Neil Fraser)
 * @author Andrew Mee
 * @author acbart@vt.edu (Austin Cory Bart)
 * @author JC-Orozco (Juan Carlos Orozco)
 */

'use strict';

goog.provide('Blockly.FieldTextArea');

goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.userAgent');


/**
 * Class for an editable text field.
 * @param {string} text The initial content of the field.
 * @param {Function} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns either the accepted text, a replacement
 *     text, or null to abort the change.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldTextArea = function(text, opt_validator) {
  Blockly.FieldTextArea.superClass_.constructor.call(this, text, opt_validator);
};
goog.inherits(Blockly.FieldTextArea, Blockly.Field);

/**
 * Point size of text.  Should match blocklyText's font-size in CSS.
 */
Blockly.FieldTextArea.FONTSIZE = 11;

/**
 * Clone this FieldTextArea.
 * @return {!Blockly.FieldTextArea} The result of calling the constructor again
 *   with the current values of the arguments used during construction.
 */
Blockly.FieldTextArea.prototype.clone = function() {
  return new Blockly.FieldTextArea(this.getText(), this.getValidator());
};

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldTextArea.prototype.CURSOR = 'text';

/**
 * Allow browser to spellcheck this field.
 * @private
 */
Blockly.FieldTextArea.prototype.spellcheck_ = true;

/**
 * Close the input widget if this input is being deleted.
 */
Blockly.FieldTextArea.prototype.dispose = function() {
  Blockly.WidgetDiv.hideIfOwner(this);
  Blockly.FieldTextArea.superClass_.dispose.call(this);
};

/**
 * Set the value of this field.
 * @param {?string} newValue New value.
 * @override
 */
Blockly.FieldTextArea.prototype.setValue = function(newValue) {
  if (newValue === null) {
    return;  // No change if null.
  }
  if (this.sourceBlock_) {
    var validated = this.callValidator(newValue);
    // If the new value is invalid, validation returns null.
    // In this case we still want to display the illegal result.
    if (validated !== null) {
      newValue = validated;
    }
  }
  Blockly.Field.prototype.setValue.call(this, newValue);
};

/**
 * Set the text in this field.
 * @param {?string} newText New text.
 * @override
 */
Blockly.FieldTextArea.prototype.setText = function(newText) {
  if (newText === null) {
    // No change if null.
    return;
  }
  newText = String(newText);
  //  var oldText = this.text_;
  //  if (this.sourceBlock_ && this.getValidator()) {
  //    var validated = this.callValidator(text);
  //    // If the new text is invalid, validation returns null.
  //    // In this case we still want to display the illegal result.
  //    if (validated !== null && validated !== undefined) {
  //      text = validated;
  //    }
  //  }
  //  Blockly.Field.prototype.setText.call(this, text);
  if (newText === null || newText === this.text_) {
    // No change if null.
    return;
  }
  //this.text_ = text;
  //this.updateTextNode_();

//  if (this.sourceBlock_ && this.sourceBlock_.rendered) {
//    this.sourceBlock_.render();
//    this.sourceBlock_.bumpNeighbours_();
//    Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, oldText, text));
//    
//    //this.sourceBlock_.workspace.fireChangeEvent();
//  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.BlockChange(
        this.sourceBlock_, 'field', this.name, this.text_, newText));
  }
  
  Blockly.Field.prototype.setText.call(this, newText);
  //this.updateTextNode_();
};

/**
 * Update the text node of this field to display the current text.
 * @private
 */
Blockly.FieldTextArea.prototype.updateTextNode_ = function() {
  if (!this.textElement_) {
    // Not rendered yet.
    return;
  }
  this.textElement_.setAttribute('class', 'blocklyText blocklyTextCode');
  var text = this.text_;
  // Empty the text element.
  if (this.textElement_ !== undefined) {
    goog.dom.removeChildren(/** @type {!Element} */ (this.textElement_));
  }
  // Replace whitespace with non-breaking spaces so the text doesn't collapse.
  
  if (Blockly.RTL && text) {
    // The SVG is LTR, force text to be RTL.
    text += '\u200F';
  }
  if (!text) {
    // Prevent the field from disappearing if empty.
    text = Blockly.Field.NBSP;
  }
  //text = text.replace(/\s/g, Blockly.Field.NBSP);
  var y=12.5 + 2; // Hack to fix placement
  var that=this;
  //var textNode = document.createTextNode(text);
  text.split(/\n/).map(function(textline){
    textline = textline.replace(/\s/g, Blockly.Field.NBSP);
    var tspan = Blockly.utils.createSvgElement('tspan', {x:0,y:y}, that.textElement_);
    var textNode = document.createTextNode(textline);
    tspan.appendChild(textNode);
    y+=20;
  });

  // Cached width is obsolete.  Clear it.
  this.size_.width = 0;
  
  var that2 = this;
  this.fixAfterLoad = setTimeout(function() {
    that2.render_();
    if (that2.sourceBlock_ && that2.sourceBlock_.rendered) {
        that2.sourceBlock_.render();
        // JCOA Test the next code line:
        //Blockly.svgResize(that2.sourceBlock_.workspace);
    }
    // JCOA: Test the next code line: 
    //this.resizeEditor_();
  }, 0);  // Test change to 200, was 0. None of this 3 changes helped.
};

/**
 * Draws the border with the correct width.
 * Saves the computed width in a property.
 * @private
 */
Blockly.FieldTextArea.prototype.render_ = function() {
    if (!this.visible_ || !this.textElement_) {
        return;
    }
    this.updateTextNode_();
    this.size_.width = this.textElement_.getBBox().width + 5;
    this.size_.height= (this.text_.split(/\n/).length ||1)*20 + (Blockly.BlockSvg.SEP_SPACE_Y+5) ;
    if (this.borderRect_) {
        this.borderRect_.setAttribute('width',
            this.size_.width + Blockly.BlockSvg.SEP_SPACE_X);
        this.borderRect_.setAttribute('height',
            this.size_.height -  (Blockly.BlockSvg.SEP_SPACE_Y+5));
    }
};

/**
 * Show the inline free-text editor on top of the text.
 * @param {boolean=} opt_quietInput True if editor should be created without
 *     focus.  Defaults to false.
 * @private
 */
Blockly.FieldTextArea.prototype.showEditor_ = function(opt_quietInput) {
  this.workspace_ = this.sourceBlock_.workspace;
  var quietInput = opt_quietInput || false;
  if (!quietInput && (goog.userAgent.MOBILE || goog.userAgent.ANDROID ||
                      goog.userAgent.IPAD)) {
    // Mobile browsers have issues with in-line textareas (focus & keyboards).
    var newValue = window.prompt(Blockly.Msg.CHANGE_VALUE_TITLE, this.text_);
    if (this.getValidator()) {
      var override = this.callValidator(newValue);
      if (override !== undefined) {
        newValue = override;
      }
    }
    if (newValue !== null) {
      this.setText(newValue);
    }
    return;
  }

  Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, this.widgetDispose_());
  var div = Blockly.WidgetDiv.DIV;
  
  
  // Create the input.
  var htmlInput = goog.dom.createDom('textarea', 'blocklyHtmlInput');
  var fontSize = (Blockly.FieldTextArea.FONTSIZE *this.workspace_.scale) + 'pt';
  div.style.fontSize = fontSize;
  htmlInput.style.fontSize = fontSize;
  //htmlInput.style.fontFamily = 'monospace'; // JCOA Todo. Are we setting this in css?
  htmlInput.setAttribute('spellcheck', this.spellcheck_);
  Blockly.FieldTextArea.htmlInput_ = htmlInput;
  htmlInput.style.resize = 'none';
  htmlInput.style['line-height'] = '20px';
  htmlInput.style['overflow'] = 'hidden';
  htmlInput.style.height = '100%';//this.size_.height - Blockly.BlockSvg.SEP_SPACE_Y + 'px';
  div.appendChild(htmlInput);

  htmlInput.value = htmlInput.defaultValue = this.text_;
  htmlInput.oldValue_ = null;
  this.validate_();
  this.resizeEditor_();
  if (!quietInput) {
    htmlInput.focus();
    htmlInput.select();
  }

  // Bind to keydown -- trap Enter without IME and Esc to hide.
  htmlInput.onKeyDownWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keydown', this, this.onHtmlInputKeyDown_);
  // Bind to keyup -- trap Enter; resize after every keystroke.
  // Bind to keyup -- trap Enter and Esc; resize after every keystroke.
  htmlInput.onKeyUpWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keyup', this, this.onHtmlInputChange_);
  // Bind to keyPress -- repeatedly resize when holding down a key.
  htmlInput.onKeyPressWrapper_ =
      Blockly.bindEvent_(htmlInput, 'keypress', this, this.onHtmlInputChange_);
  var workspaceSvg = this.workspace_.getCanvas();
  
  htmlInput.onWorkspaceChangeWrapper_ = this.resizeEditor_.bind(this);
  this.workspace_.addChangeListener(htmlInput.onWorkspaceChangeWrapper_);
};

/**
 * Handle key down to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextArea.prototype.onHtmlInputKeyDown_ = function(e) {
  var htmlInput = Blockly.FieldTextArea.htmlInput_;
  var escKey = 27;
  if (e.keyCode == escKey) {
    this.setText(htmlInput.defaultValue);
    Blockly.WidgetDiv.hide();
  }
};

/**
 * Handle a change to the editor.
 * @param {!Event} e Keyboard event.
 * @private
 */
Blockly.FieldTextArea.prototype.onHtmlInputChange_ = function(e) {
  var htmlInput = Blockly.FieldTextArea.htmlInput_;
  var escKey = 27;
  if (e.keyCode == escKey) {
    // Esc
    this.setText(htmlInput.defaultValue);
    Blockly.WidgetDiv.hide();
  } else {
    // Update source block.
        var text = htmlInput.value;
    if (text !== htmlInput.oldValue_) {
      htmlInput.oldValue_ = text;
      this.setText(text);
      this.validate_();
    } else if (goog.userAgent.WEBKIT) {
      // Cursor key.  Render the source block to show the caret moving.
      // Chrome only (version 26, OS X).
      this.sourceBlock_.render();
    }
    this.resizeEditor_();
    Blockly.svgResize(this.sourceBlock_.workspace);
  }
};

/**
 * Check to see if the contents of the editor validates.
 * Style the editor accordingly.
 * @private
 */
Blockly.FieldTextArea.prototype.validate_ = function() {
  var valid = true;
  goog.asserts.assertObject(Blockly.FieldTextArea.htmlInput_);
  var htmlInput = /** @type {!Element} */ (Blockly.FieldTextArea.htmlInput_);
  if (this.getValidator()) {
    valid = this.callValidator(htmlInput.value);
  }
  if (valid === null) {
    Blockly.utils.addClass(htmlInput, 'blocklyInvalidInput');
  } else {
    Blockly.utils.removeClass(htmlInput, 'blocklyInvalidInput');
  }
};

/**
 * Resize the editor and the underlying block to fit the text.
 * @private
 */
Blockly.FieldTextArea.prototype.resizeEditor_ = function() {
  var div = Blockly.WidgetDiv.DIV;
  var bBox = this.fieldGroup_.getBBox();
  var htmlInput = Blockly.FieldTextArea.htmlInput_;
  //div.style.width = bBox.width + 'px';
  if (htmlInput.clientHeight < htmlInput.scrollHeight) {
    div.style.width = (bBox.width * this.workspace_.scale) + 'px';
  } else {
    div.style.width = bBox.width * this.workspace_.scale + 'px';
  }
  div.style.height = bBox.height * this.workspace_.scale + 'px';
  // Position the editor
  var xy = this.getAbsoluteXY_();
  // In RTL mode block fields and LTR input fields the left edge moves,
  // whereas the right edge is fixed.  Reposition the editor.
  if (this.sourceBlock_.RTL) {
    var borderBBox = this.getScaledBBox_();
    xy.x += borderBBox.width;
    xy.x -= div.offsetWidth;
  }
  // Shift by a few pixels to line up exactly.
  xy.y += 1;
  if (goog.userAgent.GECKO && Blockly.WidgetDiv.DIV.style.top) {
    // Firefox mis-reports the location of the border by a pixel
    // once the WidgetDiv is moved into position.
    xy.x -= 1;
    xy.y -= 1;
  }
  if (goog.userAgent.WEBKIT) {
    xy.y -= 3;
  }
  div.style.left = xy.x + 'px';
  div.style.top = xy.y + 'px';
};

/**
 * Close the editor, save the results, and dispose of the editable
 * text field's elements.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldTextArea.prototype.widgetDispose_ = function() {
  var thisField = this;
  return function() {
    var htmlInput = Blockly.FieldTextArea.htmlInput_;
    // Save the edit (if it validates).
    var text = htmlInput.value;
    if (thisField.getValidator()) {
      text = thisField.callValidator(text);
      if (text === null) {
        // Invalid edit.
        text = htmlInput.defaultValue;
      }
    }
    thisField.setText(text);
    thisField.sourceBlock_.rendered && thisField.sourceBlock_.render();
    Blockly.unbindEvent_(htmlInput.onKeyUpWrapper_);
    Blockly.unbindEvent_(htmlInput.onKeyPressWrapper_);
    thisField.workspace_.removeChangeListener(htmlInput.onWorkspaceChangeWrapper_);
    Blockly.FieldTextArea.htmlInput_ = null;
    Blockly.Events.setGroup(false);
    // Delete the width property.
    var style = Blockly.WidgetDiv.DIV.style;
    style.width = 'auto';
    style.height = 'auto';
    style.fontSize = '';
  };
};