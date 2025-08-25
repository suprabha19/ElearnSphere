import { useState } from "react";

import Herosection from "../components/Herosection";
// import Statscounter from "../components/Statscounter";
import Categories from "../components/Categories";
import Courses from "../components/Courses";
import BlogSection from "../components/BlogSection";

export default function Homepage() {
  return (
    <>
      <Herosection />
      {/* <Statscounter /> */}
      <Categories />
      <Courses />
      <BlogSection />
    </>
  );
}
