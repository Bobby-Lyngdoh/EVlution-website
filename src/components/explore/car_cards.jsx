import React from 'react';
import './car_card.css';  

function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h2>{car.name}</h2>
      <p>{car.year} - {car.price}</p>
    </div>
  );
}

export default CarCard;
