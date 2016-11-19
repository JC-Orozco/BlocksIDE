//  <block type="mm_var" id="WcJiMkb8NN5U!4gU^1FQ" x="-44" y="1">
//    <field name="var">var1</field>
//    <value name="val">
//      <block type="text" id="v5Dl3gxzN5D[0L#Txp/o">
//        <field name="TEXT">x</field>
//      </block>
//    </value>
//    <next>
//      <block type="mm_var" id="=sXOb%75}P8UuXRXlDCY">
//        <field name="var">var2</field>
//        <next>
//          <block type="mm_switch" id="U,g[`xPB`a-hRb@=|Gjr">
//            <mutation items="3"></mutation>
//            <value name="switch">
//              <block type="mm_var_name" id="lh{j/=O:3]Uv8nabN|S4">
//                <field name="NAME">var1</field>
//              </block>
//            </value>
//            <value name="items1">
//              <block type="mm_case" id="wHXbGeup/AAVa!KN7:x]">
//                <value name="case">
//                  <block type="text" id="4t1,:0eW9woVDk1f8tq[">
//                    <field name="TEXT">a</field>
//                  </block>
//                </value>
//                <statement name="statement">
//                  <block type="mm_assignment" id="YH}b,f?@x#oQqdMhW.n;">
//                    <field name="operator">=</field>
//                    <value name="left">
//                      <block type="mm_var_name" id="oF_*m]O]2EVL59_5b=B^">
//                        <field name="NAME">var2</field>
//                      </block>
//                    </value>
//                    <value name="right">
//                      <block type="math_number" id="xyQ,BzLydn}WddTILG|7">
//                        <field name="NUM">1</field>
//                      </block>
//                    </value>
//                  </block>
//                </statement>
//              </block>
//            </value>
//            <value name="items2">
//              <block type="mm_case" id="m=2_YEVY*u}`yZI0xtKV">
//                <value name="case">
//                  <block type="text" id="/SfFtp_K]~0;CDI6qPd7">
//                    <field name="TEXT">b</field>
//                  </block>
//                </value>
//                <statement name="statement">
//                  <block type="mm_assignment" id="oGb:_~tJKL{xrQrN-UmE">
//                    <field name="operator">=</field>
//                    <value name="left">
//                      <block type="mm_var_name" id="9d8pM+3Ruke-sFn7Wkhg">
//                        <field name="NAME">var2</field>
//                      </block>
//                    </value>
//                    <value name="right">
//                      <block type="math_number" id="B(7C(IzUZ}i?sVZ3cLM)">
//                        <field name="NUM">2</field>
//                      </block>
//                    </value>
//                  </block>
//                </statement>
//              </block>
//            </value>
//            <statement name="default">
//              <block type="mm_assignment" id="vVjj;A)BbM[AGP=DiXR]">
//                <field name="operator">=</field>
//                <value name="left">
//                  <block type="mm_var_name" id="pE#pIf,kgHAlIr8Gqul4">
//                    <field name="NAME">var2</field>
//                  </block>
//                </value>
//                <value name="right">
//                  <block type="math_number" id="eyN[Q/3ctLVlu6(uAOPf">
//                    <field name="NUM">3</field>
//                  </block>
//                </value>
//              </block>
//            </statement>
//          </block>
//        </next>
//      </block>
//    </next>
//  </block>

var var1 = 'x'
var var2
switch(var1){
  case "a":
    var2 = 1;
    break;
  case "b":
    var2 = 2;
    break;
  default:
    var2 = 3;
}