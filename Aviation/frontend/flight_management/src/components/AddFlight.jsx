import React, { useState } from 'react';
import axios from 'axios';

function AddFlight({ onAdd }) {
  const [flightData, setFlightData] = useState({
    flight_id: '',
    flight_name: '',
    flight_source: '',
    flight_destination: '',
    flight_fare: '',
    flight_duration: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/flight', flightData);
      if (response.status === 201) {
        onAdd(response.data);
        alert('Flight added successfully!');
        setFlightData({
          flight_id: '',
          flight_name: '',
          flight_source: '',
          flight_destination: '',
          flight_fare: '',
          flight_duration: '',
        });
      }
    } catch (error) {
      console.error('Error adding flight:', error);
      alert('Error adding flight. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Flight</h2>
      <input type="number" name="flight_id" value={flightData.flight_id} onChange={handleChange} placeholder="Flight ID" required />
      <input type="text" name="flight_name" value={flightData.flight_name} onChange={handleChange} placeholder="Flight Name" required />
      <input type="text" name="flight_source" value={flightData.flight_source} onChange={handleChange} placeholder="Source" required />
      <input type="text" name="flight_destination" value={flightData.flight_destination} onChange={handleChange} placeholder="Destination" required />
      <input type="number" name="flight_fare" value={flightData.flight_fare} onChange={handleChange} placeholder="Fare" required />
      <input type="number" name="flight_duration" value={flightData.flight_duration} onChange={handleChange} placeholder="Duration (hrs)" required />
      <button type="submit">Add Flight</button>
    </form>
  );
}

export default AddFlight;
