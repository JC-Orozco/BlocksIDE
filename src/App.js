import React, { Component } from 'react';
import './App.css';
import 'react-tabs/style/react-tabs.css';
import Layout1 from './components/Layout1.jsx';
import Blockly from './blockly';

class App extends Component {
  componentWillMount(){
    // Global scope
    window.Blockly = Blockly
    window._BIDE = {}
    let _BIDE = window._BIDE
    _BIDE.code = 'var i=10'
    
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
