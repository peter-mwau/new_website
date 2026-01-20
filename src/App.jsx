// import viteLogo from '/vite.svg'
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Projects from "./sections/Projects";
import Team from "./sections/Team";
import { useEffect } from "react";

function App() {
  // Enable smooth scrolling on the entire page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Projects />
      <Team />
    </>
  );
}

export default App;
