const express = require("express");
const { crawler } = require("./src/Crawler");
const app = express();

const port = process.env.PORT || 5000;

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
      console.log("updating...");
      for (let i = 0; i < subject.length; i++) {
        if (data[i].grade !== subject[i].grade) {
          console.log("성적이 변동되었습니다!");
          subject = [...data];
        }
      }
    });
  }, 600000);
};

init();
checkGradeChange();

app.get("/", (req, res) => {
  console.log(subject);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.send(subject);
});

app.listen(port, () => console.log(`server running at ${port}`));
