import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  render() {
    return <div>{this.state.data}</div>;
  }

  componentDidMount() {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  }
}

export default App;
