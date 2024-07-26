import React from "react";
import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Packages from "./components/Packages";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <div className="cmpad">
        <Banner />
        <Packages />
        <Footer />
      </div>
    </>
  );
};

export default App;
