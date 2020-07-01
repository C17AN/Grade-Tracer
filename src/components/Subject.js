import React from "react";
import "./Subject.css";

const Subject = ({ name, grade }) => {
  if (grade == 0) {
    grade = "-";
  }
  return (
    <div class="contents">
      <span>{name}</span>
      <span>{grade}</span>
    </div>
  );
};

export default Subject;
