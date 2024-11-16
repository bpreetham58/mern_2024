import React from 'react';
import { Link } from 'react-router-dom';
//import '../components/index.css';

function GetFlights({ flights, onDeleteFlight }) {
  return (
    <div>
      <ul style={{ textAlign: 'justify' }}>
        {flights.map((flight) => (
          <li key={flight.flight_id}>
            <strong>Flight ID:</strong> {flight.flight_id} <span></span>
            <strong>Name:</strong> {flight.flight_name} <span></span>
            <strong>Source:</strong> {flight.flight_source} <span></span>
            <strong>Destination:</strong> {flight.flight_destination} <span></span>
            <strong>Fare:</strong> ${flight.flight_fare} <span></span>
            <strong>Duration:</strong> {flight.flight_duration} hrs <span></span>
            <Link to={`/edit-flight/${flight.flight_id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => onDeleteFlight(flight.flight_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetFlights;
