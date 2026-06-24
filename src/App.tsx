import "./App.css"
import "./index.css"
import Home from "./pages/home.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="header">
      {/* <h1>Motorcycle Queue Spot Map</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;