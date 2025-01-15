
import React from 'react';
import './car_card.css'; 

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} className="car-image" />
      <div className="car-details">
        <h3 className="car-name">{car.name}</h3>
        <p className="car-price">{car.price}</p>
        <p className="car-year">{car.year}</p>
      </div>
    </div>
  );
};

export default CarCard;
