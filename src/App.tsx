import "./App.css";
import "./index.css";
import Loading from "./pages/loading.tsx";
import Dashboard from "./pages/dashboard.tsx";
import About from "./pages/about.tsx";
import Contact from "./pages/contactUs.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="header">
      {/* <h1>Motorcycle Queue Spot Map</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
