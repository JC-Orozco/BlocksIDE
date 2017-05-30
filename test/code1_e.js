//  <block type="controls_if" id="T}]LQHU4ggUmo/6eaUC4" x="43" y="-10">
//    <mutation else="1"></mutation>
//    <value name="IF0">
//      <block type="logic_compare" id="(zE~iShn}oW4-Dx=-,b{">
//        <field name="OP">EQ</field>
//        <value name="A">
//          <block type="mm_field_return" id="ZT1tL5M0x7fKccMP9O8F">
//            <field name="NAME">field1</field>
//          </block>
//        </value>
//        <value name="B">
//          <block type="math_number" id="`e~?I5*_:PS_k.CJ58C6">
//            <field name="NUM">1</field>
//          </block>
//        </value>
//      </block>
//    </value>
//    <statement name="DO0">
//      <block type="mm_field" id="eiwc0*(8O,lyGeO:yNcU">
//        <field name="NAME">console</field>
//        <statement name="chain">
//          <block type="mm_function_call" id="7;p`;Jha1e+6W1F11-hr">
//            <mutation items="2"></mutation>
//            <field name="NAME">log</field>
//            <value name="items1">
//              <block type="math_number" id="^/~n2DC]!e_Z`s{6H#sC">
//                <field name="NUM">0</field>
//              </block>
//            </value>
//          </block>
//        </statement>
//      </block>
//    </statement>
//    <statement name="ELSE">
//      <block type="mm_field" id="Ba,Y@O:N/rnTIGS3xX3x">
//        <field name="NAME">console</field>
//        <statement name="chain">
//          <block type="mm_function_call" id=")jx@sqj+w_9?N=R4O|)d">
//            <mutation items="2"></mutation>
//            <field name="NAME">log</field>
//            <value name="items1">
//              <block type="math_number" id="}vp:;Ug%OyMSl[Ke,Amp">
//                <field name="NUM">1</field>
//              </block>
//            </value>
//          </block>
//        </statement>
//      </block>
//    </statement>
//  </block>

if(a==1){
  console.log("a==1");
} else {
  console.log("a!=1");
}

// Stack for MemberExpressions and CallExpressions? They use reverse order.

// MemberExpression node.property.name c Identifier
// MemberExpression node.property.name b Identifier
// Identifier node.name a

//  <block type="mm_var" id=";JN_6uL#9byV;6^.`cxo" x="30" y="69">
//    <field name="var">x</field>
//    <value name="val">
//      <block type="mm_field_return" id="uG%|aPuEWFq9.RLZ!3xj">
//        <field name="NAME">a</field>
//        <statement name="chain">
//          <block type="mm_field" id="^l~_^w?XJ}DwDG[!Zm?a">
//            <field name="NAME">b</field>
//            <statement name="chain">
//              <block type="mm_field" id="+{#LqFan}zF7#_Pa)nuw">
//                <field name="NAME">c</field>
//              </block>
//            </statement>
//          </block>
//        </statement>
//      </block>
//    </value>
//  </block>

var x = a.b.c;

// MemberExpression node.property.name g Identifier
// CallExpression node.callee MemberExpression node.arguments Array[0]
// MemberExpression node.property.name f Identifier
// CallExpression node.callee Identifier node.callee.name d node.arguments Array[0]
// Identifier node.name d

//<block type="mm_var" id="k:RcOQ#2^{)n[g42h.(." x="1" y="3">
//  <field name="var">y</field>
//  <value name="val">
//    <block type="mm_call_return" id="[-}LO6o*BU=rkA`pW@}/">
//      <mutation items="1" names=""></mutation>
//      <field name="NAME">d</field>
//      <statement name="chain">
//        <block type="mm_call" id="*6a=+GV*9bHhR@0BiYDY">
//          <mutation items="1" names=""></mutation>
//          <field name="NAME">f</field>
//          <statement name="chain">
//            <block type="mm_field" id="4i)X1i-ECLO_RGmIiijB">
//              <field name="NAME">g</field>
//            </block>
//          </statement>
//        </block>
//      </statement>
//    </block>
//  </value>
//</block>
var y = d().f().g;

// MemberExpression node.property.name d Identifier
// CallExpression node.callee Identifier a
//   node.arguments[0] MemberExpression node.arguments[0].property.name c
// Identifier name a
// MemberExpression node.property.name c
// Identifier name b
// Identifier name e

//VariableDeclaration
//VariableDeclarator
//Pattern Identifier
//VariablePattern z
//MemberExpression d
//CallExpression
//Identifier a
//MemberExpression c
//Identifier b
//Identifier e

//<block type="mm_var" id="DqhFDq6,eHKI6P(6a*0K" x="1" y="3">
//  <field name="var">z</field>
//  <value name="val">
//    <block type="mm_call_return" id="s%OXY8%?Oh{Y%}y3mJ;R">
//      <mutation items="3" names="b,c"></mutation>
//      <field name="NAME">a</field>
//      <value name="items1">
//        <block type="mm_field_return" id="0sF4w6t!(yP:p:|,}C,J">
//          <field name="NAME">b</field>
//          <statement name="chain">
//            <block type="mm_field" id="V-)[KbmST?C}Wy~RRc^Z">
//              <field name="NAME">c</field>
//            </block>
//          </statement>
//        </block>
//      </value>
//      <value name="items2">
//        <block type="mm_field_return" id="6jE)lt5y{Oc(8[A=(-~}">
//          <field name="NAME">e</field>
//        </block>
//      </value>
//      <statement name="chain">
//        <block type="mm_field" id="S?VFeA393Escch348|Sb">
//          <field name="NAME">d</field>
//        </block>
//      </statement>
//    </block>
//  </value>
//</block>

var z = a(b.c,e).d;

function sum (x, y) { return x + y }
var pi = 3.141593
var str1 = "Hello"

var a = function(x,y,z){
  var b = function(u,v){
  };
};

function a(x,y,z){
  function b(u,v){
    return u*v
  }
}

//<block type="mm_assignment" id=".#4)6yX{BcN:,ncnvTSM" x="38" y="17">
//  <value name="left">
//    <block type="mm_field_return" id="_p@;bafC78w9=?|h|OGN">
//      <field name="NAME">a</field>
//    </block>
//  </value>
//  <value name="right">
//    <block type="mm_field_return" id="(/L)Ydi?3ldOrV)oF_--">
//      <field name="NAME">b</field>
//    </block>
//  </value>
//</block>

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
//    this.height = 123;
  }
  
  get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }
}
