import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";



import Aboutus from "./components/layout/About"

import {Clone} from "./components/Clone"

function App() {
  return (
    <div style={{ fontFamily: "Quicksand" }}>
      <Router>
        <Routes>
          <Route path="/layout" element={<Layout />} />
      
          <Route path="/clone" element={<Clone />} />
           <Route path="/About" element={<Aboutus />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
