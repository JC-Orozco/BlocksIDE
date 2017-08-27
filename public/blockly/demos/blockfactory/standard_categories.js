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
 * @fileoverview Contains a map of standard Blockly categories used to load
 * standard Blockly categories into the user's toolbox. The map is keyed by
 * the lower case name of the category, and contains the Category object for
 * that particular category. Also has a list of core block types provided
 * by Blockly.
 *
 * @author Emma Dauterman (evd2014)
 */
 'use strict';

/**
 * Namespace for StandardCategories
 */
goog.provide('StandardCategories');


// Map of standard category information necessary to add a standard category
// to the toolbox.
StandardCategories.categoryMap = Object.create(null);

StandardCategories.categoryMap['logic'] =
    new ListElement(ListElement.TYPE_CATEGORY, 'Logic');
StandardCategories.categoryMap['logic'].xml =
    Blockly.Xml.textToDom(
    '<xml>' +
    '<block type="controls_if"></block>' +
    '<block type="logic_compare"></block>' +
    '<block type="logic_operation"></block>' +
    '<block type="logic_negate"></block>' +
    '<block type="logic_boolean"></block>' +
    '<block type="logic_null"></block>' +
    '<block type="logic_ternary"></block>' +
    '</xml>');
StandardCategories.categoryMap['logic'].color ='#5C81A6';

StandardCategories.categoryMap['loops'] =
    new ListElement(ListElement.TYPE_CATEGORY, 'Loops');
StandardCategories.categoryMap['loops'].xml =
    Blockly.Xml.textToDom(
    '<xml>' +
    '<block type="controls_repeat_ext">' +
      '<value name="TIMES">' +
        '<shadow type="math_number">' +
          '<field name="NUM">10</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="controls_whileUntil"></block>' +
    '<block type="controls_for">' +
      '<value name="FROM">' +
        '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="TO">' +
        '<shadow type="math_number">' +
          '<field name="NUM">10</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="BY">' +
        '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="controls_forEach"></block>' +
    '<block type="controls_flow_statements"></block>' +
    '</xml>');
StandardCategories.categoryMap['loops'].color = '#5CA65C';

StandardCategories.categoryMap['math'] =
    new ListElement(ListElement.TYPE_CATEGORY, 'Math');
StandardCategories.categoryMap['math'].xml =
    Blockly.Xml.textToDom(
    '<xml>' +
    '<block type="math_number"></block>' +
    '<block type="math_arithmetic">' +
      '<value name="A">' +
        '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="B">' +
        '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="math_single">' +
      '<value name="NUM">' +
        '<shadow type="math_number">' +
          '<field name="NUM">9</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="math_trig">' +
      '<value name="NUM">' +
        '<shadow type="math_number">' +
          '<field name="NUM">45</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="math_constant"></block>' +
    '<block type="math_number_property">' +
      '<value name="NUMBER_TO_CHECK">' +
        '<shadow type="math_number">' +
          '<field name="NUM">0</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="math_round">' +
      '<value name="NUM">' +
        '<shadow type="math_number">' +
          '<field name="NUM">3.1</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="math_on_list"></block>' +
    '<block type="math_modulo">' +
      '<value name="DIVIDEND">' +
        '<shadow type="math_number">' +
          '<field name="NUM">64</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="DIVISOR">' +
        '<shadow type="math_number">' +
          '<field name="NUM">10</field>'+
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="math_constrain">' +
      '<value name="VALUE">' +
        '<shadow type="math_number">' +
          '<field name="NUM">50</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="LOW">' +
        '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="HIGH">' +
        '<shadow type="math_number">' +
          '<field name="NUM">100</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="math_random_int">' +
      '<value name="FROM">' +
        '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="TO">' +
        '<shadow type="math_number">' +
          '<field name="NUM">100</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="math_random_float"></block>' +
    '</xml>');
StandardCategories.categoryMap['math'].color = '#5C68A6';

StandardCategories.categoryMap['text'] =
    new ListElement(ListElement.TYPE_CATEGORY, 'Text');
