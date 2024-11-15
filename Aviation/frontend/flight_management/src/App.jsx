import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import EditFlight from './components/EditFlight.jsx';
import Navbar from './components/Navbar.jsx';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditFlight />} />
      </Routes>
    </Router>
  );
}

export default App;
