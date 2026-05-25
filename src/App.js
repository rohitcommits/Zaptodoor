import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";

import Aboutus from "./components/layout/About";
import ServicesPage from "./components/layout/Services";
import ContactPage from "./components/layout/Contact";
import Pressrelease from "./components/layout/Pressrelease";
import Dashboard from "./pages/Dashboard";
import UsersTable from "./components/layout/Dashboard/Users";
import RestaurantTable from "./components/layout/Dashboard/Restaurant";


// Routes mein add k
function App() {
  return (
    <div style={{ fontFamily: "Quicksand" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/About" element={<Aboutus />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Pressrelease" element={<Pressrelease />} />
          <Route path="/UsersTable" element={<UsersTable />} />
          <Route path="/Restaurant" element={<RestaurantTable />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
