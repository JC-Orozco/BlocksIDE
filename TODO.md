Juan Carlos Orozco TODO list:

parser is not ordering the block fields well. Parse this for example:
  switch(x){
  case 0:  for (var count = 0; count < 10; count++) {
    }
  case 1:  for (var count2 = 0; count2 < 10; count2++) {
    }
  default:   a = 3
  }

or this:
  fcall2(abc,cdf).abc

  <block type="bi_call_editable" id="3" x="0" y="55">
    <mutation items="2"></mutation>
    <field name="NAME">fcall1</field>
    <value name="ADD0">
      <block type="bi_field_return" id="4">
        <field name="NAME">a</field>
      </block>
    </value>
    <value name="ADD2">
      <block type="bi_field_return" id="5">
        <field name="NAME">b</field>
      </block>
    </value>
    <value name="chain">
      <block type="bi_field_return" id="2">
        <field name="NAME">c</field>
      </block>
    </value>
  </block>
  
  <block type="bi_call_editable" id="3" x="0" y="55">
    <mutation items="2"></mutation>
    <field name="NAME">fcall1</field>
    <value name="ADD0">
      <block type="bi_field_return" id="4">
        <field name="NAME">a</field>
      </block>
    </value>
    <value name="chain">
      <block type="bi_field_return" id="2">
        <field name="NAME">c</field>
      </block>
    </value>
    <value name="ADD1">
      <block type="bi_field_return" id="5">
        <field name="NAME">b</field>
      </block>
    </value>
  </block>

<block type="bi_call_editable" id="3">
  <mutation items="2" names=""></mutation>
  <field name="NAME">fcall1</field>
  <value name="ADD0">
    <block type="bi_field_return" id="4">
      <field name="NAME">a</field>
      <value name="chain"></value>
    </block>
  </value>
  <value name="ADD1">
    <block type="bi_field_return" id="5">
      <field name="NAME">b</field>
      <value name="chain"></value>
    </block>
  </value>
  <value name="chain"></value>
</block>"

<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="bi_call_editable" id="1" x="0" y="10">
    <mutation items="2" names=""></mutation>
    <field name="NAME">fcall1</field>
    <value name="ADD0">
      <block type="bi_field_return" id="2">
        <field name="NAME">a</field>
        <value name="chain"></value>
      </block>
    </value>
    <value name="ADD1">
      <block type="bi_field_return" id="3">
        <field name="NAME">b</field>
        <value name="chain"></value>
      </block>
    </value>
    <value name="chain">
      <block type="bi_field_return" id="0">
        <field name="NAME">c</field>
        <value name="chain"></value>
      </block>
    </value>
  </block>
</xml>


l = [null]; null translates to empty string!

Use bi_create_list that can remove each item individually. Done with PLAIN_X. But parser needs fixing to take into account separate ADDx inputs

Do the same fix to bi_create_map

We have two ways of loading blocks. Decide which one is better and migrate all blocks to that one:
1) public/lib/JCO_blocks.js
2) src/lib/bi_blockly/blocks/*

We also use a third library loading method on js2blocks.js parser:
import acorn from 'acorn-dynamic-import';

Use bi_lists_create instead. TODO Change parser to use bi_lists_create 
For example [1,2,3] is creating a createe list with with 4 inputs instead of three. And the number blocks are not being created.
Also change the "create list with" block for a bi_ one that uses my + and - buttons to add and delete fields

Check which blocks are used on toolbar and remove the ones not used from the code.

This works OK in the original BlocksIDE

Fixed. Use bi_for_in:
Fix both of this blocks
<block type="controls_forEach"></block>
<block type="bi_controls_forEachKey"></block>
controls_forEach uses the internal variables.
Make a bi_controls_forEach that replaces both of this cases.
Just converts for(let i in x){} for example

forEach variable name, list or map name.

Layout:
Fix layout to avoid overflowing the full page.
Add scrollbar to console1 pane

- Support comments.

- Add Load and Save

- Save last valid code before generating new blocks (maybe even several copies using diff)

Fix: Use blocks with AddSub for function calls and function definition. The same for methods.
Fix: AddSub show block name in the 0 field.
Fix: AddSub itemCount to represent the actual number of items

Is it possible to put inputs inline on a AddSub block?

Blocks pending:
comments
await (This is ES7 so not a priority for now)

bi_assignment operator change to dropdown selector

- Setup module option in acorn:
Some progress -> named export done, some other export cases are not yet handled
Done -> Import

Parenthesis (Seems to work without implementing the parenthesis block in a simple math example with + and * precedence altered)
Done -> Maps
Done -> Try-Catch
Done -> Catch
Done -> While (Until)
Done -> Switch
Done -> Arrow functions (Gets converted to anonymous function)
Done -> throw
Done -> spread ...
Done -> yield, yield*, function*
Done -> true, false
Done -> Class get, set, etc. Use named classes for constructor, and special blocks for get, set, etc.
Done -> Class extends, super, static
Done -> prototype (it is treated as a normal field maybe that is enough)
Done -> let, const. Use var block with dropdown selector
Done -> multiple variable declaration. Ex. var a=2, b, c
Done -> computed true: a[1], f1()[1]

Done -> function and generator using dropdown selector

