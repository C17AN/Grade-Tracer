import React, { Component } from "react";
import "./Clock.css";

export default class Clock extends Component {
  constructor() {
    super();
    this.state = {
      second: 60,
    };
    this.modifyTime = this.modifyTime.bind(this);
  }

  componentDidMount() {
    this.countdown();
  }

  modifyTime() {
    this.setState(() => ({
      second: this.state.second - 1,
    }));
    if (this.state.second === 0) {
      this.setState({ second: 60 });
    }
  }

  countdown = () => {
    setInterval(this.modifyTime, 1000);
  };

  render() {
    return (
      <div className="container">
        <div className="message">{`다음 갱신 시간은 ${this.state.second}초 후입니다.`}</div>
      </div>
    );
  }
}
