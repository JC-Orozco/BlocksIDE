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

var x = console.log("yes");
console.log("no");
//var x = console.log("yes");
//var x = 3;

if(a==1){
  console.log("a==1");
}

if(a==1){
  console.log("a==1");
} else {
  console.log("a!=1");
}
