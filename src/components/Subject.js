import React from "react";
import "./Subject.css";

const Subject = ({ name, grade }) => {
  return (
    <>
      <div class="contents">
        {name} {grade}
      </div>
    </>
  );
};

export default Subject;
