import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <div className=" bg-gray-300 py-[20px] px-[10px] sm:px-2 md:px-12 lg:px-16">
        <Outlet />
      </div>
    </>
  );
}

export default App;
