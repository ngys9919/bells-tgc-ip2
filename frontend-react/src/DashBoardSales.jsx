import React, { useState, useEffect } from 'react';
import { useFlashMessage } from './FlashMessageStore';
import axios from 'axios';

function DashBoardSales() {

  const [sales, setSales] = useState([]);
  const [salesStartDate, setSalesStartDate] = useState(now());
  const [salesEndDate, setSalesEndDate] = useState(now());

  const { showMessage } = useFlashMessage();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {

        // const response = await axios.get('/sales.json');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/sales`);
        // const response = await axios.get(`http://localhost:3000/api/dashboard/sales`);
        setSales(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching sales:', error);
        showMessage('Error fetching sales!', 'error');
      }
    };

    fetchDashboard();
  }, []);

  // API: Handle Sales
  const handleBackendSales = async () => {
    // Redirect to Backend
    window.location.href = `${import.meta.env.VITE_API_URL}/api/dashboard/sales`;
  };

  const updateSalesStartDate = (e) => {
    setSalesStartDate(e.target.value);
    console.log(e.target.value);
  }

  const updateSalesEndDate = (e) => {
    setSalesEndDate(e.target.value);
    console.log(e.target.value);
  }

  const handleSalesByProductTypeClick = (e) => { 
    setproductCodeID(e.target.value);
    console.log(e.target.value);
  }

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Sales Dashboard</h1>
        <div class="row justify-content-start">
          <div class="col-4">
            <label>Start Date&emsp;</label>
            <input className="form-control me-2" type="date" min="1" value={salesStartDate} placeholder="Sales start date here"
              onChange={updateSalesStartDate} />
          </div>
          <div class="col-4">
            <label>End Date&emsp;</label>
            <input className="form-control me-2" type="date" value={salesEndDate} placeholder="Sales end date here"
              onChange={updateSalesEndDate} />
          </div>
          <div class="col-4">
            <label>Product Category&emsp;</label>
            {/* <select value={productCodeID} onChange={(e) => { setproductCodeID(e.target.value) }}> */}
            <select className="form-control me-2" value={productCodeID} onChange={handleSalesByProductTypeClick}>
              {/* <option value="">Select a Product Type</option> */}
              <option value="0">ALL AI-Products</option>
              <option value="1">AI-Books</option>
              <option value="2">AI-Image</option>
              <option value="3">AI-Music</option>
              <option value="4">AI-Video</option>
            </select>
          </div>
        </div>
        <h3 className="text-left mb-4">Key Metrics</h3>
        <div className="mt-3 text-end">
          <button className="btn btn-primary mt-2 mr-2 my-2" onClick={handleBackendSales}>Proceed to Backend</button>
        </div>
      </div>
    </>
  );
}

export default DashBoardSales;
