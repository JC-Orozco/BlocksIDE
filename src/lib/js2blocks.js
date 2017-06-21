// BlocksIDE is a project to create a complete js Blocks Development Platform
//
// Copyright 2016 Juan Carlos Orozco
//
// BlocksIDE was written by Juan Carlos Orozco and released under an Apache version 2 license.
//
// Git repositories for BlocksIDE are available at
//
// https://github.com/JC-Orozco/BlocksIDE
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Uses code from walk.js script of acorn.js javascript code parser under MIT license
// https://github.com/ternjs/acorn

//require('acorn')
//import acorn from 'acorn'
import acorn from 'acorn-dynamic-import';
//import walk, { base } from 'acorn-jsx-walk';
//import walk from 'acorn/dist/walk.js'

//var script1 = '/test/code_math1.js';
//var script1 = '/test/code_arrays1.js';
//var script1 = '/test/code_maps1.js';
//var script1 = '/test/code_loops1.js';
//var script1 = '/test/code_switch1.js';
//var script1 = '/test/code_paths1.js';
//var script1 = '/test/code_functions1.js';
//var script1 = '/test/code_class1.js';
//var script1 = '/test/code_try1.js';
//var script1 = '/test/code_generator1.js';
//var script1 = '/test/code_export1.js';
//var script1 = '/test/code_import1.js';

//var script1 = '/test/code1_e.js';

//var tokens = [];
//var out1 = document.getElementById("out1");

var debug = true;

//var outln = function(msg){
//  out1.innerHTML += msg+'<br>';
//}
//
//var out = function(msg){
//  out1.innerHTML += msg;
//}
///////////////////////////
export function simple(node, visitors, base1, state, override) {
  if (!base1) base1 = base
  ;(function c(node, st, override) {
    let type = override || node.type, found = visitors[type]
    base1[type](node, st, c)
    if (found) found(node, st)
  })(node, state, override)
}

// An ancestor walk keeps an array of ancestor nodes (including the
// current node) and passes them to the callback as third parameter
// (and also as state parameter when no other state is present).
export function ancestor(node, visitors, base1, state) {
  if (!base1) base1 = base
  let ancestors = []
  ;(function c(node, st, override) {
    let type = override || node.type, found = visitors[type]
    let isNew = node !== ancestors[ancestors.length - 1]
    if (isNew) ancestors.push(node)
    base1[type](node, st, c)
    if (found) found(node, st || ancestors, ancestors)
    if (isNew) ancestors.pop()
  })(node, state)
}

// A recursive walk is one where your functions override the default
// walkers. They can modify and replace the state parameter that's
// threaded through the walk, and can opt how and whether to walk
// their child nodes (by calling their third argument on these
// nodes).
export function recursive(node, state, funcs, base1, override) {
  if (!base1) base1 = base
  let visitor = funcs ? make(funcs, base1) : base
  ;(function c(node, st, override) {
    visitor[override || node.type](node, st, c)
  })(node, state, override)
}

function makeTest(test) {
  if (typeof test === "string")
    return type => type === test
  else if (!test)
    return () => true
  else
    return test
}

class Found {
  constructor(node, state) { this.node = node; this.state = state }
}

