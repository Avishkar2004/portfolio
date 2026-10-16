import React from "react";
import SectionHeader from "./SectionHeader";
import JobList from "./JobList";
import "../styles/Experience.css";

export default function Experience() {
  return (
    <div id="experience">
      <SectionHeader index="04" title="Experience" />
      <JobList />
    </div>
  );
}
