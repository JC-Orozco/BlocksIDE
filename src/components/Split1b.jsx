import React, { Component } from 'react';
import SplitPane from "react-split-pane";
import Tabs1 from "./Tabs1.jsx"
import Tabs2 from "./Tabs2.jsx"

class Split1b extends Component {
  resize() {
    //console.log("Split resize")
    try{
      window._BIDE.resize.resize()
    } catch(err) {
      console.log(err)
    }
  }
  render() {
    var style = {
      top: "20px"
    }
    return (
      <SplitPane style={style} onChange={this.resize} split="horizontal" minSize={150} defaultSize={'50vh'}>
        <div>
          <div><b>BlocksIDE</b> (Alpha) 0.3.0 by Juan Carlos Orozco. Requires Chrome</div>
          <Tabs1 />
        </div>
        <Tabs2 />
      </SplitPane>
    );
  }
}

export default Split1b;
