import { useState } from "react";

import Herosection from "../components/Herosection";
// import Statscounter from "../components/Statscounter";
import Categories from "../components/Categories";

export default function Homepage() {
  return (
    <>
      <Herosection />
      {/* <Statscounter /> */}
      <Categories />
    </>
  );
}
