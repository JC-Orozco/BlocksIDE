//  <block type="mm_class" id="28Y_dnAdV}V_y}0(lqW)" x="-7" y="0">
//    <field name="NAME">Polygon</field>
//    <statement name="chain">
//      <block type="mm_named_function" id="O9poRst|DPaZlC_h_)1.">
//        <field name="name">constructor</field>
//        <field name="args">height,width</field>
//        <statement name="chain">
//          <block type="mm_assignment" id="iMXuO/v@XbvBfBtGUCli">
//            <field name="operator">=</field>
//            <value name="left">
//              <block type="mm_field_return" id=":+J=bow3cnufdpLJMKBf">
//                <field name="NAME">this</field>
//                <statement name="chain">
//                  <block type="mm_field" id="=tgI.V=mE78:5%G,1xGx">
//                    <field name="NAME">height</field>
//                  </block>
//                </statement>
//              </block>
//            </value>
//            <value name="right">
//              <block type="mm_field_return" id="AkWLw:VLogErt1krPZ~I">
//                <field name="NAME">height</field>
//              </block>
//            </value>
//            <next>
//              <block type="mm_assignment" id="{Gh*c#D}~Jc`b/WHNcuK">
//                <field name="operator">=</field>
//                <value name="left">
//                  <block type="mm_field_return" id="huv:bDxFdB{r5Pk#0i2Z">
//                    <field name="NAME">this</field>
//                    <statement name="chain">
//                      <block type="mm_field" id="sEP`u{VYZi3?%)Y9mlqx">
//                        <field name="NAME">width</field>
//                      </block>
//                    </statement>
//                  </block>
//                </value>
//                <value name="right">
//                  <block type="mm_field_return" id="-C-*,Jkj~I{p3.cx@@6Q">
//                    <field name="NAME">width</field>
//                  </block>
//                </value>
//              </block>
//            </next>
//          </block>
//        </statement>
//        <next>
//          <block type="mm_get" id="#KRJ7r@_=e(ws!JtUl{T">
//            <statement name="get">
//              <block type="mm_named_function" id="ewg/7s0pZbgD_1BF,y-e">
//                <field name="name">area</field>
//                <field name="args">arg1, arg2, etc</field>
//                <statement name="chain">
//                  <block type="mm_return" id=")t*`Qk*yb`4{94;RzS(p">
//                    <value name="ret">
//                      <block type="mm_field_return" id="QT{Px0!%2U@;o?@p8k1y">
//                        <field name="NAME">this</field>
//                        <statement name="chain">
//                          <block type="mm_call" id="HaN33S*a/Wv#4S?.K2%X">
//                            <mutation items="1" names=""></mutation>
//                            <field name="NAME">f</field>
//                          </block>
//                        </statement>
//                      </block>
//                    </value>
//                  </block>
//                </statement>
//              </block>
//            </statement>
//            <next>
//              <block type="mm_named_function" id="DwDX;Ykei(HQ{o0w+V60">
//                <field name="name">calcArea</field>
//                <field name="args"></field>
//                <statement name="chain">
//                  <block type="mm_return" id="jTrtojM#^U!2*oI#@wlO">
//                    <value name="ret">
//                      <block type="math_arithmetic" id="bTTdseZ0%3+-4CS]7(IC">
//                        <field name="OP">MULTIPLY</field>
//                        <value name="A">
//                          <shadow type="math_number" id="ic~UGY:r%XO%R=@)7rtR">
//                            <field name="NUM">1</field>
//                          </shadow>
//                          <block type="mm_field_return" id="vEWsLq_2g/(:sH)x2yE8">
//                            <field name="NAME">this</field>
//                            <statement name="chain">
//                              <block type="mm_field" id="%OE:{r!in6*jf;8h?Y|;">
//                                <field name="NAME">height</field>
//                              </block>
//                            </statement>
//                          </block>
//                        </value>
//                        <value name="B">
//                          <shadow type="math_number" id="5NY)=B+ca/@8mfZsy7O;">
//                            <field name="NUM">1</field>
//                          </shadow>
//                          <block type="mm_field_return" id="X{mm=gqUQa/wW2!])dQv">
//                            <field name="NAME">this</field>
//                            <statement name="chain">
//                              <block type="mm_field" id="*5hmN@wld*;P}6!b8qA[">
//                                <field name="NAME">width</field>
//                              </block>
//                            </statement>
//                          </block>
//                        </value>
//                      </block>
//                    </value>
//                  </block>
//                </statement>
//              </block>
//            </next>
//          </block>
//        </next>
//      </block>
//    </statement>
//  </block>

// Maybe chain next on MethodDefinition

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

class Polygon2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
//    this.height = 123;
  }
  
  static get area() {
    return "static";
  }

  static set size(x) {
  }
  
  static calcArea() {
    return this.height * this.width;
  }
}

var Polygon3 = class {
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

Polygon2.prototype.calcArea = function(){return "new calcArea"}

class Square extends Polygon{
  calcArea(){
    return 2*super.calcArea();
  }
  
  myStaticFn(){
  }
}

var t1 = 123