//  <block type="mm_var" id="%Bb_L(O=eNWYzD8%g0xb" x="11" y="53">
//    <field name="var">map1</field>
//    <value name="val">
//      <block type="maps_create_with" id="vhOaheelPmUn3,T;.:]O">
//        <mutation items="3"></mutation>
//        <value name="ADD1">
//          <block type="maps_create" id="Jhd]g`zveGl8Zluzvbgi">
//            <value name="KEY">
//              <block type="text" id="/Rz0}*b[d+=s,w={aj}#">
//                <field name="TEXT">a</field>
//              </block>
//            </value>
//            <value name="VAL">
//              <block type="math_number" id="bh5;hvmXffL|N^cGhY_u">
//                <field name="NUM">1</field>
//              </block>
//            </value>
//          </block>
//        </value>
//        <value name="ADD2">
//          <block type="maps_create" id="Lo4dz+=[W;N=]pHsU/Bl">
//            <value name="KEY">
//              <block type="text" id=":PyI,z6WUhC_`^OH#lLF">
//                <field name="TEXT">b</field>
//              </block>
//            </value>
//            <value name="VAL">
//              <block type="text" id="6:QDb}_zxdGF..dcbdSI">
//                <field name="TEXT">two</field>
//              </block>
//            </value>
//          </block>
//        </value>
//      </block>
//    </value>
//  </block>

// On the generated code of this the map is including the 0 item as null, the generator should either ignore this 0 case of fix the index on the block mutator definition.
var map1 = {a:1, b:'two'}

// This is not yet well handled
var map2 = {a, b}
