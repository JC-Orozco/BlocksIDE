//  <block type="mm_for" id="MDDN,-P0`~=@iG,V6CB?" x="47" y="107">
//    <statement name="init">
//      <block type="mm_var" id="8TokK=-@Sn^BBjT[z{_-">
//        <field name="var">i</field>
//        <value name="val">
//          <block type="math_number" id="!T`lPsmjiln{1JR30bWf">
//            <field name="NUM">0</field>
//          </block>
//        </value>
//      </block>
//    </statement>
//    <value name="test">
//      <block type="logic_compare" id="pbF#W1D53g~/VlT!6D,s">
//        <field name="OP">EQ</field>
//        <value name="A">
//          <block type="mm_field_return" id="}35mG4}^/;I)PUaK}w{o">
//            <field name="NAME">i</field>
//          </block>
//        </value>
//        <value name="B">
//          <block type="math_number" id="O@n05`MT=RUx{Socc?i8">
//            <field name="NUM">10</field>
//          </block>
//        </value>
//      </block>
//    </value>
//    <statement name="update">
//      <block type="mm_assignment" id="Czl2,B4b*B3h/gdtUMrb">
//        <value name="left">
//          <block type="mm_field_return" id="ivLU3sd]HF(%03}=]#%T">
//            <field name="NAME">i</field>
//          </block>
//        </value>
//        <value name="right">
//          <block type="math_arithmetic" id="wY=}g7`]L}zq-!OVpN_t">
//            <field name="OP">ADD</field>
//            <value name="A">
//              <block type="mm_field_return" id="vfh#*A56HgHBh7=Rx-cw">
//                <field name="NAME">i</field>
//              </block>
//            </value>
//            <value name="B">
//              <block type="math_number" id="3aDE2^4/MfcH}g7oPjw2">
//                <field name="NUM">1</field>
//              </block>
//            </value>
//          </block>
//        </value>
//      </block>
//    </statement>
//    <statement name="chain">
//      <block type="mm_var" id="G`[3tnVkbD|0|aq+ndw(">
//        <field name="var">var1</field>
//        <value name="val">
//          <block type="mm_field_return" id="51`]o~K;%9CwSCq+cJPx">
//            <field name="NAME">i</field>
//          </block>
//        </value>
//      </block>
//    </statement>
//  </block>


//<block type="controls_for" id="vCogxhaO,i`)Ut@b~f,R" x="-21" y="0">
//  <field name="VAR">i</field>
//  <value name="FROM">
//    <block type="math_number" id="Nd@rku%zWdBClN1k%TTq">
//      <field name="NUM">1</field>
//    </block>
//  </value>
//  <value name="TO">
//    <block type="math_number" id="y9bWMa,k#1iG)PFu`qhk">
//      <field name="NUM">10</field>
//    </block>
//  </value>
//  <value name="BY">
//    <block type="math_number" id="/A4]w#sPybisVL{a;SzY">
//      <field name="NUM">1</field>
//    </block>
//  </value>
//  <statement name="DO">
//    <block type="mm_var" id=";|6]0h]o2GPP#Abp=t^U">
//      <field name="var">var1</field>
//      <value name="val">
//        <block type="variables_get" id="/f(,n%g*ih;Go,ytZC[x">
//          <field name="VAR">i</field>
//        </block>
//      </value>
//    </block>
//  </statement>
//  <next>
//    <block type="controls_forEach" id="7Yl@z=~E7YS`uOh%Q,F2">
//      <field name="VAR">j</field>
//      <value name="LIST">
//        <block type="lists_create_with" id="]5+Ac*EH*~r#=Ml%mxS:">
//          <mutation items="3"></mutation>
//          <value name="items1">
//            <block type="math_number" id="@+2YwbC)[Wg?6+_4Tojc">
//              <field name="NUM">4</field>
//            </block>
//          </value>
//          <value name="items2">
//            <block type="math_number" id="npn[w/Znh~C_-uTD2~Z:">
//              <field name="NUM">5</field>
//            </block>
//          </value>
//        </block>
//      </value>
//      <statement name="DO">
//        <block type="mm_var" id="vn*06*h!^Xy/,doWS,mc">
//          <field name="var">var2</field>
//          <value name="val">
//            <block type="mm_field_return" id="C6[O=^rlfYCXKmFA|%9*">
//              <field name="NAME">j</field>
//            </block>
//          </value>
//        </block>
//      </statement>
//    </block>
//  </next>
//</block>

