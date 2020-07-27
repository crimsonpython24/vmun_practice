import React, { Component } from "react";
import { render } from "react-dom";
import Todo from './todo/Todo';

class App extends Component {
  render() {
    return (
      <Todo/>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
