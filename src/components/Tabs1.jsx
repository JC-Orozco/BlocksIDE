// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

//var tabs1_this;
class Tabs1 extends Component {
  constructor() {
    super();
    //tabs1_this = this;
    this.state = { tabIndex: 0 };
  }
  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
    //tabs1_this.setState({ tabIndex: index });
    this.setState({ tabIndex: index });
  }
  componentDidMount() {
    //window._BIDE.pane1 = this.pane1
    window.pane1 = this.pane1
    window.svg1 = this.svg1
  }
  render() {
    var pane1Style = {
      height: '300px' // '100%'
    }
    return (
      <Tabs onSelect={this.handleSelect.bind(this)}
        //selectedIndex={2}
        >

        {/*
          <TabList/> is a composite component and is the container for the <Tab/>s.
        */}

        <TabList>

          {/*
            <Tab/> is the actual tab component that users will interact with.

            Selecting a tab can be done by either clicking with the mouse,
            or by using the keyboard tab to give focus then navigating with
            the arrow keys (right/down to select tab to the right of selected,
            left/up to select tab to the left of selected).

            The content of the <Tab/> (this.props.children) will be shown as the label.
          */}

          <Tab>pane1</Tab>
          <Tab>help</Tab>
        </TabList>

        {/*
          <TabPanel/> is the content for the tab.

          There should be an equal number of <Tab/> and <TabPanel/> components.
          <Tab/> and <TabPanel/> components are tied together by the order in
          which they appear. The first (index 0) <Tab/> will be associated with
          the <TabPanel/> of the same index. When you run this example with
          `selectedIndex` equal to 0, the tab with the label "Foo" will be selected
          and the content shown will be "Hello from Foo".

          As with <Tab/> the content of <TabPanel/> will be shown as the content.
        */}

        <TabPanel>
          <div id='pane1' style={pane1Style} ref={ref => this.pane1 = ref}>

            {/*
            <svg id='svg' style={pane1Style} ref={ref => this.svg1 = ref}>
            </svg>
            */}

          </div>
        </TabPanel>
        <TabPanel>
          <h2>Help place holder.</h2>
        </TabPanel>
      </Tabs>
    );
  }
}

export default Tabs1;