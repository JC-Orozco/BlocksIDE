import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';

//var CodeMirror = require('react-codemirror');
//require('codemirror/lib/codemirror.css');
//require('codemirror/mode/javascript/javascript');

class Editor2 extends Component {
  constructor() {
    super();
    this.state = {
      code: window._BIDE.blockly_code,
    };
  }
  updateCode(newCode) {
      this.setState({
          code: newCode,
      });
  }
  componentDidMount() {
    //console.log("Editor2");
    window._BIDE.editor2 = this.editor.codeMirror;
  }
  render() {
    var style1 = {
      //height: "100vh;", // Full screen 
      height: "300px",
      //"min-height": "100vh",
      width: "100%",
      display: "flex",
      padding: "0px",
      //"align-content": "stretch",
    };
    var style2 = {
      //flex: 1
      //width: "350px", // This is not responding, it does take the value from the css
      //flex: "flex-grow"
    };
    var options = {
      readOnly: true,
      lineNumbers: true,
      mode: "javascript"
    };
    return (
      <div style={style1}>
        <CodeMirror ref={ref => this.editor = ref} style={style2} value={this.state.code}
        options={options} />
      </div>
    );
  }
}

export default Editor2;