// Find a node with a given start, end, and type (all are optional,
// null can be used as wildcard). Returns a {node, state} object, or
// undefined when it doesn't find a matching node.
export function findNodeAt(node, start, end, test, base1, state) {
  test = makeTest(test)
  if (!base1) base1 = base
  try {
    ;(function c(node, st, override) {
      let type = override || node.type
      if ((start == null || node.start <= start) &&
          (end == null || node.end >= end))
        base1[type](node, st, c)
      if ((start === null || node.start === start) &&
          (end === null || node.end === end) &&
          test(type, node))
        throw new Found(node, st)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the innermost node of a given type that contains the given
// position. Interface similar to findNodeAt.
export function findNodeAround(node, pos, test, base1, state) {
  test = makeTest(test)
  if (!base1) base1 = base
  try {
    ;(function c(node, st, override) {
      let type = override || node.type
      if (node.start > pos || node.end < pos) return
      base1[type](node, st, c)
      if (test(type, node)) throw new Found(node, st)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the outermost matching node after a given position.
export function findNodeAfter(node, pos, test, base1, state) {
  test = makeTest(test)
  if (!base1) base1 = base
  try {
    ;(function c(node, st, override) {
      if (node.end < pos) return
      let type = override || node.type
      if (node.start >= pos && test(type, node)) throw new Found(node, st)
      base1[type](node, st, c)
    })(node, state)
  } catch (e) {
    if (e instanceof Found) return e
    throw e
  }
}

// Find the outermost matching node before a given position.
export function findNodeBefore(node, pos, test, base1, state) {
  test = makeTest(test)
  if (!base1) base1 = base
  let max
  ;(function c(node, st, override) {
    if (node.start > pos) return
    let type = override || node.type
    if (node.end <= pos && (!max || max.node.end < node.end) && test(type, node))
      max = new Found(node, st)
    base1[type](node, st, c)
  })(node, state)
  return max
}

// Fallback to an Object.create polyfill for older environments.
const create = Object.create || function(proto) {
  function Ctor() {}
  Ctor.prototype = proto
  return new Ctor()
}

// Used to create a custom walker. Will fill in all missing node
// type properties with the defaults.
export function make(funcs, base1) {
  if (!base1) base1 = base
  let visitor = create(base1)
  for (var type in funcs) visitor[type] = funcs[type]
  return visitor
}

function skipThrough(node, st, c) { c(node, st) }
function ignore(_node, _st, _c) {}

// Node walkers.

export const base = {}

base.Program = base.BlockStatement = (node, st, c) => {
  for (let i = 0; i < node.body.length; ++i)
    c(node.body[i], st, "Statement")
}
base.Statement = skipThrough
base.EmptyStatement = ignore
base.ExpressionStatement = base.ParenthesizedExpression =
  (node, st, c) => c(node.expression, st, "Expression")
base.IfStatement = (node, st, c) => {
  c(node.test, st, "Expression")
  c(node.consequent, st, "Statement")
  if (node.alternate) c(node.alternate, st, "Statement")
}
base.LabeledStatement = (node, st, c) => c(node.body, st, "Statement")
base.BreakStatement = base.ContinueStatement = ignore
base.WithStatement = (node, st, c) => {
  c(node.object, st, "Expression")
  c(node.body, st, "Statement")
}
base.SwitchStatement = (node, st, c) => {
  c(node.discriminant, st, "Expression")
  for (let i = 0; i < node.cases.length; ++i) {
    let cs = node.cases[i]
    if (cs.test) c(cs.test, st, "Expression")
    for (let j = 0; j < cs.consequent.length; ++j)
      c(cs.consequent[j], st, "Statement")
  }
}
base.ReturnStatement = base.YieldExpression = base.AwaitExpression = (node, st, c) => {
  if (node.argument) c(node.argument, st, "Expression")
}
base.ThrowStatement = base.SpreadElement =
  (node, st, c) => c(node.argument, st, "Expression")
base.TryStatement = (node, st, c) => {
  c(node.block, st, "Statement")
  if (node.handler) c(node.handler, st)
  if (node.finalizer) c(node.finalizer, st, "Statement")
}
base.CatchClause = (node, st, c) => {
  c(node.param, st, "Pattern")
  c(node.body, st, "ScopeBody")
}
base.WhileStatement = base.DoWhileStatement = (node, st, c) => {
  c(node.test, st, "Expression")
  c(node.body, st, "Statement")
}
base.ForStatement = (node, st, c) => {
  if (node.init) c(node.init, st, "ForInit")
  if (node.test) c(node.test, st, "Expression")
  if (node.update) c(node.update, st, "Expression")
  c(node.body, st, "Statement")
}
base.ForInStatement = base.ForOfStatement = (node, st, c) => {
  c(node.left, st, "ForInit")
  c(node.right, st, "Expression")
  c(node.body, st, "Statement")
}
base.ForInit = (node, st, c) => {
  if (node.type === "VariableDeclaration") c(node, st)
  else c(node, st, "Expression")
}
base.DebuggerStatement = ignore

base.FunctionDeclaration = (node, st, c) => c(node, st, "Function")
base.VariableDeclaration = (node, st, c) => {
  for (let i = 0; i < node.declarations.length; ++i)
    c(node.declarations[i], st)
}
base.VariableDeclarator = (node, st, c) => {
  c(node.id, st, "Pattern")
  if (node.init) c(node.init, st, "Expression")
}

base.Function = (node, st, c) => {
  if (node.id) c(node.id, st, "Pattern")
  for (let i = 0; i < node.params.length; i++)
    c(node.params[i], st, "Pattern")
  c(node.body, st, node.expression ? "ScopeExpression" : "ScopeBody")
}
// FIXME drop these node types in next major version
// (They are awkward, and in ES6 every block can be a scope.)
base.ScopeBody = (node, st, c) => c(node, st, "Statement")
base.ScopeExpression = (node, st, c) => c(node, st, "Expression")

base.Pattern = (node, st, c) => {
  if (node.type === "Identifier")
    c(node, st, "VariablePattern")
  else if (node.type === "MemberExpression")
    c(node, st, "MemberPattern")
  else
    c(node, st)
}
base.VariablePattern = ignore
base.MemberPattern = skipThrough
base.RestElement = (node, st, c) => c(node.argument, st, "Pattern")
base.ArrayPattern =  (node, st, c) => {
  for (let i = 0; i < node.elements.length; ++i) {
    let elt = node.elements[i]
    if (elt) c(elt, st, "Pattern")
  }
}
base.ObjectPattern = (node, st, c) => {
  for (let i = 0; i < node.properties.length; ++i)
    c(node.properties[i].value, st, "Pattern")
}

base.Expression = skipThrough
base.ThisExpression = base.Super = base.MetaProperty = ignore
base.ArrayExpression = (node, st, c) => {
  for (let i = 0; i < node.elements.length; ++i) {
    let elt = node.elements[i]
    if (elt) c(elt, st, "Expression")
  }
}
base.ObjectExpression = (node, st, c) => {
  for (let i = 0; i < node.properties.length; ++i)
    c(node.properties[i], st)
}
base.FunctionExpression = base.ArrowFunctionExpression = base.FunctionDeclaration
base.SequenceExpression = base.TemplateLiteral = (node, st, c) => {
  for (let i = 0; i < node.expressions.length; ++i)
    c(node.expressions[i], st, "Expression")
}
base.UnaryExpression = base.UpdateExpression = (node, st, c) => {
  c(node.argument, st, "Expression")
}
base.BinaryExpression = base.LogicalExpression = (node, st, c) => {
  c(node.left, st, "Expression")
  c(node.right, st, "Expression")
}
base.AssignmentExpression = base.AssignmentPattern = (node, st, c) => {
  c(node.left, st, "Pattern")
  c(node.right, st, "Expression")
}
base.ConditionalExpression = (node, st, c) => {
  c(node.test, st, "Expression")
  c(node.consequent, st, "Expression")
  c(node.alternate, st, "Expression")
}
base.NewExpression = base.CallExpression = (node, st, c) => {
  c(node.callee, st, "Expression")
  if (node.arguments) for (let i = 0; i < node.arguments.length; ++i)
    c(node.arguments[i], st, "Expression")
}
base.MemberExpression = (node, st, c) => {
  c(node.object, st, "Expression")
  if (node.computed) c(node.property, st, "Expression")
}
base.ExportNamedDeclaration = base.ExportDefaultDeclaration = (node, st, c) => {
  if (node.declaration)
    c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression")
  if (node.source) c(node.source, st, "Expression")
}
base.ExportAllDeclaration = (node, st, c) => {
  c(node.source, st, "Expression")
}
base.ImportDeclaration = (node, st, c) => {
  for (let i = 0; i < node.specifiers.length; i++)
    c(node.specifiers[i], st)
  c(node.source, st, "Expression")
}
base.ImportSpecifier = base.ImportDefaultSpecifier = base.ImportNamespaceSpecifier = base.Identifier = base.Literal = ignore

base.TaggedTemplateExpression = (node, st, c) => {
  c(node.tag, st, "Expression")
  c(node.quasi, st)
}
base.ClassDeclaration = base.ClassExpression = (node, st, c) => c(node, st, "Class")
base.Class = (node, st, c) => {
  if (node.id) c(node.id, st, "Pattern")
  if (node.superClass) c(node.superClass, st, "Expression")
  for (let i = 0; i < node.body.body.length; i++)
    c(node.body.body[i], st)
}
base.MethodDefinition = base.Property = (node, st, c) => {
  if (node.computed) c(node.key, st, "Expression")
  c(node.value, st, "Expression")
}

///////////////////////////
export function walk1(ast, options){
  var st = {};
  var funcs = {};
  options = options || {}
  options.joinTopBlocks = options.joinTopBlocks || false
  
  var goog = window.Blockly.goog;

  //var xml = ['xml'];
  var xml1 = goog.dom.createDom('xml');
  var root_node = xml1;
  var current_node = root_node;
  //var variable_next = null;
  var current_call = false;
  var current_path_chain = [];
  var expression_statement = false;
  var for_init = false;
  var first_variable_declarator = true;
  var id = 0;

  var newNode = function(name, attrs, text, ast_node){
    if(name === 'block'){
      attrs.id = id++;
      //if(ast_node){
        console.log(id+' '+ast_node.loc.start.line);
      //}
    }
    var block1 = goog.dom.createDom(name);
    for(var key in attrs){
      block1.setAttribute(key, attrs[key]);
    }
    if(text) block1.append(text);
    return block1;
  };
    
  // Based on acornjs walk.js recursive parser: 
  //var skipThrough = function(node, st, c) { c(node, st) }
  var ignore = function(_node, _st, _c) {}

  funcs.Program = funcs.BlockStatement = (node, st, c) => {
    for (let i = 0; i < node.body.length; ++i)
      c(node.body[i], st, "Statement")
  }
  funcs.Statement = function(node, st, c) {
    if(debug) console.log("Statement");
    c(node, st)
    if(!options.joinTopBlocks && current_node === root_node ){
    } else{
      if(current_node.children.length > 0){
        var next1 = newNode('next');
        current_node.children[0].appendChild(next1);
        current_node = next1;
      }
    }
  }
  funcs.EmptyStatement = ignore
  funcs.ExpressionStatement = (node, st, c) => {
    if(debug) console.log("ExpressionStatement");
    expression_statement = true;
    c(node.expression, st, "Expression")
  }
  funcs.ParenthesizedExpression = (node, st, c) => { 
    if(debug) console.log("ParenthesizedExpression");  
    c(node.expression, st, "Expression")
  }
  funcs.IfStatement = (node, st, c) => {
    if(debug) console.log("IfStatement");
    var block1 = newNode('block', {type:'controls_if'}, '', node);
    current_node.appendChild(block1);
    if(node.alternate){
      var mutation1 = newNode('mutation', {else:'1'});
      block1.appendChild(mutation1);
    }
    var value1 = newNode('value', {name:'IF0'});
    block1.appendChild(value1);
    var node1 = current_node;
    current_node = value1;
    c(node.test, st, "Expression")
    var statement1 = newNode('statement', {name:'DO0'});
    block1.appendChild(statement1);
    current_node = statement1;
    c(node.consequent, st, "Statement")
    if (node.alternate){
      var statement2 = newNode('statement', {name:'ELSE'});
      block1.appendChild(statement2);
      current_node = statement2;      
      c(node.alternate, st, "Statement")
    }
    current_node = node1;
  }
  funcs.LabeledStatement = (node, st, c) => {
    if(debug) console.log("LabeledStatement");
    c(node.body, st, "Statement")
  }
  funcs.BreakStatement = function(node, st, c) {
    if(debug) console.log("ContinueStatement");
    var block1 = newNode('block',{type:'bi_break'}, '', node)
    current_node.appendChild(block1)
  } // ignore
  funcs.ContinueStatement = function(node, st, c) {
    if(debug) console.log("BreakStatement");
    var block1 = newNode('block',{type:'bi_continue'}, '', node)
    current_node.appendChild(block1)  
  } // ignore
  funcs.WithStatement = (node, st, c) => {
    if(debug) console.log("WithStatement");
    c(node.object, st, "Expression")
    c(node.body, st, "Statement")
  }
  funcs.SwitchStatement = (node, st, c) => {
    if(debug) console.log("SwitchStatement");
    var block1 = newNode('block', {type:'bi_switch'}, '', node);
    current_node.appendChild(block1);
    var node1 = current_node;
    // Check if default case is present
    var cases_len = node.cases.length
    var hasDefault = 0;
    if(cases_len && (node.cases[cases_len-1].test == null)){
      hasDefault = 1;
    }
    var mutation1 = newNode('mutation', {items:node.cases.length+1-hasDefault}) // TODO: Take out +1 when items count corrected on AddSub block
    block1.appendChild(mutation1)
    var switch1 = newNode('value', {name:'switch'})
    block1.appendChild(switch1)
    current_node = switch1;
    c(node.discriminant, st, "Expression")
    for (let i = 0; i < node.cases.length-hasDefault; ++i) {
      let item = newNode('value',{name:'items'+(i+1)})
      block1.appendChild(item)
      let case1 = newNode('block', {type:'bi_case'}, '', node)
      item.appendChild(case1)
      let test1 = newNode('value', {name:'case'})
      case1.appendChild(test1)
      current_node = test1
      let cs = node.cases[i]
      if (cs.test) c(cs.test, st, "Expression")
      let statement1 = newNode('value', {name:'statement'})
      case1.appendChild(statement1)
      current_node = statement1
      for (let j = 0; j < cs.consequent.length; ++j)
        c(cs.consequent[j], st, "Statement")
    }
    if(hasDefault){
      let default1 = newNode('statement', {name:'default'})
      block1.appendChild(default1)
      current_node = default1
      let cs = node.cases[node.cases.length-1]
      for (let j = 0; j < cs.consequent.length; ++j)
        c(cs.consequent[j], st, "Statement")      
    }
    current_node = node1
  }
  funcs.ReturnStatement = (node, st, c) => {
    if(debug) console.log("ReturnStatement");    
    var block1 = newNode('block', {type:'bi_return'}, '', node);
    var value1 = newNode('value', {name:'ret'});
    block1.appendChild(value1);
    current_node.appendChild(block1);
    var node1 = current_node;
    current_node = value1;
    if (node.argument) c(node.argument, st, "Expression")
    current_node = node1;
  }
  funcs.YieldExpression = (node, st, c) => {
    if(debug) console.log("YieldExpression");
    var block1;
    var delegate1;
    if(node.delegate){
      delegate1 = newNode('field', {name:'delegate'}, 'TRUE')
    } else{
      delegate1 = newNode('field', {name:'delegate'}, 'FALSE')      
    }
    if(expression_statement){
      expression_statement = false;
      block1 = newNode('block', {type:'bi_yield'}, '', node);
    } else{
      block1 = newNode('block', {type:'bi_yield_return'}, '', node);
    }
    block1.appendChild(delegate1);
    var value1 = newNode('value', {name:'yield'});
    block1.appendChild(value1);
    current_node.appendChild(block1);
    var node1 = current_node;
    current_node = value1;    
    if (node.argument) c(node.argument, st, "Expression")    
    current_node = node1;
  }
  funcs.AwaitExpression = (node, st, c) => {
    if(debug) console.log("AwaitExpression");
    if (node.argument) c(node.argument, st, "Expression")    
  }
  funcs.ThrowStatement =
    (node, st, c) => {
    if(debug) console.log("ThrowStatement");
    var block1 = newNode('block', {type:'bi_throw'}, '', node)
    current_node.appendChild(block1)
    var throw1 = newNode('value', {name:'throw'})
    block1.appendChild(throw1)
    var node1 = current_node
    current_node = throw1
    c(node.argument, st, "Expression")
    current_node = node1
  }
  funcs.SpreadElement =
    (node, st, c) => {
    if(debug) console.log("SpreadElement");
    var block1 = newNode('block', {type:'bi_spread'}, '', node)
    current_node.appendChild(block1)
    var spread1 = newNode('value', {name:'arg_array'})
    block1.appendChild(spread1)
    var node1 = current_node
    current_node = spread1
    c(node.argument, st, "Expression")
    current_node = node1
  }
  funcs.TryStatement = (node, st, c) => {
    if(debug) console.log("TryStatement");
    var block1 = newNode('block', {type:'bi_try_catch'}, '', node)
    current_node.appendChild(block1)
    var node1 = current_node
    var try1 = newNode('statement', {name:'try'})
    block1.appendChild(try1)
    current_node = try1
    c(node.block, st, "Statement")
    if (node.handler){
      let param1 = newNode('field', {name:'parameter'}, node.handler.param.name)
      block1.appendChild(param1)
      let catch1 = newNode('statement', {name:'catch'})
      block1.appendChild(catch1)
      current_node = catch1
      c(node.handler, st)
    }
    if (node.finalizer){
      let finally1 = newNode('statement', {name:'finally'})
      block1.appendChild(finally1)
      current_node = finally1
      c(node.finalizer, st, "Statement")
    }
    current_node = node1
  }
  funcs.CatchClause = (node, st, c) => {
    if(debug) console.log("CatchClause");
    //c(node.param, st, "Pattern") // JCOA: Already taken care of in the TryStatement
    c(node.body, st, "ScopeBody")
  }
  funcs.WhileStatement = funcs.DoWhileStatement = (node, st, c) => {
    if(debug) console.log("WhileStatement");
    var block1 = newNode('block', {type:'controls_whileUntil'}, '', node)
    current_node.appendChild(block1);
    var mode1 = newNode('field', {name:'MODE'}, 'WHILE')
    block1.appendChild(mode1)
    var test1 = newNode('value', {name:'BOOL'})
    block1.appendChild(test1)    
    var node1 = current_node;
    current_node = test1;    
    c(node.test, st, "Expression")
    var body1 = newNode('statement', {name:'DO'})
    block1.appendChild(body1)    
    current_node = body1;        
    c(node.body, st, "Statement")
    current_node = node1
  }
  funcs.ForStatement = (node, st, c) => {
    if(debug) console.log("ForStatement");
    var block1 = newNode('block', {type: 'bi_for'}, '', node);
    current_node.appendChild(block1);
    var init1 = newNode('statement', {name:'init'});
    block1.appendChild(init1);
    var node1 = current_node;
    current_node = init1;
    if (node.init) c(node.init, st, "ForInit")
    var test1 = newNode('value', {name:'test'});
    block1.appendChild(test1);
    current_node = test1;    
    if (node.test) c(node.test, st, "Expression")
    var update1 = newNode('statement', {name:'update'});
    block1.appendChild(update1);
    current_node = update1;
    expression_statement = true;
    if (node.update) c(node.update, st, "Expression")
    //if (node.update) c(node.update, st, "Statement")
    var statement1 = newNode('statement', {name:'chain'});
    block1.appendChild(statement1);
    current_node = statement1;    
    c(node.body, st, "Statement")
    current_node = node1;
  }
  // TODO: Separate ForOfStatement?
  // Only works with one variable declaration.
  funcs.ForInStatement = funcs.ForOfStatement = (node, st, c) => {
    if(debug) console.log("ForInStatement");
    var block1 = newNode('block', {type: 'bi_for_in'}, '', node);
    current_node.appendChild(block1);
    var init1 = newNode('field', {name:'var'}, node.left.declarations[0].id.name); // Only one declaration allowed.
    block1.appendChild(init1);
    //c(node.left, st, "ForInit") // We are setting the variable here.
    var array1 = newNode('value', {name:'array'});
    block1.appendChild(array1);
    var node1 = current_node;
    current_node = array1;        
    c(node.right, st, "Expression")
    var statement1 = newNode('statement', {name:'chain'});
    block1.appendChild(statement1);
    current_node = statement1;    
    c(node.body, st, "Statement")
    current_node = node1;
  }
  funcs.ForInit = (node, st, c) => {
    for_init = true;
    if(debug) console.log("ForInit");
    if (node.type === "VariableDeclaration"){
      c(node, st)
    }
    //    else { 
    //      c(node, st, "Statement")
    //    }
    else {
      expression_statement = true;
      c(node, st, "Expression") 
    }
    for_init = false;
  }
  funcs.DebuggerStatement = ignore

  funcs.FunctionDeclaration = (node, st, c) => {
    if(debug) console.log("FunctionDeclaration");
    c(node, st, "Function")
  }
  funcs.VariableDeclaration = (node, st, c) => {
    first_variable_declarator = true;
    //variable_next = null;
    if(debug) console.log("VariableDeclaration");
    for (let i = 0; i < node.declarations.length; ++i){
      node.declarations[i].kind = node.kind;
      c(node.declarations[i], st)
    }
  }
  funcs.VariableDeclarator = (node, st, c) => {
    if(debug) console.log("VariableDeclarator");
    //c(node.id, st, "Pattern") // Commented to avoid duplicating var name block.
    // JCOA: Can I reuse the blockly block constructor?
    if(!first_variable_declarator){
      let next1 = newNode('next');
      current_node.children[0].appendChild(next1);
      current_node = next1;
      //let node1 = current_node;
      if(for_init){
        let block1 = newNode('block', {type:'bi_assignment'}, '', node);
        current_node.appendChild(block1);
        var field1 = newNode('field', {name:'OP'}, '=');
        block1.appendChild(field1);
        var left = newNode('value', {name:'A'});    
        block1.appendChild(left);
        var node1 = current_node;
        current_node = left;
        c(node.id, st, "Pattern")
        var right = newNode('value', {name:'B'});    
        block1.appendChild(right);
        current_node = right;

        if (node.init) c(node.init, st, "Expression")
        current_node = node1;
      } else {
        let node1 = current_node;
        let block1 = newNode('block', {type:'bi_var'}, '', node)
        block1.appendChild(newNode('field', {name: 'var_type'}, node.kind));
        block1.appendChild(newNode('field', {name: 'var'}, node.id.name));
        let value1 = newNode('value', {name: 'val'});
        block1.appendChild(value1);
        current_node.appendChild(block1);
        current_node = value1;
        if (node.init) c(node.init, st, "Expression")
        current_node = node1;        
      }
    }
    else {
      let node1 = current_node;
      let block1 = newNode('block', {type:'bi_var'}, '', node)
      block1.appendChild(newNode('field', {name: 'var_type'}, node.kind));
      block1.appendChild(newNode('field', {name: 'var'}, node.id.name));
      let value1 = newNode('value', {name: 'val'});
      block1.appendChild(value1);
      //if(variable_next){
      //  variable_next.appendChild(block1)
      //} else {
        current_node.appendChild(block1);
      //}
      current_node = value1;
      if (node.init) c(node.init, st, "Expression")
      current_node = node1;
      //variable_next = newNode('next')
      //current_node.appendChild(variable_next);
      ////current_node.appendChild(variable_next);
      //block1.appendChild(variable_next);
    }
    first_variable_declarator = false;
  }
  funcs.Function = function (node, st, c) {
    if(debug) console.log("Function");
    var block1;
    var generator1;
    if(node.generator){
      generator1 = newNode('field', {name:'function_type'}, 'function* ')
    } else{
      generator1 = newNode('field', {name:'function_type'}, 'function ')      
    }
    //console.log(expression_statement)
    if(node.id){
      //c(node.id, st, "Pattern") // JCOA: We are already using this name below (Function name)
      //console.log(node.id.name);
      if(expression_statement){
        block1 = newNode('block', {type:'bi_function_return'}, '', node);
      } else {
        block1 = newNode('block', {type:'bi_function'}, '', node);
      }
      block1.appendChild(generator1)
      block1.appendChild(newNode('field', {name:'name'}, node.id.name));
    } else if(node.method){
      block1 = newNode('block', {type:'bi_function'}, '', node);
      block1.appendChild(newNode('field', {name:'function_type'}, ''));
      block1.appendChild(newNode('field', {name:'name'}, node.method));      
    } else{
      block1 = newNode('block', {type:'bi_function_return'}, '', node);      
      block1.appendChild(generator1)
      block1.appendChild(newNode('field', {name:'name'}, ''));
    }
    var args = [];
    for (var i = 0; i < node.params.length; i++){
      //c(node.params[i], st, "Pattern") // JCOA: We are already using this name below
      args.push(node.params[i].name);
    }
    block1.appendChild(newNode('field', {name:'args'}, args.join(',')));
    var statement1 = newNode('statement', {name:'chain'});
    block1.appendChild(statement1);
    current_node.appendChild(block1);
    var node1 = current_node;
    current_node = statement1;
    c(node.body, st, node.expression ? "ScopeExpression" : "ScopeBody")
    current_node = node1;
  };

  // FIXME drop these node types in next major version
  // (They are awkward, and in ES6 every block can be a scope.)
  //funcs.ScopeBody = (node, st, c) => c(node, st, "Statement")
  //funcs.ScopeExpression = (node, st, c) => c(node, st, "Expression")
  
  funcs.Pattern = function(node, st, c){
    if(debug) console.log("Pattern "+node.type);
    if (node.type === "Identifier"){
      //make_text_block_from_text(node.name);
      //outln(node.name); // TODO: Maybe do this on the custom VariablePattern funcs function
      //      var block1 = newNode('block', {type:'bi_field_return'}, '', node);
      //      block1.appendChild(newNode('field',{name:'NAME'},node.name));
      //      var statement1 = newNode('statement',{name:'chain'});
      //      block1.appendChild(statement1);
      //      current_path_chain.push(statement1);
      //      current_node.appendChild(block1);
      c(node, st, "VariablePattern");
    }
    else if (node.type === "MemberExpression")
      //outln(node.property.name);
      c(node, st, "MemberPattern")
    else
      c(node, st)
  };
  funcs.VariablePattern = function(node, st, c) {
    if(debug) console.log("VariablePattern "+node.name);
    var block1 = newNode('block', {type:'bi_var_name'}, '', node);
    block1.appendChild(newNode('field',{name:'NAME'},node.name));
    current_node.appendChild(block1);
  }; // ignore
  funcs.MemberPattern = function(node, st, c) { 
    if(debug) console.log("MemberPattern");
    c(node, st)
  }; // skipTrough
  funcs.RestElement = (node, st, c) => {
    if(debug) console.log("RestElement");
    c(node.argument, st, "Pattern")
  }
  funcs.ArrayPattern =  (node, st, c) => {
    if(debug) console.log("ArrayPattern");
    for (let i = 0; i < node.elements.length; ++i) {
      let elt = node.elements[i]
      if (elt) c(elt, st, "Pattern")
    }
  }
  funcs.ObjectPattern = (node, st, c) => {
    if(debug) console.log("ObjectPattern");
    for (let i = 0; i < node.properties.length; ++i)
      c(node.properties[i].value, st, "Pattern") 
  }
  funcs.Expression = function(node, st, c) { 
    c(node, st)
  }; // skipTrough()
  funcs.ThisExpression = function(node, st, c) {
    if(debug) console.log("ThisExpression");
    var block1;
    if(current_call){
      current_call = false;
    } else {
      if(expression_statement){
        expression_statement = false;
        block1 = newNode('block', {type:'bi_field'}, '', node);
      } else {
        block1 = newNode('block', {type:'bi_field_return'}, '', node);
      }
      block1.appendChild(newNode('field',{name:'NAME'},"this"));
      var value1 = newNode('value',{name:'chain'});
      block1.appendChild(value1);
      current_path_chain.push(value1);
      current_node.appendChild(block1);
    }
  }; // ignore
  funcs.Super = function(node, st, c) {
    if(debug) console.log("Super");
    var block1;
    if(current_call){
      current_call = false;
    } else {
      if(expression_statement){
        expression_statement = false;
        block1 = newNode('block', {type:'bi_field'}, '', node);
      } else {
        block1 = newNode('block', {type:'bi_field_return'}, '', node);
      }
      block1.appendChild(newNode('field',{name:'NAME'},"super"));
      var value1 = newNode('value',{name:'chain'});
      block1.appendChild(value1);
      current_path_chain.push(value1);
      current_node.appendChild(block1);
    }    
  }; // ignore
  funcs.MetaProperty = function(node, st, c) {
    if(debug) console.log("MetaProperty");
  }; // ignore
  funcs.ArrayExpression = (node, st, c) => {
    if(debug) console.log("ArrayExpression");
    var block1 = newNode('block',{type:'lists_create_with'}, '', node);
    current_node.appendChild(block1);
    var mutation1 = newNode('mutation',{items:node.elements.length+1}); // TODO: Take out the +1 when list items number is corrected on core/blocks.js AddSub...
    block1.appendChild(mutation1);
    var node1 = current_node;
    for (let i = 0; i < node.elements.length; ++i) {
      let element1 = newNode('value',{name:'items'+(i+1)});
      block1.appendChild(element1);
      current_node = element1;
      let elt = node.elements[i]
      if (elt) c(elt, st, "Expression")
    }
    current_node = node1;
  }
  funcs.ObjectExpression = (node, st, c) => {
    if(debug) console.log("ObjectExpression");
    var block1 = newNode('block',{type:'maps_create_with'}, '', node);
    current_node.appendChild(block1);
    var mutation1 = newNode('mutation',{items:node.properties.length+1}); // TODO: Take out the +1 when list items number is corrected on core/blocks.js AddSub...
    block1.appendChild(mutation1);    
    var node1 = current_node;
    for (let i = 0; i < node.properties.length; ++i){
      let property1 = newNode('value',{name:'ADD'+(i+1)});
      block1.appendChild(property1);
      current_node = property1;
      c(node.properties[i], st)
    }
    current_node = node1;
  }
  // TODO. Separate and add debug print to each of this methods
  funcs.FunctionExpression = funcs.ArrowFunctionExpression = funcs.FunctionDeclaration
  funcs.SequenceExpression = funcs.TemplateLiteral = (node, st, c) => {
    if(debug) console.log("SequenceExpression");
    var node1 = current_node;
    for (let i = 0; i < node.expressions.length; ++i){
      if(i>0){
        let next1 = newNode('next');
        current_node.children[0].appendChild(next1);
        current_node = next1;
      }
      expression_statement = true;
      c(node.expressions[i], st, "Expression");
    }
    current_node = node1;
  }
  // TODO: Add ExpressionStatement case. Unary statement and Unary expression blocks.
  // node.operator equal to for ex. '++'
  funcs.UnaryExpression = funcs.UpdateExpression = (node, st, c) => {
    if(debug) console.log("UnaryExpression");
    var block1
    if(expression_statement){
      expression_statement = false; // Force to false.
      if(node.prefix){
        block1 = newNode('block', {type:'bi_unary'}, '', node);
      } else {
        block1 = newNode('block', {type:'bi_unary_postfix'}, '', node);        
      }
    } else{
      if(node.prefix){
        block1 = newNode('block', {type:'bi_unary_return'}, '', node);
      } else {
        block1 = newNode('block', {type:'bi_unary_postfix_return'}, '', node);        
      }
    } 
    current_node.appendChild(block1);
    var field1 = newNode('field', {name:'operator'}, node.operator);
    block1.appendChild(field1);
    var value1 = newNode('value', {name:'expression'});
    block1.appendChild(value1);    
    var node1 = current_node;
    current_node = value1;
    c(node.argument, st, "Expression")
    current_node = node1;
  }
  funcs.BinaryExpression = (node, st, c) => {
    if(debug) console.log("BinaryExpression");
    var op;
    var type = 'bi_math_arithmetic';
    switch(node.operator){
      case '+': op='ADD'; break;
      case '-': op='MINUS'; break;
      case '*': op='MULTIPLY'; break;
      case '/': op='DIVIDE'; break;
      case '**': op='POWER'; break;
      case '==': op='EQ'; type = 'logic_compare'; break;
      case '!=': op='NEQ'; type = 'logic_compare'; break;        
      case '<': op='LT'; type = 'logic_compare'; break;        
      case '<=': op='LTE'; type = 'logic_compare'; break;        
      case '>': op='GT'; type = 'logic_compare'; break;        
      case '>=': op='GTE'; type = 'logic_compare'; break;
      case '&&': op='AND'; type = 'logic_operation'; break;
      case '||': op='OR'; type = 'logic_operation'; break;
      default:
        op = node.operator;
        type = 'bi_assignment_return';
    }
    var block1 = newNode('block', {type: type}, '', node);
    block1.appendChild(newNode('field',{name:'OP'},op));
    var value1 = newNode('value',{name:'A'});
    block1.appendChild(value1);
    current_node.appendChild(block1);
    var node1 = current_node;
    current_node = value1;
    expression_statement = false; // JCOA: Avoid incompatible type link on the blocks
    c(node.left, st, "Expression")
    var value2 = newNode('value',{name:'B'});
    block1.appendChild(value2);
    current_node = value2;
    expression_statement = false; // JCOA: Avoid incompatible type link on the blocks
    c(node.right, st, "Expression")
    current_node = node1;
  }
  funcs.LogicalExpression = (node, st, c) => {
    if(debug) console.log("LogicalExpression");
    var op;
    var type = 'logic_operation';
    switch(node.operator){
      case '&&': op='AND'; break;
      case '||': op='OR'; break;
      default:
    }
    var block1 = newNode('block', {type: type}, '', node);
    block1.appendChild(newNode('field',{name:'OP'},op));
    var value1 = newNode('value',{name:'A'});
    block1.appendChild(value1);
    current_node.appendChild(block1);
    var node1 = current_node;
    current_node = value1;
    expression_statement = false; // JCOA: Avoid incompatible type link on the blocks
    c(node.left, st, "Expression")
    var value2 = newNode('value',{name:'B'});
    block1.appendChild(value2);
    current_node = value2;
    expression_statement = false; // JCOA: Avoid incompatible type link on the blocks
    c(node.right, st, "Expression")
    current_node = node1;
  }
  funcs.AssignmentExpression = funcs.AssignmentPattern = (node, st, c) => {
    if(debug) console.log("AssignmentExpression");
    var block1;
    if(expression_statement){
      expression_statement = false;
      block1 = newNode('block', {type:'bi_assignment'}, '', node);
    } else{
      block1 = newNode('block', {type:'bi_assignment_return'}, '', node);
    }
    current_node.appendChild(block1);
    var field1 = newNode('field', {name:'OP'}, node.operator);
    block1.appendChild(field1);
    var left = newNode('value', {name:'A'});    
    block1.appendChild(left);
    var node1 = current_node;
    current_node = left;
    c(node.left, st, "Pattern")
    var right = newNode('value', {name:'B'});    
    block1.appendChild(right);
    current_node = right;
    c(node.right, st, "Expression")
    current_node = node1;
  }
  funcs.ConditionalExpression = (node, st, c) => {
    if(debug) console.log("ConditionalExpression");
    c(node.test, st, "Expression")
    c(node.consequent, st, "Expression")
    c(node.alternate, st, "Expression")
  }
  funcs.NewExpression = (node, st, c) => {
    if(debug) console.log("NewExpression");
    var block1 = newNode('block', {type:'bi_new'}, '', node);
    current_node.appendChild(block1);
    var value1 = newNode('value',{name:'chain'});
    block1.appendChild(value1);
    current_call = true;
    var call1 = newNode('block', {type:'bi_call_editable_return'}, '', node);
    value1.appendChild(call1)
    var mutation1 = newNode('mutation', {items:node.arguments.length+1, names:''}) // TODO: Take out +1 when AddSub... is fixed on the actual length required.
    call1.appendChild(mutation1);
    call1.appendChild(newNode('field',{name:'NAME'},node.callee.name));
    c(node.callee, st, "Expression")
    //if (node.arguments) for (let i = 0; i < node.arguments.length; ++i)
    //  c(node.arguments[i], st, "Expression")
    var node1 = current_node;
    if (node.arguments) for (let i = 0; i < node.arguments.length; ++i){
      let value2 = newNode('value', {name:'items'+(i+1)});
      call1.appendChild(value2);
      current_node = value2;
      c(node.arguments[i], st, "Expression")
    }
    current_node = node1;
    block1.appendChild(value1);
  }
  funcs.CallExpression = (node, st, c) => {
    if(debug) console.log("CallExpression");
    current_call = true;
    var block1;
    var node3;
    var value1;
    var name;
    if(node.callee.type === "MemberExpression"){
      block1 = newNode('block', {type:'bi_call_editable_return'}, '', node);
      name = node.callee.property.name;
    } else if(node.callee.type === "Identifier"){
      if(expression_statement){
        expression_statement = false;
        block1 = newNode('block', {type:'bi_call_editable'}, '', node);
      } else {
        block1 = newNode('block', {type:'bi_call_editable_return'}, '', node);
      }
      current_node.appendChild(block1);
      name = node.callee.name;
    } else if(node.callee.type === "FunctionExpression"){
      if(expression_statement){
        expression_statement = false;
        block1 = newNode('block', {type:'bi_direct_call_editable'}, '', node);
      } else {
        block1 = newNode('block', {type:'bi_direct_call_editable_return'}, '', node);
      }
      current_node.appendChild(block1);
    }
    var mutation1 = newNode('mutation', {items:node.arguments.length+1, names:''}) // TODO: Take out +1 when AddSub... is fixed on the actual length required.
    block1.appendChild(mutation1);
    node3 = current_node
    if(node.callee.type === "FunctionExpression"){
      let func1 = newNode('value',{name:'function'},'')
      block1.appendChild(func1);
      current_node = func1
      current_call = false
      expression_statement = true;      
    } else {
      block1.appendChild(newNode('field',{name:'NAME'},name));
    }
    value1 = newNode('value',{name:'chain'});
    current_path_chain.push(value1);
    c(node.callee, st, "Expression")
    current_node = node3;
    var path_chain1 = current_path_chain; // Save path chain
    current_path_chain = [];
    var node1 = current_node;
    if (node.arguments) for (let i = 0; i < node.arguments.length; ++i){
      let value2 = newNode('value', {name:'items'+(i+1)});
      block1.appendChild(value2);
      current_node = value2;
      c(node.arguments[i], st, "Expression")
    }
    current_node = node1;
    block1.appendChild(value1);
    current_path_chain = path_chain1; // Restore path chain
    if(node.callee.type === "MemberExpression"){
      if(current_path_chain.length > 0){
        let node2 = current_path_chain.pop();
        node2.appendChild(block1);
      }
    }
  }
  funcs.MemberExpression = (node, st, c) => {
    if(debug) console.log("MemberExpression "+node.property.name);
    var is_call = current_call;
    var block1;
    var block2;
    if(is_call){
      current_call = false;
    } else {
      if(node.computed){
        block1 = newNode('block', {type:'bi_index'}, '', node);
        block2 = newNode('value', {name:'index'});
        block1.appendChild(block2);
      } else{
        block1 = newNode('block', {type:'bi_field_return'}, '', node);
        block1.appendChild(newNode('field',{name:'NAME'},node.property.name));
      }
      var value1 = newNode('value',{name:'chain'});
      block1.appendChild(value1);
      current_path_chain.push(value1);
    }
    c(node.object, st, "Expression")
    if (node.computed){
      if(is_call){
        current_call = false;
      } else{
        //block2 = newNode('block', {type:'bi_index'}, '', node);
        //current_node.appendChild(block2);
        //let block3 = newNode('value', {name:'index'});
        //block2.appendChild(block3);
        let node1 = current_node;
        current_node = block2;
        var path_chain1 = current_path_chain; // Save path chain
        current_path_chain = [];
        c(node.property, st, "Expression")
        current_path_chain = path_chain1;
        current_node = node1;
      }
    } else{
      if(is_call){
        current_call = false;
      }
    }
    if(!is_call){
      if(current_path_chain.length > 0){
        let node1 = current_path_chain.pop();
        node1.appendChild(block1);
      }
    }
    //current_path_chain.appendChild(block1);
  }
  funcs.ExportNamedDeclaration = (node, st, c) => {
    if(debug) console.log("ExportNamedDeclaration");
    var block1 = newNode('block',{type:'bi_export'}, '', node);
    current_node.appendChild(block1);
    var statement1 = newNode('statement', {name:'export'});
    block1.appendChild(statement1)
    var node1 = current_node;
    current_node = statement1;
    if (node.declaration)
      c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression")
    if (node.source) c(node.source, st, "Expression")
    current_node = node1;
  }
  funcs.ExportDefaultDeclaration = (node, st, c) => {
    if(debug) console.log("ExportDefaultDeclaration");
    if (node.declaration)
      c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression")
    if (node.source) c(node.source, st, "Expression")
  }
  funcs.ExportAllDeclaration = (node, st, c) => {
    if(debug) console.log("ExportAllDeclaration");
    c(node.source, st, "Expression")
  }
  funcs.ImportDeclaration = (node, st, c) => {
    if(debug) console.log("ImportDeclaration");
    var block1 = newNode('block',{type:'bi_import'}, '', node);
    current_node.appendChild(block1);
    var node1 = current_node;
    var mutation1 = newNode('mutation', {items:node.specifiers.length+1}) // TODO: Take out +1 when items count corrected on AddSub block
    block1.appendChild(mutation1)
    for (let i = 0; i < node.specifiers.length; i++){
      let item = newNode('value',{name:'items'+(i+1)})
      block1.appendChild(item)
      current_node = item
      c(node.specifiers[i], st)
    }
    var from1 = newNode('value', {name:'from'});
    block1.appendChild(from1)
    current_node = from1;    
    c(node.source, st, "Expression")
    current_node = node1
  }
  funcs.ImportSpecifier = function(node, st, c){
    if(debug) console.log("ImportSpecifier");
    var block1
    if(node.imported.name === node.local.name){
      block1 = newNode('block', {type:'bi_var_name'}, '', node);
      block1.appendChild(newNode('field',{name:'NAME'},node.local.name));
    } else{
      block1 = newNode('block', {type:'bi_import_as'}, '', node);
      block1.appendChild(newNode('field',{name:'input'},node.imported.name));
      block1.appendChild(newNode('field',{name:'as'},node.local.name));
    }
    current_node.appendChild(block1);          
  } //ignore
  funcs.ImportDefaultSpecifier = function(node, st, c){
    if(debug) console.log("ImportDefaultSpecifier");
    var block1
    if(node.local.name === ''){
      block1 = newNode('block', {type:'bi_var_name'}, '', node);
      block1.appendChild(newNode('field',{name:'NAME'},'*'));
    } else{
      block1 = newNode('block', {type:'bi_import_as'}, '', node);
      block1.appendChild(newNode('field',{name:'input'},'*'));
      block1.appendChild(newNode('field',{name:'as'},node.local.name));
    }
    current_node.appendChild(block1);          
  } //ignore
  funcs.ImportNamespaceSpecifier = function(node, st, c){
    if(debug) console.log("ImportNameSpecifier");
    var block1 = newNode('block', {type:'bi_var_name'}, '', node);
    block1.appendChild(newNode('field',{name:'NAME'},node.local.name));
    current_node.appendChild(block1);
  } //ignore
  
  funcs.Identifier = function(node, st, c){
    if(debug) console.log("Identifier "+node.name);
    if(current_call){
      current_call = false;
    } else {
      var block1;
      if(expression_statement){
        expression_statement = false;
        block1 = newNode('block', {type:'bi_field'}, '', node);
      } else {
        block1 = newNode('block', {type:'bi_field_return'}, '', node);
      }
      block1.appendChild(newNode('field',{name:'NAME'},node.name));
      var value1 = newNode('value',{name:'chain'});
      block1.appendChild(value1);
      current_path_chain.push(value1);
      current_node.appendChild(block1);
    }
  } //ignore
  funcs.Literal = (node, st , c) => {
    if(debug) console.log("Literal "+node.value);
    // TODO: Test literal string
    //    var block1 = goog.dom.createDom('block');
    //    block1.setAttribute('type', 'math_number');
    //    var field1 = goog.dom.createDom('field');
    //    field1.setAttribute('name', 'NUM');
    //    field1.append(node.value);
    //    block1.appendChild(field1);
    var block1;
    var field1;
    if(node.value instanceof RegExp){
      // TODO JCOA: Add a specific block for RegExp
      block1 = newNode('block', {type:'bi_var_name'}, '', node);
      block1.appendChild(newNode('field', {name:"NAME"}, node.value));
    } else {
      switch(typeof node.value){ 
        case 'number':
          block1 = newNode('block', {type:'math_number'}, '', node);
          block1.appendChild(newNode('field', {name:'NUM'}, node.value.toString()));
          break;
        case 'boolean':
          block1 = newNode('block', {type:'logic_boolean'}, '', node)
          if(node.value){
            field1 = newNode('field', {name:'BOOL'}, 'TRUE')
          } else {
            field1 = newNode('field', {name:'BOOL'}, 'FALSE')          
          }
          block1.appendChild(field1)
          break
        default:
          block1 = newNode('block', {type:'bi_string_return'}, '', node);
          block1.appendChild(newNode('field', {name:'NAME'}, node.value));
          let value1 = newNode('value',{name:'chain'});
          block1.appendChild(value1);
          current_path_chain.push(value1);
      }
    }
    current_node.appendChild(block1);    
  } // ignore()
  funcs.TaggedTemplateExpression = (node, st, c) => {
    if(debug) console.log("TaggedTemplateExpression "+node.tag);
    c(node.tag, st, "Expression")
    c(node.quasi, st)
  }
  funcs.Class = (node, st, c) => {
    if(debug) console.log("Class");
    var block1;
    if (node.id){
      block1 = newNode('block',{type:'bi_class'}, '', node);
      block1.appendChild(newNode('field', {name:'NAME'}, node.id.name));
      // c(node.id, st, "Pattern") // JCOA: We are already using the class name.
    } else {
      block1 = newNode('block',{type:'bi_anonymous_class'}, '', node);
    }
    if (node.superClass){
      let extends1 = newNode('field', {name:'extends'}, node.superClass.name)
      block1.appendChild(extends1)
      // c(node.superClass, st, "Expression") // JCOA Already used the node.superClass.name
    }
    var statement1 = newNode('statement', {name:'chain'});
    block1.appendChild(statement1);
    current_node.appendChild(block1);
    var node1 = current_node;
    current_node = statement1;
    for (let i = 0; i < node.body.body.length; i++)
      c(node.body.body[i], st)
    current_node = node1;
  }
  // body.body[i].kind -> constructor, get, set, method
  // body.body[i].key.name
  funcs.MethodDefinition = (node, st, c) => {
    if(debug) console.log("MethodDefinition "+node.kind);
    var block1
    var node1 = current_node
    var statement1
    if(node.static){
      let static1 = newNode('block', {type:'bi_static'}, '', node)
      current_node.appendChild(static1)
      let statement2 = newNode('statement', {name:'static'})
      static1.appendChild(statement2)
      current_node = statement2
    }
    switch(node.kind){        
      case 'constructor':
        //block1 = newNode('block', {type: 'bi_var'}, '', node);
        //block1.appendChild(newNode('field', {name:'var'}, node.kind));
        node.value.method = node.kind
        break;
      case 'method':
        node.value.method = node.key.name
        break;
      case 'get':
        block1 = newNode('block', {type:'bi_get'}, '', node)
        current_node.appendChild(block1)
        statement1 = newNode('statement', {name:'get'})
        block1.appendChild(statement1)
        current_node = statement1
        node.value.method = node.key.name
        break
      case 'set':
        block1 = newNode('block', {type:'bi_set'}, '', node)
        current_node.appendChild(block1)
        statement1 = newNode('statement', {name:'set'})
        block1.appendChild(statement1)
        current_node = statement1
        node.value.method = node.key.name
        break
      default: 
        //block1 = newNode('block', {type: 'bi_var'}, '', node);
        //block1.appendChild(newNode('field', {name:'var'}, node.kind));
        break;
    }
    if (node.computed) c(node.key, st, "Expression")
    c(node.value, st, "Expression")
    let next1 = newNode('next')
    node1.children[0].appendChild(next1);
    current_node = next1
    //current_node = node1;
  } 
  // TODO: Take into account all node.computed cases.
  funcs.Property = (node, st, c) => {
    if(debug) console.log("Property "+node.kind);
    var block1;
    var node1;
    var chain1;
    switch(node.kind){
      case 'set':
        block1 = newNode('block', {type:'bi_maps_set'}, '', node);
        current_node.appendChild(block1);
        if(node.computed===false){
          block1.appendChild(newNode('field', {name:'name'}, node.key.name));
        } else {
          block1.appendChild(newNode('field', {name:'name'}, '['+node.key.name+']'));          
        }
        block1.appendChild(newNode('field', {name:'val'}, node.value.params[0].name));
        chain1 = newNode('statement', {name:'chain'});
        block1.appendChild(chain1);
        node1 = current_node;
        current_node = chain1;    
        c(node.value.body, st, "Statement")
        current_node = node1;
        break;
      case 'get':
        block1 = newNode('block', {type:'bi_maps_get'}, '', node);
        current_node.appendChild(block1);
        if(node.computed===false){
          block1.appendChild(newNode('field', {name:'name'}, node.key.name));
        } else {
          block1.appendChild(newNode('field', {name:'name'}, '['+node.key.name+']'));          
        }
        chain1 = newNode('statement', {name:'chain'});
        block1.appendChild(chain1);
        node1 = current_node;
        current_node = chain1;    
        c(node.value.body, st, "Statement")
        current_node = node1;
        break;
      default:
        block1 = newNode('block', {type:'maps_create'}, '', node);
        current_node.appendChild(block1);
        //var key1 = newNode('value', {name:'KEY'}, node.key.name);
        let key1 = newNode('value', {name:'KEY'});
        block1.appendChild(key1);
        node1 = current_node;
        current_node = key1;    
        if (node.computed){
          c(node.key, st, "Expression")
        } else {
          let block2 = newNode('block', {type:'text'}, '', node)
          key1.appendChild(block2);
          let field2;
          if(node.key.name){
            // This applies to: myKey: 'value'
            field2 = newNode('field', {name:'TEXT'}, node.key.name);
          } else {
            // This applies to: 'myKey': 'value'
            field2 = newNode('field', {name:'TEXT'}, node.key.value);
          }
          block2.appendChild(field2);
        }
        let value1 = newNode('value', {name:'VAL'});
        block1.appendChild(value1);
        current_node = value1;    
        c(node.value, st, "Expression")
        current_node = node1;
    }
  }
  
  // acorn.
  //walk.
  recursive(ast, st, funcs);
  
  return xml1;
}

export function parseCode(code){
  let Blockly = window.Blockly;
  let workspace = Blockly.mainWorkspace;
  let ast1, xml1;
  let options;
  let comments = [];
  try{
    //console1.value = '';
    window._BIDE.b2c_error = false
    options = {
      sourceType: 'module',
      locations: true,
      onComment: comments
    };
    ast1 = acorn.parse(code, options);
    console.log(comments)
    xml1 = walk1(ast1);
    //console.log(xml1);
    workspace.clear();
    Blockly.Xml.domToWorkspace(workspace, xml1);
    workspace.cleanUp_();
    window._BIDE.updateWorkspace()
 //workspace.addChangeListener(window._BIDE.updateWorkspace);
    //var blockly_code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
    //console.log(blockly_code);  
  } catch(err){
    console.log(err)
    window._BIDE.b2c_error = true
    //workspace.clear();
    //Blockly.Xml.domToWorkspace(workspace, xml1);
    //workspace.cleanUp_();    //workspace.addChangeListener(window._BIDE.updateWorkspace);

    //console1.value += err+'\n';
  }
}

//var parse1 = function(){
//  var client = new XMLHttpRequest();
//  client.open('GET', script1);
//  client.onreadystatechange = function() {
//    if(client.readyState == 4){
//      //out1.innerHTML += client.responseText;
//      var code1 = client.responseText;
//      //var ast1 = acorn.parse(code1);
//      parseCode(code1);
//    }
//  }
//  client.send();
//}

