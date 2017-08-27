/**
 * @license
 * Blockly Demos: Block Factory
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Javascript for the BlockExporter Tools class, which generates
 * block definitions and generator stubs for given block types.  Also generates
 * toolbox XML for the exporter's workspace.  Depends on the FactoryUtils for
 * its code generation functions.
 *
 * @author quachtina96 (Tina Quach)
 */
'use strict';

goog.provide('BlockExporterTools');

goog.require('FactoryUtils');
goog.require('BlockOption');
goog.require('goog.dom');
goog.require('goog.dom.xml');


/**
* Block Exporter Tools Class
* @constructor
*/
BlockExporterTools = function() {
  // Create container for hidden workspace.
  this.container = goog.dom.createDom('div', {
    'id': 'blockExporterTools_hiddenWorkspace'
  }, ''); // Empty quotes for empty div.
  // Hide hidden workspace.
  this.container.style.display = 'none';
  document.body.appendChild(this.container);
  /**
   * Hidden workspace for the Block Exporter that holds pieces that make
   * up the block
   * @type {Blockly.Workspace}
   */
  this.hiddenWorkspace = Blockly.inject(this.container.id,
      {collapse: false,
       media: '../../media/'});
};

/**
 * Get Blockly Block object from XML that encodes the blocks used to design
 * the block.
 * @param {!Element} xml XML element that encodes the blocks used to design
 *    the block. For example, the block XMLs saved in block library.
 * @return {!Blockly.Block} Root block (factory_base block) which contains
 *    all information needed to generate block definition or null.
 * @private
 */
BlockExporterTools.prototype.getRootBlockFromXml_ = function(xml) {
  // Render XML in hidden workspace.
  this.hiddenWorkspace.clear();
  Blockly.Xml.domToWorkspace(xml, this.hiddenWorkspace);
  // Get root block.
  var rootBlock = this.hiddenWorkspace.getTopBlocks()[0] || null;
  return rootBlock;
};

/**
 * Return the given language code of each block type in an array.
 * @param {!Object} blockXmlMap Map of block type to XML.
 * @param {string} definitionFormat 'JSON' or 'JavaScript'
 * @return {string} The concatenation of each block's language code in the
 *    desired format.
 */
BlockExporterTools.prototype.getBlockDefinitions =
    function(blockXmlMap, definitionFormat) {
  var blockCode = [];
  for (var blockType in blockXmlMap) {
    var xml = blockXmlMap[blockType];
    if (xml) {
      // Render and get block from hidden workspace.
      var rootBlock = this.getRootBlockFromXml_(xml);
      if (rootBlock) {
        // Generate the block's definition.
        var code = FactoryUtils.getBlockDefinition(blockType, rootBlock,
            definitionFormat, this.hiddenWorkspace);
        // Add block's definition to the definitions to return.
      } else {
        // Append warning comment and write to console.
        var code = '// No block definition generated for ' + blockType +
          '. Could not find root block in XML stored for this block.';
        console.log('No block definition generated for ' + blockType +
          '. Could not find root block in XML stored for this block.');
      }
    } else {
      // Append warning comment and write to console.
      var code = '// No block definition generated for ' + blockType +
        '. Block was not found in Block Library Storage.';
      console.log('No block definition generated for ' + blockType +
        '. Block was not found in Block Library Storage.');
    }
    blockCode.push(code);
  }

  // Surround json with [] and comma separate items.
  if (definitionFormat == "JSON") {
    return "[" + blockCode.join(",\n") + "]";
  }
  return blockCode.join("\n\n");
};

/**
 * Return the generator code of each block type in an array in a given language.
 * @param {!Object} blockXmlMap Map of block type to XML.
 * @param {string} generatorLanguage E.g. 'JavaScript', 'Python', 'PHP', 'Lua',
 *     'Dart'
 * @return {string} The concatenation of each block's generator code in the
 * desired format.
 */
BlockExporterTools.prototype.getGeneratorCode =
    function(blockXmlMap, generatorLanguage) {
  var multiblockCode = [];
  // Define the custom blocks in order to be able to create instances of
  // them in the exporter workspace.
  this.addBlockDefinitions(blockXmlMap);

  for (var blockType in blockXmlMap) {
    var xml = blockXmlMap[blockType];
    if (xml) {
      // Render the preview block in the hidden workspace.
      var tempBlock =
          FactoryUtils.getDefinedBlock(blockType, this.hiddenWorkspace);
      // Get generator stub for the given block and add to  generator code.
      var blockGenCode =
          FactoryUtils.getGeneratorStub(tempBlock, generatorLanguage);
    } else {
      // Append warning comment and write to console.
      var blockGenCode = '// No generator stub generated for ' + blockType +
        '. Block was not found in Block Library Storage.';
      console.log('No block generator stub generated for ' + blockType +
        '. Block was not found in Block Library Storage.');
    }
    multiblockCode.push(blockGenCode);
  }
  return multiblockCode.join("\n\n");
};

