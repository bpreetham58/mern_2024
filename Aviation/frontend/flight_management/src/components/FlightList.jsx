import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FlightList({ flights, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/flight/${id}`);
        if (response.status === 200) {
          onDelete(id);
          alert('Flight deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting flight:', error);
        alert('Error deleting flight. Please try again.');
      }
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
            <th>Fare</th>
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
              <td>{flight.flight_fare}</td>
              <td>{flight.flight_duration} hrs</td>
              <td>
                <Link to={`/edit/${flight.flight_id}`}>Edit</Link>
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
