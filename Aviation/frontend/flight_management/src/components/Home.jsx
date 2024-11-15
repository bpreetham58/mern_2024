import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightList from './FlightList';
import AddFlight from './AddFlight';

function Home() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/flight');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  const addFlight = (newFlight) => {
    setFlights((prevFlights) => [...prevFlights, newFlight]);
  };

  const editFlight = (id, updatedFlight) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) => (flight.flight_id === parseInt(id) ? updatedFlight : flight))
    );
  };

  const deleteFlight = (id) => {
    setFlights((prevFlights) => prevFlights.filter((flight) => flight.flight_id !== id));
  };
  
  return (
    <div>
      <AddFlight onAdd={addFlight} />
      <FlightList flights={flights} onDelete={deleteFlight} />
    </div>
  );
}

export default Home;
