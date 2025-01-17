// carlist.jsx
import React from 'react';

const CarList = ({ cars }) => (
  <div className="car-list">
    {cars.map(car => (
      <div key={car.id} className="car-item">
        <img src={car.image} alt={car.name} />
        <h3>{car.name}</h3>
        <p>{car.price}</p>
        <p>{car.year}</p>
      </div>
    ))}
  </div>
);

export default CarList;