/**
 * Evaluates block definition code of each block in given object mapping
 * block type to XML. Called in order to be able to create instances of the
 * blocks in the exporter workspace.
 * @param {!Object} blockXmlMap Map of block type to XML.
 */
BlockExporterTools.prototype.addBlockDefinitions = function(blockXmlMap) {
  var blockDefs = this.getBlockDefinitions(blockXmlMap, 'JavaScript');
  eval(blockDefs);
};

/**
 * Pulls information about all blocks in the block library to generate XML
 * for the selector workpace's toolbox.
 * @param {!BlockLibraryStorage} blockLibStorage Block Library Storage object.
 * @return {!Element} XML representation of the toolbox.
 */
BlockExporterTools.prototype.generateToolboxFromLibrary
    = function(blockLibStorage) {
  // Create DOM for XML.
  var xmlDom = goog.dom.createDom('xml', {
    'id' : 'blockExporterTools_toolbox',
    'style' : 'display:none'
  });

  var allBlockTypes = blockLibStorage.getBlockTypes();
  // Object mapping block type to XML.
  var blockXmlMap = blockLibStorage.getBlockXmlMap(allBlockTypes);

  // Define the custom blocks in order to be able to create instances of
  // them in the exporter workspace.
  this.addBlockDefinitions(blockXmlMap);

  for (var blockType in blockXmlMap) {
    // Get block.
    var block = FactoryUtils.getDefinedBlock(blockType, this.hiddenWorkspace);
    var category = FactoryUtils.generateCategoryXml([block], blockType);
    xmlDom.appendChild(category);
  }

  // If there are no blocks in library and the map is empty, append dummy
  // category.
  if (Object.keys(blockXmlMap).length == 0) {
    var category = goog.dom.createDom('category');
    category.setAttribute('name','Next Saved Block');
    xmlDom.appendChild(category);
  }
  return xmlDom;
};

/**
 * Generate XML for the workspace factory's category from imported block
 * definitions.
 * @param {!BlockLibraryStorage} blockLibStorage Block Library Storage object.
 * @return {!Element} XML representation of a category.
 */
BlockExporterTools.prototype.generateCategoryFromBlockLib =
    function(blockLibStorage) {
  var allBlockTypes = blockLibStorage.getBlockTypes();
  // Object mapping block type to XML.
  var blockXmlMap = blockLibStorage.getBlockXmlMap(allBlockTypes);

  // Define the custom blocks in order to be able to create instances of
  // them in the exporter workspace.
  this.addBlockDefinitions(blockXmlMap);

  // Get array of defined blocks.
  var blocks = [];
  for (var blockType in blockXmlMap) {
    var block = FactoryUtils.getDefinedBlock(blockType, this.hiddenWorkspace);
    blocks.push(block);
  }

  return FactoryUtils.generateCategoryXml(blocks,'Block Library');
};

/**
 * Generate selector dom from block library storage. For each block in the
 * library, it has a block option, which consists of a checkbox, a label,
 * and a fixed size preview workspace.
 * @param {!BlockLibraryStorage} blockLibStorage Block Library Storage object.
 * @param {string} blockSelectorId ID of the div element that will contain
 *    the block options.
 * @return {!Object} Map of block type to Block Option object.
 */
BlockExporterTools.prototype.createBlockSelectorFromLib =
    function(blockLibStorage, blockSelectorId) {
  // Object mapping each stored block type to XML.
  var allBlockTypes = blockLibStorage.getBlockTypes();
  var blockXmlMap = blockLibStorage.getBlockXmlMap(allBlockTypes);

  // Define the custom blocks in order to be able to create instances of
  // them in the exporter workspace.
  this.addBlockDefinitions(blockXmlMap);

  var blockSelector = document.getElementById(blockSelectorId);
  // Clear the block selector.
  var child;
  while ((child = blockSelector.firstChild)) {
    blockSelector.removeChild(child);
  }

  // Append each block option's dom to the selector.
  var blockOptions = Object.create(null);
  for (var blockType in blockXmlMap) {
    // Get preview block's XML.
    var block = FactoryUtils.getDefinedBlock(blockType, this.hiddenWorkspace);
    var previewBlockXml = Blockly.Xml.workspaceToDom(this.hiddenWorkspace);

    // Create block option, inject block into preview workspace, and append
    // option to block selector.
    var blockOpt = new BlockOption(blockSelector, blockType, previewBlockXml);
    blockOpt.createDom();
    blockSelector.appendChild(blockOpt.dom);
    blockOpt.showPreviewBlock();
    blockOptions[blockType] = blockOpt;
  }
  return blockOptions;
};
