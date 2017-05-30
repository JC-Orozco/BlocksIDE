import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Editor1 from './Editor1.jsx'
import Editor2 from './Editor2.jsx'

//class TabTemplate extends React.Component {
//    render() {
//        if (!this.props.selected) {
//            return null;
//        }
//
//        return this.props.children;
//    }
//}

//var tabs1_this;
class Tabs2 extends Component {
  constructor() {
    super();
    //tabs1_this = this;
    this.state = { tabIndex: 0 };
  }
  
//  get styles() {
//        return {
//            root: {
//                flex: '1 1 100%',
//                minHeight: 0,
//                display: 'flex',
//                flexDirection: 'column'
//            },
//            container: {
//                flex: '1 1 100%;',
//                display: 'flex',
//                flexDirection: 'column',
//                overflowY: 'auto'
//            }
//        };
//    }
  
  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
    //tabs1_this.setState({ tabIndex: index });
    this.setState({ tabIndex: index });
  }
  render() {
    return (
      <Tabs onSelect={this.handleSelect.bind(this)}
        //style={this.styles.root}
        //contentContainerStyle={this.styles.container}
        //tabTemplate={TabTemplate}
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

          <Tab>JS Editor</Tab>
          <Tab>JS Generated</Tab>
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
          <Editor1 />
        </TabPanel>
        <TabPanel>
          <div>Read Only</div>
          <Editor2 />
        </TabPanel>
      </Tabs>
    );
  }
}

export default Tabs2;