import React, { Component } from 'react';
import { saveAs } from 'file-saver'
import { parseCode } from '../lib/js2blocks.js';

class Header extends Component {
  save() {
  console.log("Save")
    var blob = new Blob([window._BIDE.code], {
        type : 'text/plain'
      });
    console.log(saveAs)
    saveAs(blob, 'script1.js');
  }
  open() {
    var openFile = document.getElementById('open-js-file');
    openFile.click()
    //this.openFileInput.click()
  }
  openjs(event) {
    var input = event.target;
    console.log("open "+input.files[0]);
    var reader = new FileReader();
    reader.onload = function(){
      window._BIDE.code = reader.result
      window._BIDE.editor1.setValue(reader.result);
      
      parseCode(reader.result)
    }
    reader.readAsText(input.files[0]);
  }
  componentDidMount() {
    var openFile = document.getElementById('open-js-file');
    openFile.addEventListener('change', this.openjs, false);
    //this.openFileInput.addEventListener('change', this.openjs, false);
  }
  render() {
    return (
      <div>
        <input id="open-js-file" type="file" name="openjsfile" accept='.js' style={{display: "none"}} ref={ref => this.openFileInput = ref} />
        <button onClick={this.open}>Open</button>
        <button onClick={this.save}>Save</button>
        <span><b> BlocksIDE</b> (Alpha) 0.3.2 by Juan Carlos Orozco. Works with latest Chrome or Firefox</span>
      </div>
    );
  }
}

export default Header;
