import React, { Component } from "react";
import Subject from "./Subject";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
  }
  render() {
    const { isLoading, data } = this.state;
    return (
      <>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            <header>항공대 성적변동 알람앱</header>
            <section class="grade-table">
              <article class="grade-header">
                <div>과목명</div>
                <div>성 적</div>
              </article>
              {data.map((subject, index) => (
                <Subject
                  name={subject.name}
                  grade={subject.grade}
                  key={index}
                ></Subject>
              ))}
            </section>
          </>
        )}
      </>
    );
  }

  componentDidMount() {
    setInterval(() => {
      console.log("인터벌체크 1");
      fetch("http://localhost:5000/")
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => this.setState({ data: data, isLoading: false }));
    }, 10000);
  }

  componentDidUpdate() {
    console.log("--update--");
    console.log(this.state.isLoading);
    this.render();
  }
}

export default App;
