import React, { Component } from 'react';
// Needs .Reziser CSS confugurations to work
import SplitPane from "react-split-pane";
import Split1a from './Split1a.jsx';
import Split1b from './Split1b.jsx';

class Split1 extends Component {
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
      <SplitPane onChange={this.resize} split="vertical" minSize={250} defaultSize={'50vw'}>
        <Split1a />
        <Split1b />
      </SplitPane>
    );
  }
}

export default Split1;
