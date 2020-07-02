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
              <div class="header-title">항공대 성적변동 알람앱</div>
              <div id="logo">LOGO</div>
            </header>
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

  fetchData() {
    console.log("인터벌체크 1");
    fetch("http://localhost:5000/")
      .then((res) => {
        console.log(res);
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

  componentDidUpdate() {
    console.log("--update--");
    console.log("성적 업데이트!!");
    this.render();
  }
}

export default App;
