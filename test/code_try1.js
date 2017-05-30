//  <block type="mm_try_catch" id="`BY0Ob?a15.(oq)?a-^7" x="-7" y="0">
//    <field name="parameter">e</field>
//    <statement name="try">
//      <block type="mm_var" id="pX0L_ywO98GQ1}86w;dD">
//        <field name="var">a</field>
//        <value name="val">
//          <block type="math_number" id="uJ{M,zKi2Pux,b.T58O+">
//            <field name="NUM">1</field>
//          </block>
//        </value>
//      </block>
//    </statement>
//    <statement name="catch">
//      <block type="mm_var" id="]YU`9oT9{x1(DTZwt(rQ">
//        <field name="var">err</field>
//        <value name="val">
//          <block type="mm_field_return" id="YJb%;XqH.euyl@E960]p">
//            <field name="NAME">e</field>
//          </block>
//        </value>
//      </block>
//    </statement>
//    <statement name="finally">
//      <block type="mm_var" id="EC0]7^f[MaeTp|+k!i3s">
//        <field name="var">z</field>
//        <value name="val">
//          <block type="math_number" id=".LFQQL!h0c0LtyEu!`}e">
//            <field name="NUM">123</field>
//          </block>
//        </value>
//      </block>
//    </statement>
//  </block>

try{
  var a = 1;
  throw "my throw error test"
}
catch(e){
  var err = e;
}
finally{
  var z = 123;
}