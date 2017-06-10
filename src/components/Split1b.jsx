// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import SplitPane from "react-split-pane";
import Tabs1 from "./Tabs1.jsx"
import Layout1b2 from "./Layout1b2.jsx"

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
    return (
      <SplitPane onChange={this.resize} split="horizontal" minSize={150} defaultSize={'40vh'}>
        <Tabs1 />
        <Layout1b2 />
      </SplitPane>
    );
  }
}

export default Split1b;
