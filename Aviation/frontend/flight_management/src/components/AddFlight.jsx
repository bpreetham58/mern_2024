import React, { useState } from 'react';
import axios from 'axios';

function AddFlight({ onAdd }) {
  const [formData, setFormData] = useState({
    flight_id: '',
    flight_name: '',
    flight_source: '',
    flight_destination: '',
    flight_fare: '',
    flight_duration: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/air', formData);
      if (response.status === 201) {
        onAdd(response.data);
        alert('Flight added successfully!');
        setFormData({
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
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          type={key === 'flight_id' || key.includes('fare') || key.includes('duration') ? 'number' : 'text'}
          name={key}
          placeholder={key.replace('_', ' ').toUpperCase()}
          value={formData[key]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Add Flight</button>
    </form>
  );
}

export default AddFlight;
