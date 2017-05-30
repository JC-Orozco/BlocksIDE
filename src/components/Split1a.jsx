import React, { Component } from 'react';
import SplitPane from "react-split-pane";
import Blockly1 from './Blockly1.jsx';

class Split1a extends Component {
  resize() {
    //console.log("Split resize")
    try{
      window._BIDE.resize.resize()
    } catch(err) {
      console.log(err)
    }
  }
  render() {
    return (
      <SplitPane onChange={this.resize} split="horizontal" minSize={300} defaultSize={'75vh'}>
        <Blockly1 />
        <div>console1:</div>        
        <div id='console1'>console1:</div>
      </SplitPane>
    );
  }
}

export default Split1a;
