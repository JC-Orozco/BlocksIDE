/**
 * AccessibleBlockly
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Angular2 Component representing the toolbox modal.
 *
 * @author sll@google.com (Sean Lip)
 */

goog.provide('blocklyApp.ToolboxModalComponent');

goog.require('Blockly.CommonModal');
goog.require('blocklyApp.AudioService');
goog.require('blocklyApp.KeyboardInputService');
goog.require('blocklyApp.ToolboxModalService');
goog.require('blocklyApp.TranslatePipe');
goog.require('blocklyApp.TreeService');
goog.require('blocklyApp.UtilsService');


blocklyApp.ToolboxModalComponent = ng.core.Component({
  selector: 'blockly-toolbox-modal',
  template: `
    <div *ngIf="modalIsVisible" class="blocklyModalCurtain"
         (click)="dismissModal()">
      <!-- $event.stopPropagation() prevents the modal from closing when its
      interior is clicked. -->
      <div id="toolboxModal" class="blocklyModal" role="alertdialog"
           (click)="$event.stopPropagation()" tabindex="-1"
           aria-labelledby="toolboxModalHeading">
        <h3 id="toolboxModalHeading">{{'SELECT_A_BLOCK'|translate}}</h3>

        <div *ngFor="#toolboxCategory of toolboxCategories; #categoryIndex=index">
          <h4 *ngIf="toolboxCategory.categoryName">{{toolboxCategory.categoryName}}</h4>
          <div class="blocklyModalButtonContainer"
               *ngFor="#block of toolboxCategory.blocks; #blockIndex=index">
            <button [id]="getOptionId(getOverallIndex(categoryIndex, blockIndex))"
                    (click)="selectBlock(getBlock(categoryIndex, blockIndex))"
                    [ngClass]="{activeButton: activeButtonIndex == getOverallIndex(categoryIndex, blockIndex)}">
              {{getBlockDescription(block)}}
            </button>
          </div>
        </div>
        <hr>
        <div class="blocklyModalButtonContainer">
          <button [id]="getCancelOptionId()" (click)="dismissModal()"
                  [ngClass]="{activeButton: activeButtonIndex == totalNumBlocks}">
            {{'CANCEL'|translate}}
          </button>
        </div>
      </div>
    </div>
  `,
  pipes: [blocklyApp.TranslatePipe]
})
.Class({
  constructor: [
    blocklyApp.ToolboxModalService, blocklyApp.KeyboardInputService,
    blocklyApp.AudioService, blocklyApp.UtilsService, blocklyApp.TreeService,
    function(
        toolboxModalService_, keyboardInputService_, audioService_,
        utilsService_, treeService_) {
      this.toolboxModalService = toolboxModalService_;
      this.keyboardInputService = keyboardInputService_;
      this.audioService = audioService_;
      this.utilsService = utilsService_;
      this.treeService = treeService_;

      this.modalIsVisible = false;
      this.toolboxCategories = [];
      this.onSelectBlockCallback = null;
      this.onDismissCallback = null;

      this.firstBlockIndexes = [];
      this.activeButtonIndex = -1;
      this.totalNumBlocks = 0;

      var that = this;
      this.toolboxModalService.registerPreShowHook(
        function(
            toolboxCategories, onSelectBlockCallback, onDismissCallback) {
          that.modalIsVisible = true;
          that.toolboxCategories = toolboxCategories;
          that.onSelectBlockCallback = onSelectBlockCallback;
          that.onDismissCallback = onDismissCallback;

          // The indexes of the buttons corresponding to the first block in
          // each category, as well as the 'cancel' button at the end.
          that.firstBlockIndexes = [];
          that.activeButtonIndex = -1;
          that.totalNumBlocks = 0;

          var cumulativeIndex = 0;
          that.toolboxCategories.forEach(function(category) {
            that.firstBlockIndexes.push(cumulativeIndex);
            cumulativeIndex += category.blocks.length;
          });
          that.firstBlockIndexes.push(cumulativeIndex);
          that.totalNumBlocks = cumulativeIndex;

          Blockly.CommonModal.setupKeyboardOverrides(that);
          that.keyboardInputService.addOverride('13', function(evt) {
              evt.preventDefault();
              evt.stopPropagation();

              if (that.activeButtonIndex == -1) {
                return;
              }

              var button = document.getElementById(
                  that.getOptionId(that.activeButtonIndex));

              for (var i = 0; i < that.toolboxCategories.length; i++) {
                if (that.firstBlockIndexes[i + 1] > that.activeButtonIndex) {
                  var categoryIndex = i;
                  var blockIndex =
                      that.activeButtonIndex - that.firstBlockIndexes[i];
                  var block = that.getBlock(categoryIndex, blockIndex);
                  that.selectBlock(block);
                  return;
                }
              }

              // The 'Cancel' button has been pressed.
              that.dismissModal();
            });

          setTimeout(function() {
            document.getElementById('toolboxModal').focus();
          }, 150);
        }
      );
    }
  ],
  // Closes the modal (on both success and failure).
  hideModal_: Blockly.CommonModal.hideModal,
  // Focuses on the button represented by the given index.
  focusOnOption: function(index) {
    var button = document.getElementById(this.getOptionId(index));
    button.focus();
  },
  // Counts the number of interactive elements for the modal.
  numInteractiveElements: function() {
    return this.totalNumBlocks + 1;
  },
  getOverallIndex: function(categoryIndex, blockIndex) {
    return this.firstBlockIndexes[categoryIndex] + blockIndex;
  },
  getBlock: function(categoryIndex, blockIndex) {
    return this.toolboxCategories[categoryIndex].blocks[blockIndex];
  },
  getBlockDescription: function(block) {
    return this.utilsService.getBlockDescription(block);
  },
  // Returns the ID for the corresponding option button.
  getOptionId: function(index) {
    return 'toolbox-modal-option-' + index;
  },
  // Returns the ID for the "cancel" option button.
  getCancelOptionId: function() {
    return 'toolbox-modal-option-' + this.totalNumBlocks;
  },
  selectBlock: function(block) {
    this.onSelectBlockCallback(block);
    this.hideModal_();
  },
  // Dismisses and closes the modal.
  dismissModal: function() {
    this.hideModal_();
    this.onDismissCallback();
  }
});
