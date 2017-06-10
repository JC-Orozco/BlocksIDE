// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

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
  componentDidMount() {
    window._BIDE.console1 = this.console1
  }
  render() {
    return (
      <SplitPane onChange={this.resize} split="horizontal" minSize={300} defaultSize={'75vh'}>
        <Blockly1 />
        <div>
          <div>
            <span>console1:</span>
            <button onClick={window.console1.clear}>Clear</button>
          </div>
          <div id='console1' ref={ref => this.console1 = ref} />
        </div>
      </SplitPane>
    );
  }
}

export default Split1a;
