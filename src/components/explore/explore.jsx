import React, { useState } from 'react';
import './explore.css';
import { Cars } from '../../explore/card_data.jsx';
import CarCard from '../../explore/car_cards.jsx';

function Explore() {
  // Pagination - current page state
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;

  // Logic for current cars to display
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = Cars.slice(indexOfFirstCar, indexOfLastCar);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(Cars.length / carsPerPage)) {  // Corrected to use Cars
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
