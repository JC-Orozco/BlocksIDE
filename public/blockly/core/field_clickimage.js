/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview clickable image field.
 * @author toebes@extremenetworks.com (John Toebes)
 */
'use strict';

goog.provide('Blockly.FieldClickImage');

goog.require('Blockly.FieldImage');
//goog.require('Blockly.utils');

/**
 * Class for a clickable image.
 * @param {string} src The URL of the image.
 * @param {number} width Width of the image.
 * @param {number} height Height of the image.
 * @param {?string} opt_alt Optional alt text for when block is collapsed.
 * @param {?Function} opt_addHandler A function that is executed when the
 *     image is selected.
 * @extends {Blockly.FieldImage}
 * @constructor
 */
Blockly.FieldClickImage = function(src, width, height, opt_alt, opt_Handler, yOffset) {
  Blockly.FieldClickImage.superClass_.constructor.call(this,
                                                   src, width, height, '');

  this.handler_ = opt_Handler;
  this.yOffset_ = yOffset;
};

goog.inherits(Blockly.FieldClickImage, Blockly.FieldImage);

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 * However since we have no name, we won't be saved out.
 */
Blockly.FieldClickImage.prototype.EDITABLE = true;
/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldClickImage.prototype.CURSOR = 'default';

/**
 * Add or remove the UI indicating if this image may be clicked or not.
 */
Blockly.FieldClickImage.prototype.updateEditable = function() {
  if (this.sourceBlock_.isInFlyout || !this.EDITABLE) {
    Blockly.utils.addClass(/** @type {!Element} */ (this.fieldGroup_),
                      'blocklyIconGroupReadonly');
  } else {
    Blockly.utils.removeClass(/** @type {!Element} */ (this.fieldGroup_),
                         'blocklyIconGroupReadonly');
  }
};

/**
 * Install this field on a block.
 * @param {!Blockly.Block} block The block containing this field.
 */
Blockly.FieldClickImage.prototype.init = function(block) {
  if (this.fieldGroup_) {
    // Image has already been initialized once.
    return;
  }
  Blockly.FieldClickImage.superClass_.init.call(this, block);

  // We want to use the styling of an Icon  to indicate clickability
  Blockly.utils.addClass(/** @type {!Element} */ (this.fieldGroup_),
                    'blocklyIconGroup');
  //
  // Update the classes for this to appear editable
  this.updateEditable();
  // And bind to the mouseup so that we can get called for a click
  this.mouseUpWrapper_ =
  //    Blockly.bindEvent_(this.fieldGroup_, 'mouseup', this, this.onMouseUp_);
      Blockly.bindEvent_(this.fieldGroup_, 'mousedown', this, this.onMouseDown_);
  // Force a render.
  //this.updateTextNode_();
  this.render_();
  
  this.imageElement_.style.y = this.yOffset_;
}

/**
 * Clone this FieldClickImage.
 * @return {!Blockly.FieldClickImage} The result of calling the constructor again
 *   with the current values of the arguments used during construction.
 */
Blockly.FieldClickImage.prototype.clone = function() {
  return new Blockly.FieldClickImage(this.handler_,
                                 this.rootBlock_, this.name_, this.pos_);
};

/**
 * Take the action of the block
 * Note that this does swap out the dragMode_ variable because we know that
 * We only get invoked when we aren't actually dragging (otherwise the click
 * would be consumed by the drag code).  Once we return, there is a small amount
 * of cleanup which needs to complete
 * @private
 */
Blockly.FieldClickImage.prototype.showEditor_ = function(e) {
  if (this.handler_) {
    var saveDragMode = Blockly.dragMode_;
    Blockly.dragMode_ = 0;
    this.handler_(this, this.sourceBlock_, e);
    Blockly.dragMode_ = saveDragMode;
  }
};