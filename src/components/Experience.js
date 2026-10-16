import React from "react";
import JobList from "./JobList";
import "../styles/Experience.css";

export default function Experience() {
  return (
    <div id="experience">
      <div className="section-header">
        <span className="section-index">04</span>
        <h2 className="section-title">Experience</h2>
      </div>
      <JobList />
    </div>
  );
}
