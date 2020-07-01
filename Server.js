const express = require("express");
const { crawler } = require("./src/Crawler");
const app = express();

let subject = [];
const init = async () => {
  crawler().then((data) => {
    subject = [...data];
  });
};

const checkGradeChange = () => {
  setInterval(async () => {
    crawler().then((data) => {
      // console.log(subject.length);
      // console.log("--- subject ---");
      // console.log(subject);
      // console.log("--- data ---");
      // console.log(data);
      for (let i = 0; i < subject.length; i++) {
        if (data[i].grade !== subject[i].grade) {
          console.log("성적이 변동되었습니다!");
          subject = [...data];
        }
      }
    });
  }, 5000);
};

init();
checkGradeChange();

app.get("/", (req, res) => {
  console.log(subject);
  res.send(subject);
});
app.listen(5000, () => console.log("server running"));
