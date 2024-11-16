import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import FlightList from './components/FlightList';
import AddFlight from './components/AddFlight';
import EditFlight from './components/EditFlight';
import Home from './components/Home';
import axios from 'axios';

function App() {
  const [flights, setFlights] = useState([]);


  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/air/');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };
    fetchFlights();
  }, []);

  
  const handleAddFlight = async (newFlight) => {
    try {
      const response = await axios.post('http://localhost:3000/api/air/', newFlight);
      setFlights([...flights, response.data]);
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  
  const handleEditFlight = async (id, updatedFlight) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/air/${id}`, updatedFlight);
      setFlights(flights.map((flight) =>
        flight.id === id ? { ...flight, ...response.data } : flight
      ));
    } catch (error) {
      console.error('Error editing flight:', error);
    }
  };

  
  const handleDeleteFlight = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/air/${id}`);
      setFlights(flights.filter((flight) => flight.id !== id));
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/flights"
          element={<FlightList flights={flights} onEdit={handleEditFlight} onDelete={handleDeleteFlight} />}
        />
        <Route
          path="/add-flight"
          element={<AddFlight onAdd={handleAddFlight} />}
        />
        <Route
          path="/edit-flight/:id"
          element={<EditFlight flights={flights} onEdit={handleEditFlight} />}
        />
      </Routes>
    </Router>
  );
}

export default App;