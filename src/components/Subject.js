import React from "react";
import "./Subject.css";

const Subject = ({ name, grade }) => {
  if (grade == 0) {
    grade = "-";
  }
  return (
    <li class="contents">
      <div class="subject-name">{name}</div>
      <div class="subject-grade">{grade}</div>
    </li>
  );
};

export default Subject;
