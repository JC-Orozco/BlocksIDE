// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import Layout1 from './components/Layout1.jsx';
//import Blockly from './blockly';
//import Snap from 'snapsvg';
//const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class App extends Component {
  componentWillMount(){
    // Global scope
    //window.Snap = Snap

    window._BIDE = {}
    let _BIDE = window._BIDE
    _BIDE.b2c_error = false
    _BIDE.code = 'var i=10'
    //_BIDE.pm_types = window.PLUS_MINUS_updateShape_types;
    
    _BIDE.resize = {}
    _BIDE.resize.callbackList = []
    _BIDE.resize.addCallback = function(callback){
        _BIDE.resize.callbackList.push(callback)  
      }
    _BIDE.resize.resize = function(){
      // console.log("Resize")
      _BIDE.resize.callbackList.forEach(function(cb) {
        cb()
      })
    }
    _BIDE.blockly_code = ""
    _BIDE.code_prev = ""
    
    window.console1 = {
      log: function(msg){
        if(_BIDE.console1){
          _BIDE.console1.innerHTML += msg + '<br>' // value += msg + '\n'
        }
      },
      clear: function(){
        if(_BIDE.console1){
          _BIDE.console1.innerHTML = '' // value = ''
        }
      }
    }
    window._BIDE.updateWorkspace = function(e){
      let Blockly = window.Blockly
      console.log("updateWorkspace");
      // Set this on a getCode function
      //if(!window._BIDE.b2c_error){
        let blockly_code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
        window._BIDE.blockly_code = blockly_code;
        try{
          window._BIDE.editor2.setValue(blockly_code)
        }
        catch(e){
          // editor2 not opened yet.
        }
      //}
    }

  }
  componentDidMount() {
    window.addEventListener('resize', window._BIDE.resize.resize, false)
    window._BIDE.resize.resize()
    //Blockly.svgResize(Blockly.workspace);
  }
  render() {
    return (
      <Layout1 />
    );
  }
}

export default App;
