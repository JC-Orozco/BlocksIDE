// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';
//import { walk } from 'acorn/dist/walk.js';

import { parseCode } from '../lib/js2blocks.js';

//var CodeMirror = require('react-codemirror');
//require('codemirror/lib/codemirror.css');
//require('codemirror/mode/javascript/javascript');

//var app_this
class Editor1 extends Component {
  constructor() {
    super();
    //app_this = this;
    this.state = {
      code: window._BIDE.code
    };
  }
  updateCode(newCode) {
    this.setState({
        code: newCode,
    });
    window._BIDE.code = newCode
    
    // TODO JCOA Dropdown selector between JavaScript and Python:
    parseCode(newCode)
    
    window._BIDE.code_prev = window._BIDE.code;
  }
  componentDidMount() {
    //console.log(walk)
    //console.log(walk.recursive)
    window._BIDE.editor1 = this.editor.codeMirror;
    // Check if old code == newCOde do not execute. Save old code
    if(window._BIDE.code_prev !== this.state.code){
      // TODO JCOA Dropdown selector between JavaScript and Python:
      parseCode(this.state.code)
      window._BIDE.code_prev = window._BIDE.code;
    }
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
      lineNumbers: true,
      mode: "javascript"
    };
    return (
      <div style={style1}>
        <CodeMirror style={style2} ref={ref => this.editor = ref} value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
    );
  }
}

export default Editor1;