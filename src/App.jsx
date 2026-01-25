import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "@fontsource/space-grotesk/700.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
