import React, { useState } from 'react';
import './explore.css';
import CarList from './carlist.jsx';

const Cars = [
  { id: 1, name: 'Toyota Corolla', image: 'https://media.zigcdn.com/media/model/2019/Sep/toyota-corolla-2020_600x400.jpg', price: '$20,000', year: 2020 },
  { id: 2, name: 'Honda Civic', image: 'https://example.com/honda.jpg', price: '$22,000', year: 2021 },
  { id: 3, name: 'BMW X5', image: 'https://example.com/bmw.jpg', price: '$50,000', year: 2019 },
  { id: 4, name: 'Tesla Model S', image: 'https://example.com/tesla.jpg', price: '$75,000', year: 2022 },
  { id: 5, name: 'Ford Mustang', image: 'https://example.com/ford.jpg', price: '$35,000', year: 2020 },
  { id: 6, name: 'Chevrolet Camaro', image: 'https://example.com/chevrolet.jpg', price: '$30,000', year: 2021 },
  { id: 7, name: 'Audi A4', image: 'https://example.com/audi.jpg', price: '$40,000', year: 2021 },
  { id: 8, name: 'Mercedes-Benz C-Class', image: 'https://example.com/mercedes.jpg', price: '$45,000', year: 2021 },
  { id: 9, name: 'Nissan Altima', image: 'https://example.com/nissan.jpg', price: '$25,000', year: 2020 },
  { id: 10, name: 'Hyundai Elantra', image: 'https://example.com/hyundai.jpg', price: '$18,000', year: 2022 },
];

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
        <CarList cars={currentCars} /> 
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
