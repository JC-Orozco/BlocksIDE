// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import Split1 from './Split1.jsx'
import Header from './Header.jsx'

class Layout1 extends Component {
  render() {
    return (
      <div>
        <Header />
        <Split1 />
      </div>
    );
  }
}

export default Layout1;
