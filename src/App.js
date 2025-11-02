import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import Appointment from "./Pages/Appointment";
import NotFound from "./Pages/NotFound";

import Login from "./Pages/login";
import Register from "./Pages/register";
import Reset from "./Pages/reset";
import Admin from "./Pages/admins";
import Patient from "./Pages/patients";

function App() {
  return (
    <div className="App">
      <Router basename="/Health-Plus">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/admins" element={<Admin />} />
          <Route path="/patient" element={<Patient />} />

          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;