const express = require("express");
const crawler = require("./src/Crawler");
const app = express();

let subject = [];
const func = async () => {
  await crawler.crawler();
  subject = [...crawler.data];
};
func();
app.get("/", (req, res) => {
  console.log(subject);
  res.send(subject);
});
app.listen(5000, () => console.log("server running"));
