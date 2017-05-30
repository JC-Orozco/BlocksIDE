let Blockly;
if (typeof window !== 'undefined') {
  Blockly = require('../node_modules/node-blockly/browser-raw.js');
} else {
  Blockly = require('../node_modules/node-blockly/_blockly.js');
}
const biBlocks = require('./lib/bi_blockly/blocks/bi_blockly.js')
biBlocks(Blockly);

const blocklyJS = require('node-blockly/lib/javascript_compressed');
blocklyJS(Blockly);

const biBlocksJS = require('./lib/bi_blockly/generators/javascript/bi_blockly.js')
biBlocksJS(Blockly);

console.log("Blockly")

module.exports = Blockly;