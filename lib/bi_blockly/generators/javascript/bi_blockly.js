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

Blockly.JavaScript['bi_assignment'] = function(block) {
  var value_left = Blockly.JavaScript.valueToCode(block, 'left', Blockly.JavaScript.ORDER_ATOMIC);
  var value_right = Blockly.JavaScript.valueToCode(block, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  var text_operator = block.getFieldValue('operator');
  var code = value_left+' '+text_operator+' '+value_right +"\n";
  return code;
};

Blockly.JavaScript['bi_assignment_return'] = function(block) {
  var value_left = Blockly.JavaScript.valueToCode(block, 'left', Blockly.JavaScript.ORDER_ATOMIC);
  var value_right = Blockly.JavaScript.valueToCode(block, 'right', Blockly.JavaScript.ORDER_ATOMIC);
  var text_operator = block.getFieldValue('operator');
  var code = value_left+' '+text_operator+' '+value_right;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bi_try_catch'] = function(block) {
  var statement_try = Blockly.JavaScript.statementToCode(block, 'try');
  var statement_catch = Blockly.JavaScript.statementToCode(block, 'catch');
  var statement_finally = Blockly.JavaScript.statementToCode(block, 'finally');
  var text_parameter = block.getFieldValue('parameter');
  var code = 'try{\n'+statement_try+'\n} catch('+text_parameter+'){\n'+statement_catch+'\n} finally{\n'+statement_finally+"}\n";
  return code;
};

Blockly.JavaScript['bi_catch'] = function(block) {
  var statement_catch = Blockly.JavaScript.statementToCode(block, 'catch');
  var text_parameter = block.getFieldValue('parameter');
  var code = 'catch('+text_parameter+'){\n'+statement_catch+'}\n';
  return code;
};

Blockly.JavaScript['bi_throw'] = function(block) {
  var value_throw = Blockly.JavaScript.valueToCode(block, 'throw', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'throw '+value_throw+'\n';
  return code;
};

Blockly.JavaScript['bi_yield'] = function(block) {
  var value_yield = Blockly.JavaScript.valueToCode(block, 'yield', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_delegate = block.getFieldValue('delegate') == 'TRUE';
  var code = '';
  if(checkbox_delegate){
    code = 'yield* '
  } else{
    code = 'yield '    
  }
  code += value_yield+'\n';
  return code;
};

Blockly.JavaScript['bi_yield_return'] = function(block) {
  var value_yield = Blockly.JavaScript.valueToCode(block, 'yield', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_delegate = block.getFieldValue('delegate') == 'TRUE';
  var code = '';
  if(checkbox_delegate){
    code = 'yield* '
  } else{
    code = 'yield '    
  }
  code += value_yield;
  //return code;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bi_export'] = function(block) {
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'export');
  return 'export '+statement_chain
}

Blockly.JavaScript['bi_import'] = function(block) {
//  var value_import = Blockly.JavaScript.valueToCode(block, 'import', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1);
  for (var n = 1; n < block.itemCount_; n++) {
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';    
  }
  var value_from = Blockly.JavaScript.valueToCode(block, 'from', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'import '
  if(block.itemCount_ == 2){
    code += codeArr[0]
  } else{
    code += '{'+codeArr.join(',')+'}'
  }
  code += ' from '+value_from+'\n'
  return code
}

Blockly.JavaScript['bi_import_as'] = function(block) {
  var text_import = block.getFieldValue('input');
  var text_as = block.getFieldValue('as');
  var code = text_import+' as '+text_as
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['bi_code_part'] = function(block) {
  var text_code = block.getFieldValue('code');
  var code = text_code;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bi_code_line'] = function(block) {
  var text_code = block.getFieldValue('code');
  var code = text_code+"\n";
  return code;
};

Blockly.JavaScript['bi_access_field'] = function(block) {
  var value_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variable'), Blockly.Variables.NAME_TYPE);
  var text_field = block.getFieldValue('field');
  var value_input = Blockly.JavaScript.valueToCode(block, 'input', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_variable+"."+text_field+" = "+value_input+"\n";
  return code;
};

Blockly.JavaScript['bi_set_to'] = function(block) {
  var text_code = block.getFieldValue('code');
  var value_input = Blockly.JavaScript.valueToCode(block, 'input', Blockly.JavaScript.ORDER_ATOMIC);
  var code = text_code+" = "+value_input+"\n";
  return code;
};

Blockly.JavaScript['bi_for'] = function(block) {
  var statement_init = Blockly.JavaScript.statementToCode(block, 'init');
  var value_test = Blockly.JavaScript.valueToCode(block, 'test', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_update = Blockly.JavaScript.statementToCode(block, 'update');
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var code = 'for('+statement_init+'; '+value_test+'; '+statement_update+'){\n'+statement_chain+'}\n';
  return code;
};

Blockly.JavaScript['bi_for_in'] = function(block) {
  var text_var = block.getFieldValue('var');
  var value_array = Blockly.JavaScript.valueToCode(block, 'array', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var code = 'for(let '+text_var+' in '+value_array+'){\n'+statement_chain+'}\n';
  return code;
};

Blockly.JavaScript['bi_switch'] = function(block) {
  var value_switch = Blockly.JavaScript.valueToCode(block, 'switch', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_default = Blockly.JavaScript.statementToCode(block, 'default');
  var codeArr = new Array(block.itemCount_-1);
  for (var n = 1; n < block.itemCount_; n++) {
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';    
  }
  var code = 'switch(' + value_switch + '){\n' + codeArr.join('\n') + '\ndefault: ' + statement_default +'}\n';
  return code;
}

Blockly.JavaScript['bi_case'] = function(block) {
  var value_case = Blockly.JavaScript.valueToCode(block, 'case', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_st = Blockly.JavaScript.statementToCode(block, 'statement');  
  var code = 'case '+value_case+':' + statement_st //+ '\n';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];  
}

Blockly.JavaScript['bi_continue'] = function(block) {
  return '\ncontinue\n'
}

Blockly.JavaScript['bi_break'] = function(block) {
  return '\nbreak\n'  
}

Blockly.JavaScript['bi_call_statement'] = function(block) {
  // Create a list with any number of elements of any type.
  var text_name = block.getFieldValue('NAME');
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain != ""){
    chain = "."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = text_name + '(' + codeArr.join(', ') + ')' + chain+'\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_call'] = function(block) {
  // Create a list with any number of elements of any type.
  var text_name = block.getFieldValue('NAME');
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain != ""){
    chain = "."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = text_name + '(' + codeArr.join(', ') + ')' + chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_call_editable'] = function(block) {
  // Create a list with any number of elements of any type.
  var text_name = block.getFieldValue('NAME');
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1); // block.itemCount_);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain != ""){
    chain = "\n  ."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = text_name + '(' + codeArr.join(', ') + ')' + chain+'\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_call_editable_return'] = function(block) {
  // Create a list with any number of elements of any type.
  var text_name = block.getFieldValue('NAME');
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var codeArr = new Array(block.itemCount_-1); // block.itemCount_);
  for (var n = 1; n < block.itemCount_; n++) {
    // code[n] = Blockly.JavaScript.valueToCode(block, 'ADD' + n,
    //     Blockly.JavaScript.ORDER_COMMA) || 'null';
    // TODO: Fix the naming on the AddSubGroup block and use code above
    codeArr[n-1] = Blockly.JavaScript.valueToCode(block, 'items' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var chain = "";
  if(value_chain != ""){
    chain = "\n  ."+value_chain.trim();
  }
  //var code = text_name.substr(1, text_name.length-2) + '(' + codeArr.join(', ') + ')' + chain;
  var code = text_name + '(' + codeArr.join(', ') + ')' + chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_function'] = function(block) {
  var text_name = block.getFieldValue('name');
  var function_type = block.getFieldValue('function_type');
  var text_args = block.getFieldValue('args');
  var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var chain = statements_chain;
  var code = function_type+'(';
  code += text_args + '){\n' + chain +'}\n';

  //return [code, Blockly.JavaScript.ORDER_NONE];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_named_function'] = function(block) {
  var text_name = block.getFieldValue('name');
  var function_type = block.getFieldValue('function_type');
  var text_args = block.getFieldValue('args');
  var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var chain = statements_chain;
  var code = function_type+text_name+'(';    
  code += text_args + '){\n' + chain +'}\n';
  return code;
};

Blockly.JavaScript['bi_return'] = function(block) {
  var value_ret = Blockly.JavaScript.valueToCode(block, 'ret', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'return '+value_ret+'\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_var'] = function(block) {
  var var_type = block.getFieldValue('var_type');
  var text_var = block.getFieldValue('var');
  var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
  var code = var_type+' '+text_var;
  if(value_val == ''){
    code += '\n';
  } else{
    code +=' = '+value_val +'\n';
  }
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return code;
};

Blockly.JavaScript['bi_var_name'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var code = text_name;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_new'] = function(block) {
  var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  chain = statements_chain.trim();
  var code = "new "+chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_anonymous_class'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var text_extends = block.getFieldValue('extends');
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var code = 'class '+text_name
  if(text_extends != '')
    code += ' extends '+text_extends
  code += '{\n'+statement_chain+'}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_class'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var text_extends = block.getFieldValue('extends');
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  var code = 'class '+text_name
  if(text_extends != '')
    code += ' extends '+text_extends
  code += '{\n'+statement_chain+'}\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_static'] = function(block) {
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'static');
  return 'static '+statement_chain
}

Blockly.JavaScript['bi_get'] = function(block) {
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'get');
  return 'get '+statement_chain
}

Blockly.JavaScript['bi_set'] = function(block) {
  var statement_chain = Blockly.JavaScript.statementToCode(block, 'set');
  return 'set '+statement_chain
}

Blockly.JavaScript['bi_field'] = function(block) {
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var text_name = block.getFieldValue('NAME');
  var chain = '';
  if(value_chain != ''){
    if(value_chain[0] == '['){
      chain = value_chain.trim();
    } else{
      chain = '.'+value_chain.trim();
    }
  }
  var code = text_name+chain+'\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_field_return'] = function(block) {
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var text_name = block.getFieldValue('NAME');
  var chain = '';
  if(value_chain != ''){
    if(value_chain[0] == '['){
      chain = value_chain.trim();
    } else{
      chain = '.'+value_chain.trim();
    }
  }
  var code = text_name+chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_index'] = function(block) {
  var value_chain = Blockly.JavaScript.valueToCode(block, 'chain', Blockly.JavaScript.ORDER_ATOMIC);
  var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);  
  var chain = '';
  if(value_chain != ''){
    chain = '.'+value_chain.trim();
  }
  var code = '['+value_index+']'+chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_adaptor'] = function(block) {
  var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  chain = statements_chain.trim();
  var code = chain;
  //var code = statements_chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_statement'] = function(block) {
  var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
  chain = statements_chain.trim();
  var code = chain;
  //var code = statements_chain;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_unary'] = function(block) {
  var value_expression = Blockly.JavaScript.valueToCode(block, 'expression', Blockly.JavaScript.ORDER_ATOMIC);
  var text_operator = block.getFieldValue('operator');
  var code = text_operator+value_expression +'\n';
  //return [code, Blockly.JavaScript.ORDER_ATOMIC];
  return code;
};

Blockly.JavaScript['bi_unary_return'] = function(block) {
  var value_expression = Blockly.JavaScript.valueToCode(block, 'expression', Blockly.JavaScript.ORDER_ATOMIC);
  var text_operator = block.getFieldValue('operator');
  var code = text_operator+value_expression;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return code;
};

Blockly.JavaScript['bi_spread'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'arg_array', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '...'+value_name;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  //return [code, Blockly.JavaScript.ORDER_NONE];
  //return code;
};

