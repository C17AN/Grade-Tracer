import React, { Component } from "react";
import Subject from "./Subject";
import Clock from "./Clock";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }
  render() {
    const { isLoading, data } = this.state;
    return (
      <>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            <header>
              <div className="header-title">항공대 성적변동 알람앱</div>
            </header>
            <section className="grade-table">
              <article className="grade-header">
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
            <Clock />
          </>
        )}
      </>
    );
  }

  fetchData() {
    console.log("데이터 갱신");
    //fetch("https://kau-grade-checker.herokuapp.com/")
    fetch("/grade")
      .then((res) => {
        return res.json();
      })
      .then((data) => this.setState({ data: data, isLoading: false }));
    return this.fetchData;
  }

  componentDidMount() {
    // setInterval 함수의 콜백이 "최초 1회 실행된 후"
    // 주기적으로 실행되기 위한 코드
    setInterval(this.fetchData(), 60000);
  }

  componentDidUpdate() {}
}

export default App;