StandardCategories.categoryMap['text'].xml =
    Blockly.Xml.textToDom(
    '<xml>' +
    '<block type="text"></block>' +
    '<block type="text_join"></block>' +
    '<block type="text_append">' +
      '<value name="TEXT">' +
        '<shadow type="text"></shadow>' +
      '</value>' +
    '</block>' +
    '<block type="text_length">' +
      '<value name="VALUE">' +
        '<shadow type="text">' +
          '<field name="TEXT">abc</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="text_isEmpty">' +
      '<value name="VALUE">' +
        '<shadow type="text">' +
          '<field name="TEXT"></field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="text_indexOf">' +
      '<value name="VALUE">' +
        '<block type="variables_get">' +
          '<field name="VAR">text</field>' +
        '</block>' +
      '</value>' +
      '<value name="FIND">' +
        '<shadow type="text">' +
          '<field name="TEXT">abc</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="text_charAt">' +
      '<value name="VALUE">' +
        '<block type="variables_get">' +
          '<field name="VAR">text</field>' +
        '</block>' +
      '</value>' +
    '</block>' +
    '<block type="text_getSubstring">' +
      '<value name="STRING">' +
        '<block type="variables_get">' +
          '<field name="VAR">text</field>' +
        '</block>' +
      '</value>' +
    '</block>' +
    '<block type="text_changeCase">' +
      '<value name="TEXT">' +
        '<shadow type="text">' +
          '<field name="TEXT">abc</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="text_trim">' +
      '<value name="TEXT">' +
        '<shadow type="text">' +
          '<field name="TEXT">abc</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="text_print">' +
      '<value name="TEXT">' +
        '<shadow type="text">' +
          '<field name="TEXT">abc</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="text_prompt_ext">' +
      '<value name="TEXT">' +
        '<shadow type="text">' +
          '<field name="TEXT">abc</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '</xml>');
StandardCategories.categoryMap['text'].color = '#5CA68D';

StandardCategories.categoryMap['lists'] =
    new ListElement(ListElement.TYPE_CATEGORY, 'Lists');
StandardCategories.categoryMap['lists'].xml =
    Blockly.Xml.textToDom(
    '<xml>' +
    '<block type="lists_create_with">' +
      '<mutation items="0"></mutation>' +
    '</block>' +
    '<block type="lists_create_with"></block>' +
    '<block type="lists_repeat">' +
      '<value name="NUM">' +
        '<shadow type="math_number">' +
          '<field name="NUM">5</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="lists_length"></block>' +
    '<block type="lists_isEmpty"></block>' +
    '<block type="lists_indexOf">' +
      '<value name="VALUE">' +
        '<block type="variables_get">' +
          '<field name="VAR">list</field>' +
        '</block>' +
      '</value>' +
    '</block>' +
    '<block type="lists_getIndex">' +
      '<value name="VALUE">' +
        '<block type="variables_get">' +
          '<field name="VAR">list</field>' +
        '</block>' +
      '</value>' +
    '</block>' +
    '<block type="lists_setIndex">' +
      '<value name="LIST">' +
        '<block type="variables_get">' +
          '<field name="VAR">list</field>' +
        '</block>' +
      '</value>' +
    '</block>' +
    '<block type="lists_getSublist">' +
      '<value name="LIST">' +
        '<block type="variables_get">' +
          '<field name="VAR">list</field>' +
        '</block>' +
      '</value>' +
    '</block>' +
    '<block type="lists_split">' +
      '<value name="DELIM">' +
        '<shadow type="text">' +
          '<field name="TEXT">,</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="lists_sort"></block>' +
    '</xml>');
StandardCategories.categoryMap['lists'].color = '#745CA6';

StandardCategories.categoryMap['colour'] =
    new ListElement(ListElement.TYPE_CATEGORY, 'Colour');
StandardCategories.categoryMap['colour'].xml =
    Blockly.Xml.textToDom(
    '<xml>' +
    '<block type="colour_picker"></block>' +
    '<block type="colour_random"></block>' +
    '<block type="colour_rgb">' +
      '<value name="RED">' +
        '<shadow type="math_number">' +
          '<field name="NUM">100</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="GREEN">' +
        '<shadow type="math_number">' +
          '<field name="NUM">50</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="BLUE">' +
        '<shadow type="math_number">' +
          '<field name="NUM">0</field>' +
        '</shadow>' +
      '</value>' +
    '</block>' +
    '<block type="colour_blend">' +
      '<value name="COLOUR1">' +
        '<shadow type="colour_picker">' +
          '<field name="COLOUR">#ff0000</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="COLOUR2">' +
        '<shadow type="colour_picker">' +
          '<field name="COLOUR">#3333ff</field>' +
        '</shadow>' +
      '</value>' +
      '<value name="RATIO">' +
        '<shadow type="math_number">' +
          '<field name="NUM">0.5</field>' +
       '</shadow>' +
      '</value>' +
    '</block>' +
    '</xml>');
StandardCategories.categoryMap['colour'].color = '#A6745C';

StandardCategories.categoryMap['functions'] =
    new ListElement(ListElement.TYPE_CATEGORY, 'Functions');
StandardCategories.categoryMap['functions'].color = '#9A5CA6'
StandardCategories.categoryMap['functions'].custom = 'PROCEDURE';

StandardCategories.categoryMap['variables'] =
    new ListElement(ListElement.TYPE_CATEGORY, 'Variables');
StandardCategories.categoryMap['variables'].color = '#A65C81';
StandardCategories.categoryMap['variables'].custom = 'VARIABLE';

// All standard block types in provided in Blockly core.
StandardCategories.coreBlockTypes =  ["controls_if", "logic_compare",
    "logic_operation", "logic_negate", "logic_boolean", "logic_null",
    "logic_ternary", "controls_repeat_ext", "controls_whileUntil",
    "controls_for", "controls_forEach", "controls_flow_statements",
    "math_number", "math_arithmetic", "math_single", "math_trig",
    "math_constant", "math_number_property", "math_change", "math_round",
    "math_on_list", "math_modulo", "math_constrain", "math_random_int",
    "math_random_float", "text", "text_join", "text_append", "text_length",
    "text_isEmpty", "text_indexOf", "variables_get", "text_charAt",
    "text_getSubstring", "text_changeCase", "text_trim", "text_print",
    "text_prompt_ext", "colour_picker", "colour_random", "colour_rgb",
    "colour_blend", "lists_create_with", "lists_repeat", "lists_length",
    "lists_isEmpty", "lists_indexOf", "lists_getIndex", "lists_setIndex",
    "lists_getSublist", "lists_split", "lists_sort", "variables_set",
    "procedures_defreturn", "procedures_ifreturn", "procedures_defnoreturn",
    "procedures_callreturn"];
