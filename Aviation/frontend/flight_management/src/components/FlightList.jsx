import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/air')
      .then((response) => setFlights(response.data))
      .catch((error) => console.error('Error fetching flights:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/air/${id}`);
      setFlights(flights.filter((flight) => flight.flight_id !== id));
      alert('Flight deleted successfully.');
    } catch (error) {
      console.error('Error deleting flight:', error);
      alert('Error deleting flight. Please try again.');
    }
  };

  return (
    <div>
      <h2>Flight List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flight_id}>
              <td>{flight.flight_id}</td>
              <td>{flight.flight_name}</td>
              <td>{flight.flight_source}</td>
              <td>{flight.flight_destination}</td>
              <td>${flight.flight_fare}</td>
              <td>{flight.flight_duration} hrs</td>
              <td>
                <Link to={`/edit-flight/${flight.flight_id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(flight.flight_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightList;
