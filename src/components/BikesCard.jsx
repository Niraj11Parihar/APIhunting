import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import Axios
import '../bikecard.css';  // Add custom styling for the bike card

const BikeCard = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetching bike data when the component mounts
  useEffect(() => {
    axios
      .get('/bikes.json')  // Axios request to get the bike data from local JSON
      .then((response) => {
        setBikes(response.data);  // Set the fetched bike data
        setLoading(false);  // Set loading state to false after data is fetched
      })
      .catch((error) => {
        setError('Error fetching data. Please try again later.');  // Error handling
        setLoading(false);  // Set loading to false after error
      });
  }, []);

  // Show loading state if data is still being fetched
  if (loading) {
    return <div>Loading bikes...</div>;
  }

  // Show error message if there is an issue with the API call
  if (error) {
    return <div>{error}</div>;
  }

  // Render bike cards once data is successfully fetched
  return (
    <div className="App">
      <h1>Bike Hunting</h1>
      <div className="bike-container">
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <div key={bike.id} className="bike-card">
              <img src={bike.image} alt={bike.name} />
              <h2>{bike.name}</h2>
              <p>Type: {bike.type}</p>
              <p>Price: {bike.price}</p>
            </div>
          ))
        ) : (
          <p>No bikes found.</p>
        )}
      </div>
    </div>
  );
};

export default BikeCard;
