import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditFlight({ onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/flight/${id}`);
        setFlightData(response.data);
      } catch (err) {
        setError('Error fetching flight data.');
        console.error(err);
      }
    };

    fetchFlight();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3000/api/flight/${id}`, flightData);
      if (response.status === 200) {
        onEdit(id, response.data);
        navigate('/flights');
      }
    } catch (err) {
      setError('Error updating flight. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!flightData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Flight</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" name="flight_name" value={flightData.flight_name} onChange={handleChange} placeholder="Flight Name" required />
      <input type="text" name="flight_source" value={flightData.flight_source} onChange={handleChange} placeholder="Source" required />
      <input type="text" name="flight_destination" value={flightData.flight_destination} onChange={handleChange} placeholder="Destination" required />
      <input type="number" name="flight_fare" value={flightData.flight_fare} onChange={handleChange} placeholder="Fare" required />
      <input type="number" name="flight_duration" value={flightData.flight_duration} onChange={handleChange} placeholder="Duration (hrs)" required />
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
    </form>
  );
}

export default EditFlight;
