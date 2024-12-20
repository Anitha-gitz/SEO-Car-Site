import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleCars.css';
import logo from './images/logo.png';
import auto_logos from './images/auto_logos.png';
import Footer from './Footer';

const Cars = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    color: '',
    fuel_type: '',
    car_type: '',
    tier_type: '',
    seats: '',
    price: '',
    engine_model: '',
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carImages = [
    require('./images/carimage.jpg'),
    require('./images/carimage2.jpg'),
    require('./images/carimage3.jpg'),
    require('./images/carimage4.jpg'),
    require('./images/carimage5.jpg')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [carImages.length]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = async () => {
    try {
      const response = await axios.get('http://localhost:9000/car_tb', {
        params: filters, // Pass filters as query parameters
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error during the request:', error.message);
    }
  };

  const applySearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:9000/cars/ai-search", { query: searchQuery });

      if (Array.isArray(response.data)) {
        setCars(response.data);
      } else {
        setError("No cars found for your search");
      }
    } catch (error) {
      console.error("Error during search:", error.message);
      setError("An error occurred while fetching the cars.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='body-section'>
      <center>
        <div className="containe">
          <div className="menu-bar">
            <div className="name-logo">
              <img src={logo} alt="Website Logo" className="logo-img" />
              <h1 className="logo-title">Dream Cars</h1>
            </div>

            <div className="ai-search">
              <input
                type="text"
                className="search-input"
                placeholder="Search (e.g., red car with automatic engine under 40L)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <button
                className="search-btn"
                onClick={applySearch}
                aria-label="Apply Search"
              >
                <i className="bi bi-search"></i>
              </button>
              {loading && <p>Loading...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <nav className="menu-links">
              <a href="#latest" className="menu-link"><h4>Latest</h4></a>
              <a href="#used" className="menu-link"><h4>Used</h4></a>
              <a href="#login" className="menu-link login-link">
                <i className="bi bi-person-fill"></i> <h4>Login</h4>
              </a>
            </nav>
          </div>

          <div className="banner">
            <div className="slider" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
              {carImages.map((image, index) => (
                <div key={index} className="slide" style={{ backgroundImage: `url(${image})` }}></div>
              ))}
            </div>
            <div className="filters">
              <h2>Filters</h2>
              <select name="color" onChange={handleFilterChange}>
                <option value="">Color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Gray">Gray</option>
                <option value="Green">Green</option>
                <option value="Silver">Silver</option>
              </select>

              <select name="fuel_type" onChange={handleFilterChange}>
                <option value="">Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              <select name="car_type" onChange={handleFilterChange}>
                <option value="">Car Type</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sports">Sports</option>
                <option value="SUV">SUV</option>
              </select>

              <select name="tier_type" onChange={handleFilterChange}>
                <option value="">Tier Type</option>
                <option value="Alloy">Alloy</option>
                <option value="Steel">Steel</option>
                <option value="Carbon Fiber">Carbon Fiber</option>
              </select>

              <select name="seats" onChange={handleFilterChange}>
                <option value="">Seats</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>

              <select name="price" onChange={handleFilterChange}>
                <option value="">Price Range</option>
                <option value="3L to 10L">3L to 10L</option>
                <option value="10L to 20L">10L to 20L</option>
                <option value="20L to 40L">20L to 40L</option>
                <option value="above 50L">Above 50L</option>
              </select>

              <select name="engine_model" onChange={handleFilterChange}>
                <option value="">Engine Model</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>

              <button onClick={applyFilters}>Apply Filters</button>
            </div>
          </div>

          <div className="results">
            <div className="car-container-list">
              {cars.length > 0 ? (
                cars.map((car, index) => (
                  <div key={index} className="car-container">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="car-image"
                      style={{ width: '350px', height: 'auto' }}
                    />
                    <div className="car-details">
                      <h3 className="car-name">{car.model}</h3>
                      <p className="car-price"><b>Rs. {car.price.toLocaleString()}</b></p>
                      <p className="car-type">Type: {car.car_type}</p>
                      <p className="car-mileage">Mileage: {car.mileage}</p>
                      <p className="car-fuel">Fuel Type: {car.fuel_type}</p>
                      <button className="view-details-btn">View Details</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>
          <div style={{ margin: "20px auto", textAlign: "center", maxWidth: "99%" }}>
      <h2>Car Advertisement</h2>
      <video
        src={require("./images/BMW.mp4")}
        autoPlay
        muted
        loop
        style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", filter: "brightness(50%) "} }
      />
    </div>
    <div className='brand-logo'>
              <center>
                
                <img src={auto_logos} alt='brand-logos'></img>
              </center>
          </div>
    

          <div className='footer-section'><Footer/></div>
        </div>
      </center>
    </div>
  );
};

export default Cars;
