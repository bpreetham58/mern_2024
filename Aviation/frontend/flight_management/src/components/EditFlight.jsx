import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditFlight({ flights, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const flightToEdit = flights.find((flight) => flight.flight_id === parseInt(id));
    if (flightToEdit) setFormData(flightToEdit);
  }, [id, flights]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3000/api/air/${id}`, formData);
      if (response.status === 200) {
        onEdit(id, response.data);
        alert('Flight updated successfully!');
        navigate('/flights');
      }
    } catch (error) {
      console.error('Error updating flight:', error);
      alert('Error updating flight. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Flight</h2>
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          type={key === 'flight_id' || key.includes('fare') || key.includes('duration') ? 'number' : 'text'}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          disabled={key === 'flight_id'}
          required
        />
      ))}
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Save Changes'}
      </button>
    </form>
  );
}

export default EditFlight;