//Statement
//script1.js:171 ForStatement
//script1.js:184 ForInit
//script1.js:195 VariableDeclaration
//script1.js:200 VariableDeclarator
//script1.js:246 Pattern Identifier
//script1.js:265 VariablePattern i
//script1.js:546 Literal 0
//script1.js:361 BinaryExpression
//script1.js:527 Identifier i
//script1.js:546 Literal 10
//script1.js:344 UnaryExpression
//script1.js:527 Identifier i
//2script1.js:60 Statement
//script1.js:195 VariableDeclaration
//script1.js:200 VariableDeclarator
//script1.js:246 Pattern Identifier
//script1.js:265 VariablePattern var1
//script1.js:527 Identifier i
//script1.js:60 Statement
//script1.js:178 ForInStatement
//script1.js:184 ForInit
//script1.js:195 VariableDeclaration
//script1.js:200 VariableDeclarator
//script1.js:246 Pattern Identifier
//script1.js:265 VariablePattern j
//script1.js:316 ArrayExpression
//script1.js:546 Literal 4
//script1.js:546 Literal 5
//script1.js:546 Literal 6
//2script1.js:60 Statement
//script1.js:195 VariableDeclaration
//script1.js:200 VariableDeclarator
//script1.js:246 Pattern Identifier
//script1.js:265 VariablePattern var2
//script1.js:527 Identifier j

++i
//
for(var i=0; i<10; ++i){
//for(var i=0; i<10; i = i+1){
  var var1 = i;
}

// var j is not working as expected, maybe with let or var use the var name to set the value of a text field on the block
//
//  <block type="mm_for_in" id="T4JI%l6.P2hXz5=(N{Ut" x="9" y="17">
//    <field name="var">i</field>
//    <value name="array">
//      <block type="lists_create_with" id="LoAi}.DOLh(U|M4ggMbT">
//        <mutation items="4"></mutation>
//        <value name="items1">
//          <block type="math_number" id="JFS_6VbH!Q0Qv-SP=0_)">
//            <field name="NUM">4</field>
//          </block>
//        </value>
//        <value name="items2">
//          <block type="math_number" id="PGwS?]queNVtQWGzrYQ{">
//            <field name="NUM">5</field>
//          </block>
//        </value>
//        <value name="items3">
//          <block type="math_number" id="L[%~O~#S[CXyI6|WreoQ">
//            <field name="NUM">6</field>
//          </block>
//        </value>
//      </block>
//    </value>
//    <statement name="chain">
//      <block type="mm_var" id="H%Vg%/s_GX(#(6G6p`#8">
//        <field name="var">var2</field>
//        <value name="val">
//          <block type="mm_field_return" id="*TToZ4pji0ki?9u(TB.p">
//            <field name="NAME">j</field>
//          </block>
//        </value>
//      </block>
//    </statement>
//  </block>

for(var j in [4,5,6]){
  var var2 = j;
}

//  <block type="controls_whileUntil" id="uKBQM089`XjH~,qSq|WR" x="115" y="89">
//    <field name="MODE">WHILE</field>
//    <value name="BOOL">
//      <block type="logic_compare" id="/_{IW%ZUtq?C}2woe{~,">
//        <field name="OP">LT</field>
//        <value name="A">
//          <block type="mm_var_name" id="|1H2oS]]T|tN/yU^n~tp">
//            <field name="NAME">a</field>
//          </block>
//        </value>
//        <value name="B">
//          <block type="math_number" id="(fkgp5tk|hr!9.0SMPIP">
//            <field name="NUM">3</field>
//          </block>
//        </value>
//      </block>
//    </value>
//    <statement name="DO">
//      <block type="mm_assignment" id="[!%n:6OX`RBO6:5O,DoH">
//        <field name="operator">+=</field>
//        <value name="left">
//          <block type="mm_var_name" id="/z*!DfA%q6RfXfK}SmGy">
//            <field name="NAME">a</field>
//          </block>
//        </value>
//        <value name="right">
//          <block type="math_number" id="5RbD%JX7DX^]RlB1^{KT">
//            <field name="NUM">1</field>
//          </block>
//        </value>
//      </block>
//    </statement>
//  </block>

var a
while(a<3){
  a += 1
}
