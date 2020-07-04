const puppeteer = require("puppeteer");
//import puppeteer from "puppeteer";

const id = "2017125015";
const pw = "recharge1!";
let subjects = [];
let subject_count = 0;

// [{name : "항산개", grade : "A0"}, {name : "디논", grade : "D0"}] 이런 식으로...
const getSubjectList = async (page) => {
  let index = 0;
  while (1) {
    let subject_name = await page.$(
      `body > form > table:nth-child(1) > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(${
        index + 2
      }) > td:nth-child(2)`
    );
    try {
      let name = await page.evaluate((data) => {
        return { name: data.textContent.trim() };
      }, subject_name);
      subjects = [...subjects, name];
      subject_count += 1;
      index += 1;
    } catch (err) {
      return;
    }
  }
};

const getSubjectGrade = async (page) => {
  for (let i = 0; i < subject_count; i++) {
    let subject_grade = await page.$(
      `body > form > table:nth-child(1) > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(${
        i + 2
      }) > td:nth-child(5)`
    );
    try {
      let grade = await page.evaluate((data) => {
        return data.textContent;
      }, subject_grade);
      subjects[i] = { ...subjects[i], grade };
    } catch (err) {
      return;
    }
  }
};

const Crawler = async () => {
  console.log("puppeteer launch check");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  console.log("page open check");
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36"
  );
  await page.goto(
    "https://www.kau.ac.kr/page/login.jsp?ppage=&target_page=act_Portal_Check.jsp@chk1-1",
    { waitUntil: "networkidle2" }
  );
  console.log("login page check");
  await page.type("input[name='p_id']", id);
  await page.waitFor(500);
  await page.type("input[name='p_pwd']", pw);
  await page.waitFor(500);
  await page.keyboard.press("Enter");
  //await page.click("img[src='/images/login/memberlogin_btn03.jpg']");
  await page.waitFor(1000);
  await page.goto("https://portal.kau.ac.kr/sugang/GradHakList_2018.jsp", {
    waitUntil: "networkidle2",
  });
  console.log("grade page check");
  try {
    // 과목명 리스트 검사 후, 최초에만 리스트 반환
    if (subjects.length === 0) {
      await getSubjectList(page);
    }
    await getSubjectGrade(page);
    // 프로미스를 통해 subject 반환
    await browser.close();
    return new Promise((resolve, reject) => {
      resolve(subjects);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  crawler: Crawler,
  data: subjects,
};
