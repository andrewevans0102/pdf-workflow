'use client'

// Page.js
import React, { useState } from 'react';
import axios from 'axios';
import './page.css';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    wheels: '',
    paint: '',
    engine: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:5039/api/Report/create-report', formData);
      
      // Check if we're using the displayUrl or the direct url
      const reportUrl = response.data.displayUrl || response.data.url;
      
      // Open the URL in a new tab
      window.open(reportUrl, '_blank');
      setSuccess(true);
      
      // Reset the form
      setFormData({
        name: '',
        wheels: '',
        paint: '',
        engine: ''
      });
    } catch (err) {
      console.error('Error creating report:', err);
      setError('Failed to create report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Page">
      <header className="Page-header">
        <h1>Repair Shop</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Customer/Vehicle Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. John's Toyota Camry"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="wheels">Wheels:</label>
              <input 
                type="text" 
                id="wheels" 
                name="wheels" 
                value={formData.wheels} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. 4 x Winter Tires"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="paint">Paint:</label>
              <input 
                type="text" 
                id="paint" 
                name="paint" 
                value={formData.paint} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. Metallic Blue"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="engine">Engine:</label>
              <input 
                type="text" 
                id="engine" 
                name="engine" 
                value={formData.engine} 
                onChange={handleInputChange} 
                required 
                placeholder="e.g. V6 Turbo"
              />
            </div>
            
            <button 
              type="submit" 
              className="create-report-button" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Report'}
            </button>
          </form>
          
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Report created successfully!</p>}
        </div>
      </header>
    </div>
  );
}

export default Home;