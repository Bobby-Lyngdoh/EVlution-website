import React, { useState } from 'react';
import './explore.css';
import { Cars } from '../../explore/card_data.jsx';
import CarCard from '../../explore/car_cards.jsx';

function Explore() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;


  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = Cars.slice(indexOfFirstCar, indexOfLastCar);


  const handleNextPage = () => {
    if (currentPage < Math.ceil(Cars.length / carsPerPage)) {  
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Cars for Sale</h1>
      <div className="car-grid">
        {currentCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage * carsPerPage >= Cars.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Explore;
