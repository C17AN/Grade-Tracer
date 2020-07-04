import React from "react";
import "./Subject.css";

const Subject = ({ name, grade }) => {
  if (grade === "") {
    grade = "-";
  }
  return (
    <li className="contents">
      <div className="subject-name">{name}</div>
      <div className="subject-grade">{grade}</div>
    </li>
  );
};

export default Subject;
