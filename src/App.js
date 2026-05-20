import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import contant from "./components/layout/contant";
import LandingPage from "./components/LandingPage";
import  Slide from "./components/layout/Slider"
import Aboutus from "./components/layout/About"

import {Clone} from "./components/Clone"

function App() {
  return (
    <div style={{ fontFamily: "Quicksand" }}>
      <Router>
        <Routes>
          <Route path="/layout" element={<Layout />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/clone" element={<Clone />} />
           <Route path="/About" element={<Aboutus />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
