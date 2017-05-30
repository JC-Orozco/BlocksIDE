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

//var x = a.b.c;

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
//var y = d().f().g;

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

//  <block type="mm_var" id="Ch@n~-0@phx=_BDB!fdR" x="60" y="52">
//    <field name="var">var1</field>
//    <value name="val">
//      <block type="mm_call" id="mM??*:,eFeZX[+5RyLrd">
//        <mutation items="1" names=""></mutation>
//        <field name="NAME">a</field>
//        <value name="chain">
//          <block type="mm_field" id="*-;`vdM2K2-i+@+K@EBp">
//            <field name="NAME">b</field>
//          </block>
//        </value>
//      </block>
//    </value>
//  </block>

//var z = c.a().b() //.b

var z = a(b.c,e).d;
//var z = a(b,e).d;